php
<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::transaction(function () {
            // Vérifier si le pays existe déjà
            $existingCountry = DB::table('countries')->where('name', 'Belgique')->first();

            if (!$existingCountry) {
                // Insérer le pays
                $countryId = DB::table('countries')->insertGetId([
                    'name' => 'Belgique',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } else {
                $countryId = $existingCountry->id;
            }

            // Insérer les villes
            $cities = [
                'Liège' => null,
                'Gembloux' => null,
                'Arlon' => null,
                'Anvers' => null,
                'Namur' => null,
                'Gand' => null,
            ];

            // Insertion des villes et récupération des IDs
            foreach ($cities as $cityName => &$cityId) {
                $existingCity = DB::table('cities')->where('name', $cityName)
                    ->where('country_id', $countryId)->first();

                if (!$existingCity) {
                    $cityId = DB::table('cities')->insertGetId([
                        'name' => $cityName,
                        'country_id' => $countryId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                } else {
                    $cityId = $existingCity->id;
                }
            }

            // Préparation des données des campus
            $campusData = [
                // Liège
                [
                    'name' => 'Université de Liège - Campus du Sart Tilman',
                    'city' => 'Liège'
                ],
                [
                    'name' => 'Université de Liège - Campus du Centre-ville',
                    'city' => 'Liège'
                ],
                // Gembloux
                [
                    'name' => 'Université de Liège - Gembloux Agro-Bio Tech',
                    'city' => 'Gembloux'
                ],
                // Arlon
                [
                    'name' => 'Université de Liège - Arlon Campus Environnement',
                    'city' => 'Arlon'
                ],
                // Anvers
                [
                    'name' => 'Université d\'Anvers - Campus Stadscampus',
                    'city' => 'Anvers'
                ],
                [
                    'name' => 'Université d\'Anvers - Campus Middelheim',
                    'city' => 'Anvers'
                ],
                [
                    'name' => 'Université d\'Anvers - Campus Groenenborger',
                    'city' => 'Anvers'
                ],
                [
                    'name' => 'Université d\'Anvers - Campus Drie Eiken',
                    'city' => 'Anvers'
                ],
                // Namur
                [
                    'name' => 'Université de Namur',
                    'city' => 'Namur'
                ],
                // Gand
                [
                    'name' => 'Haute École de Gand',
                    'city' => 'Gand'
                ],
            ];

            // Insertion des campus
            foreach ($campusData as $campus) {
                // Vérifier si le campus existe déjà
                $existingCampus = DB::table('campuses')->where('name', $campus['name'])->first();

                if (!$existingCampus) {
                    DB::table('campuses')->insert([
                        'name' => $campus['name'],
                        'city_id' => $cities[$campus['city']],
                        'country_id' => $countryId,  // Ajout du country_id
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        });
    }
};
