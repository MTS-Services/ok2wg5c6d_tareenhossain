<?php

namespace App\Enums;

enum ProductType: string
{
    case INSTOCK = 'instock';
    case UPCOMING = 'upcoming';

    public function label(): string
    {
        return match ($this) {
            self::INSTOCK => 'In Stock',
            self::UPCOMING => 'Upcoming',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::INSTOCK => 'success',
            self::UPCOMING => 'warning',
        };
    }

     public static function options(): array
    {
        return array_map(
            fn($case) => ['value' => $case->value, 'label' => $case->label()],
            self::cases()
        );
    }
}
