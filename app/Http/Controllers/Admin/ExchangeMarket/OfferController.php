<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\ExchangeMarket;

use App\Actions\Offer\ApproveOfferAction;
use App\Actions\Offer\CloseOfferAction;
use App\Actions\Offer\CreateOfferAction;
use App\Actions\Offer\DeleteOfferAction;
use App\Actions\Offer\UpdateOfferAction;
use App\Enums\Offers\OfferStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOfferRequest;
use App\Http\Requests\ListOffersRequest;
use App\Http\Requests\UpdateOfferRequest;
use App\Http\Resources\OfferResource;
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
        $query = Offer::where('status', OfferStatusEnum::PUBLISHED->value);

        $offers = QueryBuilder::for($query)
            ->allowedFilters([
                'title',
                AllowedFilter::exact('type')->ignore('all'),
                AllowedFilter::exact('status')->ignore('all'),
            ])
            ->allowedSorts(['created_at', 'title'])
            ->defaultSort('-created_at')
            ->with('campuses')
            ->paginate()
            ->appends($request->query());

        $campuses = Campus::get(['id', 'name']);

        return Inertia::render('ExchangeMarket/Offers/List/Index', [
            'offers' => OfferResource::collection($offers)->response()->getData(true),
            'campuses' => $campuses,
        ]);
    }

    public function myOffers()
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
            ->with('campuses')
            ->paginate();

        $campuses = Campus::get(['id', 'name']);

        return Inertia::render('ExchangeMarket/Offers/MyOffers/Index', [
            'offers' => OfferResource::collection($offers)->response()->getData(true),
            'campuses' => $campuses,
        ]);
    }

    public function create()
    {
        $campuses = Campus::get(['id', 'name']);

        return Inertia::render('ExchangeMarket/Offers/Create/Index', ['campuses' => $campuses]);
    }

    public function store(CreateOfferRequest $request, CreateOfferAction $action)
    {
        // retrieve validated inputs except for the campuses
        $validatedOfferData = $request->except(['campuses', 'images']);
        // retrieve validated campuses
        $campuses = $request->validated('campuses', []);
        // retrieve validated images
        $request->validated('images', []);

        // create the offer
        $action->handle(Auth::user(), $validatedOfferData, $campuses);

        // notify admin that a new offer has been submitted

        return to_route('admin.exchange_market.offers.me')
            ->with('message', 'Votre offre a été soumise avec succès.')
            ->with('type', 'success');
    }

    public function show(Offer $offer)
    {
        $offer->load('campuses');
        $offer->load('owner');

        // Obtenir directement le tableau de ressource sans l'enveloppe 'data'
        $offerData = OfferResource::make($offer)->resolve();

        return Inertia::render('ExchangeMarket/Offers/Show/Index', [
            'offer' => $offerData,
        ]);
    }

    public function edit(Offer $offer)
    {
        $offer->load('campuses');

        // load media images from spatie
        $images = $offer->getMedia('images')->map(fn ($media): array => [
            'id' => $media->id,
            'name' => $media->file_name,
            'url' => $media->getUrl(),
        ]);

        return Inertia::render('ExchangeMarket/Offers/Edit/Index', [
            'offer' => $offer,
            'images' => $images,
            'campuses' => Campus::get(['id', 'name']),
        ]);
    }

    public function update(UpdateOfferRequest $request, Offer $offer, UpdateOfferAction $action)
    {
        // retrieve validated inputs except for the campuses
        $validatedOfferData = $request->except(['campuses', 'images', 'delete_images']);
        // set the status to pending
        $validatedOfferData['status'] = OfferStatusEnum::PENDING->value;
        // retrieve validated campuses
        $campuses = $request->array('campuses');

        // update the offer
        $action->handle(Auth::user(), $offer, $validatedOfferData, $campuses);

        // notify admin that a new offer has been submitted

        return to_route('admin.exchange_market.offers.me')
            ->with('message', 'Votre offre a été mise à jour avec succès.')
            ->with('type', 'success');
    }

    public function approve(Offer $offer, ApproveOfferAction $action)
    {
        $action->handle(Auth::user(), $offer);

        return to_route('admin.exchange_market.offers.me')
            ->with('message', 'L\'offre a été approuvée avec succès.')
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
