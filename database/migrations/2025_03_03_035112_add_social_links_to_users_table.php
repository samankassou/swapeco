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
        Schema::table('users', function (Blueprint $table) {
            $table->string('facebook')->nullable()->after('email');
            $table->string('twitter')->nullable()->after('facebook');
            $table->string('linkedin')->nullable()->after('twitter');
            $table->string('github')->nullable()->after('linkedin');
            $table->string('instagram')->nullable()->after('github');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['facebook', 'twitter', 'linkedin', 'github', 'instagram']);
        });
    }
};
