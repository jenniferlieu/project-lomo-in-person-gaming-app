<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Foundation\AliasLoader;
use Laravel\Sanctum\Sanctum;
use App\Models\PersonalAccessToken;
use romanzipp\Twitch\Concerns\Api\GamesTrait;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Override the GamesTrait class
        $loader = AliasLoader::getInstance();
        $loader->alias(GamesTrait::class, \App\Overrides\GamesTrait::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // format personal access token to use uuid primary key
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
