<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employe>
 */
class EmployeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => fake()->lastName(),
            'prenom' => fake()->firstName(),
            'date_naissance' => fake()->date($format = 'Y-m-d', $max = 'now'),
            'adresse' => fake()->address(),
            'telephone' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'date_embauche' => fake()->date($format = 'Y-m-d', $max = 'now'),
            'salaire' => fake()->randomFloat($nbMaxDecimals = 2, $min = 1000, $max = 10000),
            'photo' => null,
        ];
    }
}
