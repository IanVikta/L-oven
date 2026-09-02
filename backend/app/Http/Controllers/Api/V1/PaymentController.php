<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Services\MobileMoneyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected MobileMoneyService $mobileMoneyService;

    public function __construct(MobileMoneyService $mobileMoneyService)
    {
        $this->mobileMoneyService = $mobileMoneyService;
    }

    /**
     * Initiate Mobile Money STK Push Payment.
     */
    public function initiate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'order_number' => ['required', 'exists:orders,order_number'],
            'provider' => ['required', 'in:mtn,airtel,mpesa'],
            'phone_number' => ['required', 'string', 'max:20'],
        ]);

        $order = Order::where('order_number', $validated['order_number'])->firstOrFail();

        $payment = $this->mobileMoneyService->initiatePayment(
            $order,
            $validated['provider'],
            $validated['phone_number']
        );

        return response()->json([
            'message' => 'Payment request sent. Please approve the prompt on your phone.',
            'payment' => [
                'transaction_reference' => $payment->transaction_reference,
                'amount' => (float) $payment->amount,
                'status' => $payment->status,
                'provider' => strtoupper($validated['provider']),
            ],
        ]);
    }

    /**
     * Handle payment provider webhook callback.
     */
    public function callback(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'transaction_reference' => ['required', 'exists:payments,transaction_reference'],
            'status' => ['required', 'in:success,failed'],
        ]);

        $payment = $this->mobileMoneyService->processCallback(
            $validated['transaction_reference'],
            $validated['status'],
            $request->all()
        );

        return response()->json([
            'message' => 'Payment processed',
            'payment_status' => $payment->status,
            'order_payment_status' => $payment->order->payment_status,
        ]);
    }

    /**
     * Check payment status by transaction reference.
     */
    public function status(string $reference): JsonResponse
    {
        $payment = Payment::where('transaction_reference', $reference)
            ->with('order')
            ->firstOrFail();

        return response()->json([
            'payment' => [
                'transaction_reference' => $payment->transaction_reference,
                'amount' => (float) $payment->amount,
                'status' => $payment->status,
                'order_number' => $payment->order->order_number,
                'order_payment_status' => $payment->order->payment_status,
            ],
        ]);
    }
}
