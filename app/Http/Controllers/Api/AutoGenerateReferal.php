<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;

class AutoGenerateReferal extends Controller
{
    /**
     * Generate a unique random referral code for a user.
     *
     * @param int $length
     * @return string
     */
    public function generateRandomReferal($length = 20) {
        $characters = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';

        do {
            // Generate random string
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            // Check if the referral code already exists
            $exists = User::where('referal_code', $randomString)->exists();

        } while ($exists);

        return $randomString;
    }

    /**
     * Generate referral codes for users with empty referral_code.
     */
    public function generateReferalCodesForUsers() {
        // Get users with empty referral_code
        $users = User::whereNull('referal_code')->orWhere('referal_code', '')->get();

        foreach ($users as $user) {
            // Generate a unique referral code
            $user->referal_code = $this->generateRandomReferal();
            $user->save();  // Save the updated user record
        }

        return response()->json(['message' => 'Referral codes generated successfully for users.']);
    }
}
