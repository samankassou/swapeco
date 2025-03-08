<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\Offers\OfferStatusEnum;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OfferPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('offer.view');
    }

    public function view(User $user, Offer $offer): bool
    {
        // Si l'offre est publiée, tout le monde peut la voir
        if ($offer->status->value === OfferStatusEnum::PUBLISHED->value) {
            return true;
        }

        // Sinon, seuls le propriétaire, les admins et les modérateurs peuvent voir
        return $user->id === $offer->user_id ||
            $user->hasRole(['admin', 'moderator']);
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('offer.create');
    }

    public function update(User $user, Offer $offer): bool
    {
        // Seul le propriétaire peut modifier son offre (ou admins/modérateurs)
        return $user->id === $offer->user_id ||
            $user->hasRole(['admin', 'moderator']);
    }

    public function delete(User $user, Offer $offer): bool
    {
        // Seul le propriétaire peut supprimer son offre (ou admins)
        return $user->id === $offer->user_id ||
            $user->hasRole('admin');
    }

    public function approve(User $user, Offer $offer): bool
    {
        return $user->hasPermissionTo('offer.approve');
    }

    public function close(User $user, Offer $offer): bool
    {
        // Le propriétaire ou les admins/modérateurs peuvent fermer une offre
        return $user->id === $offer->user_id ||
            $user->hasRole(['admin', 'moderator']);
    }
}
