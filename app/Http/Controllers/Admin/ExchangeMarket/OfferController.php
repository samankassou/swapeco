<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\ExchangeMarket;

use Inertia\Inertia;
use App\Models\Offer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    public function index(Request $request)
    {
        $offers = Offer::where('user_id', Auth::user()?->id)->latest()->paginate(10);

        return Inertia::render('ExchangeMarket/Offers/List/Index', ['offers' => $offers]);
    }
}
