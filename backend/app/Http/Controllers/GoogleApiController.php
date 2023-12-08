<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GoogleApiController extends Controller
{
    public function googleApiRequest(Request $request)
    {   
        //get the google api key from .env file
        $realApiKey = env('GOOGLE_API_KEY');

        // Define the actual Google API endpoint
        $apiEndpoint = 'google-api-test.com';

        $queryParams = [
            'key' => $realApiKey,
        ];

        // Make the HTTP request to the Google API
        $response = Http::get($apiEndpoint, $queryParams);
    }
}
