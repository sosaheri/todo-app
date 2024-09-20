<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tasks')->insert([
            ['title' => 'Instalar App de Heriberto 🔨', 'is_completed' => true],
            ['title' => 'Correr migraciones 🕧', 'is_completed' => true],
            ['title' => 'Revisar Interfaz 🔎', 'is_completed' => false],
            ['title' => 'Revisar código 🔎', 'is_completed' => false],
            ['title' => 'Revisar Documentación', 'is_completed' => true],
            ['title' => 'Enviar feedback y contratarlo 🏆', 'is_completed' => false],
        ]);
    }
}
