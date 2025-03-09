<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;



Route::group(
    ['middleware' => ['auth', 'verified'], 'prefix' => 'admin', 'as' => 'admin.'],
    function () {
        Route::resource(
            'users',
            UserController::class,
        );
    }
);
