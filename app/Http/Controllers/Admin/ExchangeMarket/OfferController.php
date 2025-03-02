<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\ExchangeMarket;

use App\Actions\Offer\CreateOfferAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOfferRequest;
use App\Http\Requests\ListOffersRequest;
use App\Models\Campus;
use App\Models\Offer;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

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
        $campuses = Campus::get(['id', 'name']);

        return Inertia::render('ExchangeMarket/Offers/Create/Index', ['campuses' => $campuses]);
    }

    public function store(CreateOfferRequest $request, CreateOfferAction $action)
    {
        // retrieve validated inputs except for the campuses
        $validatedOfferData = $request->except(['campuses', 'files']);
        // retrieve validated campuses
        $campuses = $request->validated('campuses', []);
        // retrieve validated files
        $files = $request->validated('files', []);

        // create the offer
        $action->handle(Auth::user(), $validatedOfferData, $campuses);

        return to_route('admin.exchange_market.offers.index')
            ->with('message', 'Votre offre a été soumise avec succès.')
            ->with('type', 'success');
    }
}
