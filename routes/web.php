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

    Route::get('/exchange-market/how-it-works', function () {
        return Inertia::render('ExchangeMarket/HowItWorks/Index');
    })->name('exchange_market.how_it_works');

    Route::get('/exchange-market/offers', [OfferController::class, 'index'])->name('exchange_market.offers.index');
    Route::get('/exchange-market/offers/create', [OfferController::class, 'create'])->name('exchange_market.offers.create');
    Route::post('/exchange-market/offers', [OfferController::class, 'store'])->name('exchange_market.offers.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
