<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(protected CategoryService $categoryService) {}

    public function index(Request $request): Response
    {
        $categories = $this->categoryService->getForAdminIndex();

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

        $this->categoryService->create([
            'title' => $data['title'],
            'created_by' => $adminId,
            'updated_by' => $adminId,
        ]);

        return redirect()->route('admin.categories.index');
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

        $this->categoryService->update($category, [
            'title' => $data['title'],
            'updated_by' => Auth::guard('admin')->id(),
        ]);

        return redirect()->route('admin.categories.index');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $this->categoryService->delete($category);

        return redirect()->route('admin.categories.index');
    }

    public function updateStatus(Request $request, Category $category): RedirectResponse
    {
        $data = $request->validate([
            'active' => ['required', 'boolean'],
        ]);

        $this->categoryService->updateStatus(
            $category,
            $data['active'],
            Auth::guard('admin')->id()
        );

        return redirect()->route('admin.categories.index');
    }
}
