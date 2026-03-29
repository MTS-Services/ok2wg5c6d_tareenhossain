<?php

namespace App\Enums;

enum ProductType: string
{
    case INSTOCK = 'instock';
    case UPCAMING = 'upcoming';

    public function label(): string
    {
        return match ($this) {
            self::INSTOCK => 'In Stock',
            self::UPCAMING => 'Upcoming',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::INSTOCK => 'success',
            self::UPCAMING => 'warning',
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
