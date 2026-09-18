<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

class ContactController extends Controller
{
    /**
     * Handle incoming contact form submissions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|min:2|max:100',
            'email'    => 'required|email|max:150',
            'phone'    => 'nullable|string|max:30',
            'subject'  => 'required|string|min:3|max:200',
            'category' => 'nullable|string|max:50',
            'message'  => 'required|string|min:10|max:3000',
        ]);

        $mailHost     = config('mail.mailers.smtp.host', env('MAIL_HOST', 'smtp.gmail.com'));
        $mailPort     = (int) config('mail.mailers.smtp.port', env('MAIL_PORT', 587));
        $mailUser     = env('MAIL_USERNAME');
        $mailPass     = env('MAIL_PASSWORD');
        $mailEnc      = env('MAIL_ENCRYPTION', 'tls');
        $fromAddress  = env('MAIL_FROM_ADDRESS', 'lovencoffee2@gmail.com');
        $fromName     = env('MAIL_FROM_NAME', "L'Oven Coffee & Bakery");
        $recipient    = env('CONTACT_RECEIVER_EMAIL', 'lovencoffee2@gmail.com');

        // Prepare email HTML content
        $categoryName = !empty($validated['category']) ? ucfirst($validated['category']) : 'General Inquiry';
        $phoneFormatted = !empty($validated['phone']) ? e($validated['phone']) : 'Not Provided';
        $safeName = e($validated['name']);
        $safeEmail = e($validated['email']);
        $safeSubject = e($validated['subject']);
        $safeMessage = nl2br(e($validated['message']));

        $htmlBody = "
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='utf-8'>
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f3ee; margin: 0; padding: 20px; color: #3c2415; }
                    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e8dfd5; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
                    .header { background: #2a170e; color: #f7f3ee; padding: 30px; text-align: center; }
                    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
                    .header p { margin: 5px 0 0 0; color: #e59b58; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; }
                    .content { padding: 30px; }
                    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
                    .meta-table td { padding: 10px 12px; border-bottom: 1px solid #f0e8e0; font-size: 14px; }
                    .meta-label { font-weight: bold; color: #8c532b; width: 35%; }
                    .message-box { background: #fdfaf6; border-left: 4px solid #d96b27; padding: 18px; border-radius: 8px; font-size: 15px; line-height: 1.6; color: #2c1b10; }
                    .footer { background: #faf6f0; text-align: center; padding: 18px; font-size: 12px; color: #8c7365; border-top: 1px solid #efe7de; }
                </style>
            </head>
            <body>
                <div class='card'>
                    <div class='header'>
                        <h1>L'Oven Coffee &amp; Bakery</h1>
                        <p>New Website Contact Inquiry</p>
                    </div>
                    <div class='content'>
                        <table class='meta-table'>
                            <tr>
                                <td class='meta-label'>Sender Name:</td>
                                <td><strong>{$safeName}</strong></td>
                            </tr>
                            <tr>
                                <td class='meta-label'>Email Address:</td>
                                <td><a href='mailto:{$safeEmail}' style='color: #d96b27;'>{$safeEmail}</a></td>
                            </tr>
                            <tr>
                                <td class='meta-label'>Phone:</td>
                                <td>{$phoneFormatted}</td>
                            </tr>
                            <tr>
                                <td class='meta-label'>Inquiry Type:</td>
                                <td><span style='background: #fff3e6; color: #d96b27; padding: 3px 8px; border-radius: 4px; font-weight: 600; font-size: 12px;'>{$categoryName}</span></td>
                            </tr>
                            <tr>
                                <td class='meta-label'>Subject:</td>
                                <td><strong>{$safeSubject}</strong></td>
                            </tr>
                        </table>
                        
                        <div style='margin-bottom: 8px; font-weight: bold; color: #3c2415; font-size: 14px;'>Message Content:</div>
                        <div class='message-box'>
                            {$safeMessage}
                        </div>
                    </div>
                    <div class='footer'>
                        Sent via L'Oven Coffee Web Portal • " . date('Y-m-d H:i:s T') . "
                    </div>
                </div>
            </body>
            </html>
        ";

        $altBody = "New Contact Inquiry from {$safeName} ({$safeEmail})\n"
            . "Subject: {$safeSubject}\n"
            . "Category: {$categoryName}\n"
            . "Phone: {$phoneFormatted}\n\n"
            . "Message:\n" . $validated['message'];

        $mailSent = false;
        $errorNotice = null;

        // Try PHPMailer SMTP sending if username is provided
        if (!empty($mailUser) && $mailUser !== 'null') {
            try {
                $mail = new PHPMailer(true);

                // Server settings
                $mail->isSMTP();
                $mail->Host       = $mailHost;
                $mail->SMTPAuth   = true;
                $mail->Username   = $mailUser;
                $mail->Password   = $mailPass;

                if ($mailEnc === 'ssl' || $mailEnc === 'phpssl') {
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                } else {
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                }
                $mail->Port       = $mailPort;

                // Recipients
                $mail->setFrom($fromAddress, $fromName);
                $mail->addAddress($recipient, "L'Oven Support Team");
                $mail->addReplyTo($validated['email'], $validated['name']);

                // Content
                $mail->isHTML(true);
                $mail->Subject = "[L'Oven Contact] " . $validated['subject'];
                $mail->Body    = $htmlBody;
                $mail->AltBody = $altBody;

                $mail->send();
                $mailSent = true;
                Log::info("Contact email successfully sent via PHPMailer to Mailtrap from {$validated['email']}");
            } catch (PHPMailerException $e) {
                Log::error("PHPMailer Exception: " . $e->getMessage());
                $errorNotice = $e->getMessage();
            } catch (\Exception $e) {
                Log::error("General Exception in ContactController: " . $e->getMessage());
                $errorNotice = $e->getMessage();
            }
        } else {
            Log::notice("Mailtrap credentials (MAIL_USERNAME/MAIL_PASSWORD) not configured yet in backend/.env. Email content logged to storage/logs/laravel.log.");
            Log::info("--- CONTACT FORM EMAIL CONTENT ---\nFrom: {$validated['name']} <{$validated['email']}>\nSubject: {$validated['subject']}\n{$altBody}");
            $mailSent = true; // Mark as processed so user can test UI flow seamlessly
        }

        if ($mailSent) {
            return response()->json([
                'success' => true,
                'message' => 'Thank you for reaching out to L\'Oven! Your message has been received and our team will get back to you shortly.',
                'data'    => [
                    'name'    => $validated['name'],
                    'email'   => $validated['email'],
                    'subject' => $validated['subject'],
                ]
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Unable to send message at this time: ' . ($errorNotice ?? 'SMTP delivery failed.'),
        ], 500);
    }
}
