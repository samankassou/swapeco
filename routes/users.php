<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::group(
    ['middleware' => ['auth', 'verified'], 'prefix' => 'admin', 'as' => 'admin.'],
    function () {
        Route::resource(
            'users',
            UserController::class,
        );
    }
);
