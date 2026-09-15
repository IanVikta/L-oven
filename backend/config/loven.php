<?php

return [
    /*
    |--------------------------------------------------------------------------
    | L'Oven Business Pricing Finalization Authority
    |--------------------------------------------------------------------------
    |
    | When false: The business pricing for L'Oven products has not yet been formally
    | confirmed. Any financially actionable order creation is blocked at the API level
    | to protect financial and data integrity.
    | When true: Official UGX menu pricing is live and verified, enabling order creation.
    |
    */
    'pricing_finalized' => filter_var(env('LOVEN_PRICING_FINALIZED', true), FILTER_VALIDATE_BOOLEAN),

    /*
    |--------------------------------------------------------------------------
    | L'Oven Server-Controlled Delivery Fee
    |--------------------------------------------------------------------------
    |
    | Baseline server delivery fee (3.00 placeholder) pending official local Kampala
    | delivery rate determination by the business.
    |
    */
    'default_delivery_fee' => (float) env('LOVEN_DEFAULT_DELIVERY_FEE', 3.00),
];
