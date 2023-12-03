<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;

class DatabaseConnectionTest extends TestCase
{
    /**
     * Test database connection to testing schema
     */
    public function test_database_connection_to_testing_schema(): void
    {
        $pdo = DB::connection()->getPDO();
        $this->assertEquals(\PDO::ERRMODE_EXCEPTION, $pdo->getAttribute(\PDO::ATTR_ERRMODE));
    }

    /**
     * Test database connection to public schema
     */
    public function test_database_connection_to_public_schema(): void
    {
        $pdo = DB::connection('pgsql')->getPDO(); // uses the pgsql connection defined in config/database.php
        $this->assertEquals(\PDO::ERRMODE_EXCEPTION, $pdo->getAttribute(\PDO::ATTR_ERRMODE));
    }
}
