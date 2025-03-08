<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\ExchangeMarket\MessageController;
use App\Http\Controllers\Admin\ExchangeMarket\NegotiationController;
use App\Http\Controllers\Admin\ExchangeMarket\OfferController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['middleware' => ['auth', 'verified'], 'prefix' => 'admin', 'as' => 'admin.exchange_market.'], function () {

    Route::get('/exchange-market/how-it-works', function () {
        return Inertia::render('ExchangeMarket/HowItWorks/Index');
    })->name('how_it_works');

    Route::resource('exchange-market/offers', OfferController::class);
    Route::get('exchange-market/my-offers', [OfferController::class, 'myOffers'])->name('offers.me');
    Route::post('exchange-market/offers/{offer}/close', [OfferController::class, 'close'])->name('offers.close');
    Route::post('exchange-market/offers/{offer}/approve', [OfferController::class, 'approve'])->name('offers.approve');
    Route::post('exchange-market/offers/{offer}/reject', [OfferController::class, 'reject'])->name('offers.reject');

    // negotiation
    Route::post('/negotiations', [NegotiationController::class, 'store'])->name('negotiations.create');
    Route::get('/negotiations/{negotiation}', [NegotiationController::class, 'show'])->name('negotiations.show');
    Route::post('/negotiations/{negotiation}/accept', [NegotiationController::class, 'accept'])->name('negotiations.accept');
    Route::post('/negotiations/{negotiation}/reject', [NegotiationController::class, 'reject'])->name('negotiations.reject');
    Route::post('/negotiations/{negotiation}/cancel', [NegotiationController::class, 'cancel'])->name('negotiations.cancel');
    Route::post('/negotiations/{negotiation}/complete', [NegotiationController::class, 'complete'])->name('negotiations.complete');

    // Routes pour les messages
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');

    // Routes pour les contre-offres
    Route::post('/counter-offers', [CounterOfferController::class, 'store'])->name('counter_offers.store');
    Route::post('/counter-offers/{counterOffer}/accept', [CounterOfferController::class, 'accept'])->name('counter_offers.accept');
    Route::post('/counter-offers/{counterOffer}/reject', [CounterOfferController::class, 'reject'])->name('counter_offers.reject');
});
