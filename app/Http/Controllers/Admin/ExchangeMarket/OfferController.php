<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\ExchangeMarket;

use Inertia\Inertia;
use App\Models\Offer;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Actions\Offer\CreateOfferAction;
use App\Http\Requests\CreateOfferRequest;
use App\Http\Requests\ListOffersRequest;

class OfferController extends Controller
{
    public function index(ListOffersRequest $request)
    {
        $query = Offer::where('user_id', Auth::user()->id);

        $offers = QueryBuilder::for($query)
            ->allowedFilters([
                'title',
                AllowedFilter::exact('type')->ignore('all'),
                AllowedFilter::exact('status')->ignore('all'),
            ])
            ->allowedSorts(['created_at', 'title'])
            ->defaultSort('-created_at')
            ->paginate()
            ->appends($request->query());

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
