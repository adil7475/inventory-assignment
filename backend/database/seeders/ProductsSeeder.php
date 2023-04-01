<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i <= 10; $i++) {
            Product::updateOrCreate(
                ['slug' => str()->slug("Product-${i}")],
                [
                    "name" => "Product-${i}",
                    "slug" => "Product-${i}",
                    "description" => fake()->paragraph(10),
                ]
            );
        }
    }
}
