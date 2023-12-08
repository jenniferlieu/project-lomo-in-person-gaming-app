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

        // use dummy api key in frontend
        $dummyApiKey = 'THE_DUMMY_API_KEY';

        // send the key to frontend
        return response()->json(['GOOGLE_MAPS_API_KEY' => $realApiKey]);
    }
}
