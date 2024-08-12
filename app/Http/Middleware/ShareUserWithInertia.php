<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ShareUserWithInertia
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Share the authenticated user with Inertia.js
        Inertia::share('auth.user', function () use ($request) {
            $user = $request->user();

            if ($user) {
                // Return user data with roles
                return array_merge(
                    $user->only('id', 'name', 'email'),
                    ['roles' => $user->getRoleNames()]  // Add roles to the shared data
                );
            }

            return null;
        });

        return $next($request);
    }
}
