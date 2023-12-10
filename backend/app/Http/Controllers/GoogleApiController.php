<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GoogleApiController extends Controller
{
    /**
     * Get the Google API key from the configuration and send it to the frontend.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @lrd:start
     * Get the Google API key from the configuration and send it to the frontend.
     * @lrd:end
     */
    public function googleApiRequest(Request $request)
    {   
        //get the google api key from config
        $realApiKey = config('google.api_key');
        
        // send the key to frontend
        return response()->json(['api_key' => $realApiKey]);
    }
}
