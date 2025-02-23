<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('offer_sub_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('offer_categories');
            $table->string('name');
            $table->timestamps();
        });
    }
};
