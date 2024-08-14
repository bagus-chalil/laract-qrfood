<?php

use App\Mail\MailReferalCodeUser;
use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::call(function () {
    Log::info("Cron Job started at ". now());

    $users = User::where('send_email',0)->get();

    foreach ($users as $key => $user) {
        try {
            if ($user) {
                Mail::to($user->email)->send(new MailReferalCodeUser($user));
                $user = User::find($user->id)->update(['send_email'=>1]);
            } else {
                Log::warning("User not found with email: mohammad.bagus@kimiafarma.co.id");
            }
        } catch (Exception $e) {
            Log::error("Failed to send referral code email: " . $e->getMessage());
        }
    }
    Log::info("Cron Job ended at ". now());
})->everyMinute();
