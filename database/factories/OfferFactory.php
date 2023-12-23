<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $floor_area = fake()->numberBetween(10, 1000);
        $land_area = fake()->numberBetween(10, 1000) + $floor_area;

        function generate_image()
        {
        }

        return [
            'user_id' => fake()->numberBetween(1, 10),
            'title' => fake()->title(),
            'locality' => fake()->city(),
            'description' => fake()->paragraph(),
            'floor_area' => $floor_area,
            'land_area' => $land_area,
            'price' => fake()->price(),
            'photo_path' => generate_image()
        ];
    }
}
