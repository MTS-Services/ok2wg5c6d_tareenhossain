<?php

namespace App\Services;

use App\Enums\CategoryStatus;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoryService
{
    public function __construct(protected Category $model) {}

    /**
     * Get all categories for admin
     */
    public function getAll()
    {
        return $this->model->latest()->get(['id', 'title', 'slug']);
    }

    /**
     * Get all categories with pagination for admin (alternative method)
     */
    public function getAllPaginated($perPage = 10)
    {
        return $this->model->latest()->paginate($perPage, ['id', 'title', 'slug']);
    }

    /**
     * Create a new category
     */
    public function create(array $data): Category
    {
        return $this->model->create([
            'title' => $data['title'],
            'slug' => $this->generateUniqueSlug($data['title']),
            'status' => CategoryStatus::ACTIVE,
            'created_by' => $data['created_by'],
            'updated_by' => $data['updated_by'] ?? $data['created_by'],
        ]);
    }

    /**
     * Update an existing category
     */
    public function update(Category $category, array $data): void
    {
        $category->update([
            'title' => $data['title'],
            'slug' => $this->generateUniqueSlug($data['title'], $category->id),
            'updated_by' => $data['updated_by'],
        ]);
    }

    /**
     * Delete a category (soft delete)
     */
    public function delete(Category $category): void
    {
        $category->delete();
    }

    /**
     * Generate unique slug from title
     */
    private function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        if (empty($base)) {
            $base = 'category';
        }

        $slug = $base;
        $suffix = 1;

        while ($this->model->query()
            ->where('slug', $slug)
            ->when($ignoreId !== null, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = $base.'-'.$suffix;
            $suffix++;
        }

        return $slug;
    }
}
