---
sidebar_position: 5
---
# Testing

Laravel has its own builtin testing suite.

Please refer to the [Laravel testing docs](https://laravel.com/docs/10.x/testing) on how to test.

Feature tests in the backend will be testing the [Use Cases](https://capstone-projects-2023-fall.github.io/project-lomo-in-person-gaming-app/docs/requirements/use-case-descriptions) listed in the LOMO docusaurus, and they will also be listed in the LOMO miro board.

## Run tests
```bash
sail artisan test
```

For the docker command, check out the [Docker commands guide](/contributing/docker-commands).

## Create tests

First, check the `Feature` to see if it's already created under `app/tests/Feature`. If a feature test doesn't exist, then generate a new test using `sail artisan make:test FeatureTestName`.

```php
// CreateBeaconTest.php

class CreateBeaconTest extends TestCase
{
    /**
     * Tests the post request to the '/api/beacons' route to create a new beacon.
     * Should return success status code 201 for successful resource creation.
     */
    public function test_post_request_returns_successful_response(): void
    {
        // sending dummy JSON data to the /api/beacons route
        // when sending a POST request, we should let the backend know to return json data back.
        $response = $this->withHeaders([
            'Accept' => 'application/json'
        ])->post('/api/beacons', [
            'host_id' => '0',
            'title' => 'Smash brothers',
        ]);

        $response->assertStatus(201);
    }

    /**
     * Tests that validation checks FAIL on the POST request for beacons.
     * Should return a 422 status code for unprocessable entity.
     */
    public function test_validation_should_fail_on_post_request_returns_error_response(): void
    {
        // when sending a POST request, we should let the backend know to return json data back.
        $response = $this->withHeaders([
            'Accept' => 'application/json'
        ])->post('/api/beacons', ['host_id' => '', 'title' => '',]);

        $response->assertStatus(422);
    }
}
```