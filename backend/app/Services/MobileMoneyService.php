<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Str;

class MobileMoneyService
{
    /**
     * Initiate Mobile Money STK Push transaction.
     */
    public function initiatePayment(Order $order, string $provider, string $phoneNumber): Payment
    {
        $reference = 'MM-' . strtoupper($provider) . '-' . date('YmdHis') . '-' . Str::random(4);

        $payment = Payment::create([
            'order_id' => $order->id,
            'payment_method' => strtolower($provider) === 'airtel' ? 'mpesa' : 'mpesa',
            'transaction_reference' => $reference,
            'amount' => $order->total_amount,
            'status' => 'pending',
            'payment_gateway_response' => [
                'provider' => strtoupper($provider),
                'phone_number' => $phoneNumber,
                'initiated_at' => now()->toIso8601String(),
                'checkout_request_id' => 'REQ-' . Str::uuid(),
            ],
        ]);

        return $payment;
    }

    /**
     * Process payment completion webhook callback.
     */
    public function processCallback(string $reference, string $status, array $payload = []): Payment
    {
        $payment = Payment::where('transaction_reference', $reference)->firstOrFail();

        $payment->status = $status === 'success' ? 'completed' : 'failed';
        $payment->payment_gateway_response = array_merge($payment->payment_gateway_response ?? [], [
            'completed_at' => now()->toIso8601String(),
            'callback_payload' => $payload,
        ]);
        $payment->save();

        if ($payment->status === 'completed') {
            $order = $payment->order;
            $order->payment_status = 'paid';
            $order->save();
        }

        return $payment;
    }
}
