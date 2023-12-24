<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    private function generate_image(): string
    {
        $amount_photo = rand(0, 6);
        $file_paths = [];
        for ($i = 0; $i <= $amount_photo; $i++) {
            $file_paths[] = fake()->image('public/uploads/photos', 640, 480, null, false, true);
        }
        return implode(', ', $file_paths);
    }

    public function definition(): array
    {
        $floor_area = fake()->numberBetween(10, 1000);
        $land_area = fake()->numberBetween(10, 1000) + $floor_area;

        return [
            'user_id' => fake()->numberBetween(1, 10),
            'title' => fake()->title(),
            'locality' => fake()->city(),
            'description' => fake()->paragraph(),
            'floor_area' => $floor_area,
            'land_area' => $land_area,
            'price' => fake()->numberBetween(10000, 10000000),
            'photo_path' => $this->generate_image()
        ];
    }
}
