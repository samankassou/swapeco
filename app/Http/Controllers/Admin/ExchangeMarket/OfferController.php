<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\ExchangeMarket;

use App\Actions\Offer\CreateOfferAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOfferRequest;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OfferController extends Controller
{
    public function index(Request $request)
    {
        $offers = Offer::where('user_id', Auth::user()?->id)->latest()->paginate(10);

        return Inertia::render('ExchangeMarket/Offers/List/Index', ['offers' => $offers]);
    }

    public function create()
    {
        return Inertia::render('ExchangeMarket/Offers/Create/Index');
    }

    public function store(CreateOfferRequest $request, CreateOfferAction $action)
    {
        $validatedData = $request->validated();

        $action->handle(Auth::user(), $validatedData);

        return to_route('admin.exchange_market.offers.index');
    }
}
