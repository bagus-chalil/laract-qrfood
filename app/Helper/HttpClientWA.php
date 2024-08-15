<?php

namespace App\Helper;

use App\Models\Version;
use Illuminate\Support\Facades\Http;

class HttpClientWA
{
    public function sendMessage($nomor, $message)
    {
        // Set request headers
        $headers = [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xhcmF2ZWwtd2Etc2VydmVyLXYyLmtpbWlhZmFybWEuYXBwL2FwaS9sb2dpbiIsImlhdCI6MTcyMzczMTk1NywiZXhwIjoxODgxNDk4MzU3LCJuYmYiOjE3MjM3MzE5NTcsImp0aSI6Ims4UGxtSUdxWWE5ZTU0RzIiLCJzdWIiOiIyIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.IBt5MZ3_h2ziX2m4GD__0pqnR6kMcAUWVkkaO305VzA',
            'Cookie' => 'XSRF-TOKEN=eyJpdiI6IklDSmtKMWlEb3EyTTU1MmhWSnpsbnc9PSIsInZhbHVlIjoiMWYrdU9vQ3pSdDFsYWhZa0lPU0dpTjkxbzREeXhFOCtmc3dyTTgwQSt4QWRrZkhsOUllRExXTWEvNFQ3RDlaeVJmRVU4Q1pqYUJlNmlodkozVVNobzU0eXZ0bWJtbGtvcEtMSTVGNlhJK0xxYVZ4UTk5YWVPOExyZkJsKy9uVFIiLCJtYWMiOiJhN2IzZGEzZWQ5MzUzNTA2OThhMTczOTk3MTU4ZmUzMzI3NTZiNDE1MzAyOWIwMmNlODZlZmI3OGFiZTI2NTllIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjhoK1BkdkV2WGVGMlRlS1hVOHBXVEE9PSIsInZhbHVlIjoiQkt1c094ckVON01sTG8zT25kSm52K1I5aU81NEN1UDl5VnpIRXlYL29nTVEveDBWNWtUL0pqMnpremR3d1FJeGphc05sZzdRS3RFa0JpSW1EMjlXRlo1b1ZGVE80T1AvRmllejdmNnJ5RnhTQllBV0tBWmVtdFZ4NitLaFZ4SW0iLCJtYWMiOiI2MTBiMjVlZTczNWY5N2ZkYTkzYmJmOGFiMmVkMjdjYmIxOGFlMzQyY2Y4NWEwOTE2OTA1NWUyNmYyYWJhYWI0IiwidGFnIjoiIn0%3D'
        ];

        // Set request body
        $body = [
            'device' => '1',
            'type' => 'Text',
            'number' => $nomor,
            'text' => $message
        ];

        try {
            // Send HTTP POST request
            $response = Http::withHeaders($headers)->post('https://laravel-wa-server-v2.kimiafarma.app/api/send-message', $body);

            // Return the response body
            return $response->body();
        } catch (\Exception $e) {
            // Return the exception message
            return $e->getMessage();
        }
    }
}
