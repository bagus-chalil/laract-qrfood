<?php

namespace App\Console\Commands;

use App\Mail\MailReferalCodeUser;
use App\Models\User;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendEmailReferalCode extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mail:referalcode';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Log::info("Cron Job started at ". now());

        $user = User::where('send_email',0)->get();
        dd($user);
        foreach ($user as $key => $value) {
            try {
                if ($value) {
                    Mail::to($value->email)->send(new MailReferalCodeUser($value));
                    $user = User::find($value->id)->update(['send_email'=>1]);
                } else {
                    Log::warning("User not found with email:".$value->email);
                }
            } catch (Exception $e) {
                Log::error("Failed to send referral code email: " . $e->getMessage());
            }
        }
        Log::info("Cron Job ended at ". now());
    }
}
