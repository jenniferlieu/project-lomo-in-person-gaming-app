<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DatabaseConnectionTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_database_connection(): void
    {
        \DB::connection() ->getPDO();
        $response = \DB::connection()->getDatabaseName();
        $this->assertEquals($response,!null);
    }
}
