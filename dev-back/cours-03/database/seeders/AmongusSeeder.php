<?php

namespace Database\Seeders;

use App\Models\Amongus;
use Illuminate\Database\Seeder;

class AmongusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Amongus::factory()->count(50000)->create();
    }
}
