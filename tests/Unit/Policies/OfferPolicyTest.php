<?php

declare(strict_types=1);

use App\Enums\Offers\OfferStatusEnum;
use App\Models\Offer;
use App\Models\User;
use App\Policies\OfferPolicy;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    // Set up permissions and roles using firstOrCreate instead of create
    Permission::firstOrCreate(['name' => 'offer.view']);
    Permission::firstOrCreate(['name' => 'offer.create']);
    Permission::firstOrCreate(['name' => 'offer.approve']);

    $adminRole = Role::firstOrCreate(['name' => 'admin']);
    $moderatorRole = Role::firstOrCreate(['name' => 'moderator']);

    // Assign permissions
    $adminRole->syncPermissions(['offer.view', 'offer.create', 'offer.approve']);
    $moderatorRole->syncPermissions(['offer.view', 'offer.create', 'offer.approve']);

    $this->policy = new OfferPolicy();
});

test('viewAny allows users with offer.view permission', function () {
    $user = User::factory()->create();
    $user->givePermissionTo('offer.view');

    expect($this->policy->viewAny($user))->toBeTrue();
});

test('viewAny denies users without offer.view permission', function () {
    $user = User::factory()->create();

    expect($this->policy->viewAny($user))->toBeFalse();
});

test('view allows anyone to see published offers', function () {
    $user = User::factory()->create();
    $offer = Offer::factory()->create([
        'status' => OfferStatusEnum::PUBLISHED,
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->view($user, $offer))->toBeTrue();
});

test('view allows owner to see their unpublished offers', function () {
    $user = User::factory()->create();
    $offer = Offer::factory()->create([
        'status' => OfferStatusEnum::DRAFT,
        'user_id' => $user->id,
    ]);

    expect($this->policy->view($user, $offer))->toBeTrue();
});

test('view allows admin to see unpublished offers', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $offer = Offer::factory()->create([
        'status' => OfferStatusEnum::DRAFT,
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->view($admin, $offer))->toBeTrue();
});

test('view allows moderator to see unpublished offers', function () {
    $moderator = User::factory()->create();
    $moderator->assignRole('moderator');

    $offer = Offer::factory()->create([
        'status' => OfferStatusEnum::DRAFT,
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->view($moderator, $offer))->toBeTrue();
});

test('view denies other users from seeing unpublished offers', function () {
    $user = User::factory()->create();
    $offer = Offer::factory()->create([
        'status' => OfferStatusEnum::DRAFT,
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->view($user, $offer))->toBeFalse();
});

test('create allows users with offer.create permission', function () {
    $user = User::factory()->create();
    $user->givePermissionTo('offer.create');

    expect($this->policy->create($user))->toBeTrue();
});

test('create denies users without offer.create permission', function () {
    $user = User::factory()->create();

    expect($this->policy->create($user))->toBeFalse();
});

test('update allows offer owner', function () {
    $user = User::factory()->create();
    $offer = Offer::factory()->create(['user_id' => $user->id]);

    expect($this->policy->update($user, $offer))->toBeTrue();
});

test('update allows admin', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $offer = Offer::factory()->create([
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->update($admin, $offer))->toBeTrue();
});

test('update allows moderator', function () {
    $moderator = User::factory()->create();
    $moderator->assignRole('moderator');

    $offer = Offer::factory()->create([
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->update($moderator, $offer))->toBeTrue();
});

test('update denies other users', function () {
    $user = User::factory()->create();
    $offer = Offer::factory()->create([
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->update($user, $offer))->toBeFalse();
});

test('delete allows offer owner', function () {
    $user = User::factory()->create();
    $offer = Offer::factory()->create(['user_id' => $user->id]);

    expect($this->policy->delete($user, $offer))->toBeTrue();
});

test('delete allows admin', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $offer = Offer::factory()->create([
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->delete($admin, $offer))->toBeTrue();
});

test('delete denies moderator', function () {
    $moderator = User::factory()->create();
    $moderator->assignRole('moderator');

    $offer = Offer::factory()->create([
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->delete($moderator, $offer))->toBeFalse();
});

test('delete denies other users', function () {
    $user = User::factory()->create();
    $offer = Offer::factory()->create([
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->delete($user, $offer))->toBeFalse();
});

test('approve allows users with offer.approve permission', function () {
    $user = User::factory()->create();
    $user->givePermissionTo('offer.approve');
    $offer = Offer::factory()->create();

    expect($this->policy->approve($user, $offer))->toBeTrue();
});

test('approve denies users without offer.approve permission', function () {
    $user = User::factory()->create();
    $offer = Offer::factory()->create(['user_id' => $user->id]);

    expect($this->policy->approve($user, $offer))->toBeFalse();
});

test('close allows offer owner', function () {
    $user = User::factory()->create();
    $offer = Offer::factory()->create(['user_id' => $user->id]);

    expect($this->policy->close($user, $offer))->toBeTrue();
});

test('close allows admin', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $offer = Offer::factory()->create([
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->close($admin, $offer))->toBeTrue();
});

test('close allows moderator', function () {
    $moderator = User::factory()->create();
    $moderator->assignRole('moderator');

    $offer = Offer::factory()->create([
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->close($moderator, $offer))->toBeTrue();
});

test('close denies other users', function () {
    $user = User::factory()->create();
    $offer = Offer::factory()->create([
        'user_id' => User::factory()->create()->id,
    ]);

    expect($this->policy->close($user, $offer))->toBeFalse();
});
