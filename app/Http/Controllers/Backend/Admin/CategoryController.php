<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Enums\CategoryStatus;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = Category::query()
            ->orderBy('id')
            ->get()
            ->map(fn (Category $category) => [
                'id' => (string) $category->id,
                'name' => $category->title,
                'active' => $category->status === CategoryStatus::ACTIVE,
            ])
            ->values()
            ->all();

        $categoryRowActions = [
            [
                'key' => 'edit',
                'label' => 'Edit',
                'icon' => 'Pencil',
                'dividerBefore' => false,
                'variant' => null,
            ],
            [
                'key' => 'activate',
                'label' => 'Active',
                'icon' => 'Check',
                'dividerBefore' => false,
                'variant' => null,
            ],
            [
                'key' => 'deactivate',
                'label' => 'Inactive',
                'icon' => 'CircleX',
                'dividerBefore' => false,
                'variant' => null,
            ],
            [
                'key' => 'delete',
                'label' => 'Delete',
                'icon' => 'Trash2',
                'dividerBefore' => true,
                'variant' => 'destructive',
            ],
        ];

        return Inertia::render('backend/Admin/category', [
            'categories' => $categories,
            'categoryRowActions' => $categoryRowActions,
        ]);

    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255', Rule::unique('categories', 'title')],
        ]);

        $adminId = Auth::guard('admin')->id();

        Category::create([
            'title' => $data['title'],
            'slug' => $this->uniqueSlugFromTitle($data['title']),
            'status' => CategoryStatus::ACTIVE,
            'created_by' => $adminId,
            'updated_by' => $adminId,
        ]);

        return redirect()->route('admin.category');
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $data = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'title')->ignore($category->id),
            ],
        ]);

        $category->update([
            'title' => $data['title'],
            'slug' => $this->uniqueSlugFromTitle($data['title'], $category->id),
            'updated_by' => Auth::guard('admin')->id(),
        ]);

        return redirect()->route('admin.category');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $category->delete();

        return redirect()->route('admin.category');
    }

    public function updateStatus(Request $request, Category $category): RedirectResponse
    {
        $data = $request->validate([
            'active' => ['required', 'boolean'],
        ]);

        $category->update([
            'status' => $data['active'] ? CategoryStatus::ACTIVE : CategoryStatus::INACTIVE,
            'updated_by' => Auth::guard('admin')->id(),
        ]);

        return redirect()->route('admin.category');
    }

    private function uniqueSlugFromTitle(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        if ($base === '') {
            $base = 'category';
        }

        $slug = $base;
        $suffix = 1;

        while (Category::query()
            ->where('slug', $slug)
            ->when($ignoreId !== null, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = $base.'-'.$suffix;
            $suffix++;
        }

        return $slug;
    }
}
