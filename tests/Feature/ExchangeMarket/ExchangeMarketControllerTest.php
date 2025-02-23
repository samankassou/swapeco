<?php

declare(strict_types=1);

it('exchange market page is displayed', function () {
    $response = $this->get('/admin/exchange-market');

    $response->assertOk();
});
