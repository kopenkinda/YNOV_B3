<?php

namespace Database\Factories;

use App\Models\Amongus;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class AmongusFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Amongus::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->randomElement(['red', 'green', 'blue', 'white', 'black']),
            'isImpostor' => $this->faker->boolean(10),
        ];
    }
}
