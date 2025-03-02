<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\ExchangeMarket;

use Inertia\Inertia;
use App\Models\Offer;
use App\Models\Campus;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Actions\Offer\CloseOfferAction;
use App\Actions\Offer\CreateOfferAction;
use App\Actions\Offer\DeleteOfferAction;
use App\Http\Requests\ListOffersRequest;
use App\Http\Requests\CreateOfferRequest;

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
        $request->validated('files', []);

        // create the offer
        $action->handle(Auth::user(), $validatedOfferData, $campuses);

        return to_route('admin.exchange_market.offers.index')
            ->with('message', 'Votre offre a été soumise avec succès.')
            ->with('type', 'success');
    }

    public function show(Offer $offer)
    {
        return Inertia::render('ExchangeMarket/Offers/Show/Index', ['offer' => $offer]);
    }

    public function edit(Offer $offer)
    {
        $offer->load('campuses');
        $campuses = Campus::get(['id', 'name']);

        return Inertia::render('ExchangeMarket/Offers/Edit/Index', [
            'offer' => $offer,
            'campuses' => $campuses,
        ]);
    }

    public function update(UpdateOfferRequest $request, Offer $offer, UpdateOfferAction $action)
    {
        // retrieve validated inputs except for the campuses
        $validatedOfferData = $request->except(['campuses', 'files']);
        // retrieve validated campuses
        $campuses = $request->validated('campuses', []);
        // retrieve validated files
        $request->validated('files', []);

        // update the offer
        $action->handle(Auth::user(), $validatedOfferData, $campuses, $offer);

        return to_route('admin.exchange_market.offers.index')
            ->with('message', 'Votre offre a été mise à jour avec succès.')
            ->with('type', 'success');
    }

    public function close(Offer $offer, CloseOfferAction $action)
    {
        $action->handle(Auth::user(), $offer);

        return to_route('admin.exchange_market.offers.index')
            ->with('message', 'Votre offre a été fermée avec succès.')
            ->with('type', 'success');
    }

    public function destroy(Offer $offer, DeleteOfferAction $action)
    {
        $action->handle(Auth::user(), $offer);

        return to_route('admin.exchange_market.offers.index')
            ->with('message', 'Votre offre a été supprimée avec succès.')
            ->with('type', 'success');
    }
}
