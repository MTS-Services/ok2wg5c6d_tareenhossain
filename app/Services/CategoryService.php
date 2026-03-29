<?php

namespace App\Services;

use App\Enums\CategoryStatus;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoryService
{
    public function __construct(protected Category $model) {}

    /**
     * @return list<array{id: string, name: string, active: bool}>
     */
    public function getForAdminIndex(): array
    {
        return $this->model->query()
            ->orderBy('id')
            ->get()
            ->map(fn (Category $category) => [
                'id' => (string) $category->id,
                'name' => $category->title,
                'active' => $category->status === CategoryStatus::ACTIVE,
            ])
            ->values()
            ->all();
    }

    public function create(array $data): Category
    {
        return $this->model->create([
            'title' => $data['title'],
            'slug' => $this->uniqueSlugFromTitle($data['title']),
            'status' => CategoryStatus::ACTIVE,
            'created_by' => $data['created_by'],
            'updated_by' => $data['updated_by'] ?? $data['created_by'],
        ]);
    }

    public function update(Category $category, array $data): void
    {
        $category->update([
            'title' => $data['title'],
            'slug' => $this->uniqueSlugFromTitle($data['title'], $category->id),
            'updated_by' => $data['updated_by'],
        ]);
    }

    public function delete(Category $category): void
    {
        $category->delete();
    }

    public function updateStatus(Category $category, bool $active, int|string $updatedBy): void
    {
        $category->update([
            'status' => $active ? CategoryStatus::ACTIVE : CategoryStatus::INACTIVE,
            'updated_by' => $updatedBy,
        ]);
    }

    private function uniqueSlugFromTitle(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        if ($base === '') {
            $base = 'category';
        }

        $slug = $base;
        $suffix = 1;

        while ($this->model->query()
            ->where('slug', $slug)
            ->when($ignoreId !== null, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = $base.'-'.$suffix;
            $suffix++;
        }

        return $slug;
    }
}
