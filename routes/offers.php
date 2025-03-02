<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\ExchangeMarket\OfferController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['middleware' => ['auth', 'verified'], 'prefix' => 'admin', 'as' => 'admin.exchange_market.'], function () {

    Route::get('/exchange-market/how-it-works', function () {
        return Inertia::render('ExchangeMarket/HowItWorks/Index');
    })->name('how_it_works');

    Route::resource('exchange-market/offers', OfferController::class);
    Route::post('exchange-market/offers/{offer}/close', [OfferController::class, 'close'])->name('offers.close');
});
