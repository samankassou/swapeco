<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        // Offer permissions
        Permission::create(['name' => 'offer.create']);
        Permission::create(['name' => 'offer.view']);
        Permission::create(['name' => 'offer.edit']);
        Permission::create(['name' => 'offer.delete']);
        Permission::create(['name' => 'offer.approve']);
        Permission::create(['name' => 'offer.close']);
        Permission::create(['name' => 'offer.view_all']);

        // User permissions
        Permission::create(['name' => 'user.create']);
        Permission::create(['name' => 'user.view']);
        Permission::create(['name' => 'user.edit']);
        Permission::create(['name' => 'user.delete']);

        // Campus permissions
        Permission::create(['name' => 'campus.manage']);

        // Territory permissions
        Permission::create(['name' => 'territory.manage']);
        Permission::create(['name' => 'territory.promote']);

        // Create roles and assign permissions

        // 1. Administrator - full access
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        // 2. Moderator - can moderate offers
        $moderator = Role::create(['name' => 'moderator']);
        $moderator->givePermissionTo([
            'offer.view',
            'offer.view_all',
            'offer.approve',
            'offer.close',
            'user.view',
        ]);

        // 3. Eco-company - can manage their own offers
        $ecoCompany = Role::create(['name' => 'eco-company']);
        $ecoCompany->givePermissionTo([
            'offer.create',
            'offer.view',
            'offer.edit',
            'offer.close',
        ]);

        // 4. Eco-contributor - can view and create offers
        $ecoContributor = Role::create(['name' => 'eco-contributor']);
        $ecoContributor->givePermissionTo([
            'offer.create',
            'offer.view',
            'offer.edit',
            'offer.close',
        ]);

        // 5. Territory promoter - can promote territories
        $territoryPromoter = Role::create(['name' => 'territory-promoter']);
        $territoryPromoter->givePermissionTo([
            'offer.view',
            'territory.promote',
        ]);
    }
};
