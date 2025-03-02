<?php

declare(strict_types=1);

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ExchangeMarket\OfferController;

Route::group(['middleware' => ['auth', 'verified'], 'prefix' => 'admin', 'as' => 'admin.exchange_market.'], function () {

    Route::get('/exchange-market/how-it-works', function () {
        return Inertia::render('ExchangeMarket/HowItWorks/Index');
    })->name('how_it_works');

    Route::resource('exchange-market/offers', OfferController::class);
});
