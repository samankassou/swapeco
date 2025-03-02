<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\ExchangeMarket\OfferController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::group(['middleware' => ['auth', 'verified'], 'prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Index');
    })->name('dashboard');

    Route::get('/profile-setting', function () {
        return Inertia::render('Profile/Edit');
    })->name('profile_setting');
});

require __DIR__ . '/offers.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
