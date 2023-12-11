---
sidebar_position: 2
---
# Backend Unit Tests

Laravel uses the built-in [PHPUnit testing framework](https://phpunit.de/) to create and run all tests.

Backend tests are automated by Github Actions and run every time a new pull request is made into the main branch.

[![Test Backend](https://github.com/Capstone-Projects-2023-Fall/project-lomo-in-person-gaming-app/actions/workflows/test-backend.yml/badge.svg)](https://github.com/Capstone-Projects-2023-Fall/project-lomo-in-person-gaming-app/actions/workflows/test-backend.yml)

## Test Coverage

Results printed from the `sail artisan test --coverage` command. 

```
Console/Kernel ............................... 16 / 66.7%  
  Exceptions/Handler ............................... 100.0%  
  Http/Controllers/BeaconController .... 16, 43..59 / 55.6%  
  Http/Controllers/Controller ...................... 100.0%  
  Http/Controllers/PostController .................... 0.0%  
  Http/Controllers/UserController .................... 0.0%  
  Http/Kernel ...................................... 100.0%  
  Http/Middleware/Authenticate ....................... 0.0%  
  Http/Middleware/EncryptCookies ................... 100.0%  
  Http/Middleware/PreventRequestsDuringMaintenance . 100.0%  
  Http/Middleware/RedirectIfAuthenticated ............ 0.0%  
  Http/Middleware/TrimStrings ...................... 100.0%  
  Http/Middleware/TrustHosts ......................... 0.0%  
  Http/Middleware/TrustProxies ..................... 100.0%  
  Http/Middleware/ValidateSignature ................ 100.0%  
  Http/Middleware/VerifyCsrfToken .................. 100.0%  
  Models/Beacon .................................... 100.0%  
  Models/Post ...................................... 100.0%  
  Models/User ...................................... 100.0%  
  Providers/AppServiceProvider ..................... 100.0%  
  Providers/AuthServiceProvider .................... 100.0%  
  Providers/BroadcastServiceProvider ................. 0.0%  
  Providers/EventServiceProvider ................... 100.0%  
  Providers/RouteServiceProvider ................... 100.0%  
  ─────────────────────────────────────────────────────────  
                                              Total: 41.4 %  
```

## Tests

### BeaconControllerTest

#### Test: POST request to api/beacons is successful
```test_post_beacon_request_returns_successful_response()```
- Assert: HTTP status code 201 for successful resource creation

#### Test: POST request to api/beacons fails when required fields are empty
```test_post_beacon_request_fails_when_required_fields_are_empty()```
- Assert: HTTP status code 422 for unprocessable entity

#### Test: GET request to api/beacons is successful
```test_get_all_beacons()```
- Assert: HTTP status code 200 for successful response

#### Test: BeaconCreated Event is dispatched successfully 
```test_beacon_created_event_dispatched()```
- Assert: Dispatched is true

### UserControllerTest

#### Test: GET request to api/users is successful
```test_get_all_users()```
- Assert: HTTP status code 200 for successful response

#### Test: Show existing user
```test_show_existing_user()```
- Assertions:
  - HTTP status code 200 for successful response
  - Returned JSON structure includes user data (id, email, username, avatar)

#### Test: Delete existing user
```test_delete_existing_user()```
- Assertions:
  - HTTP status code 200 for successful response
  - Returned JSON includes the message "User deleted successfully"
  - User no longer exists in the database

### ProfileControllerTest

#### Test: GET request to api/profiles is successful
```testIndexProfiles()```
- Assert: HTTP status code 200 for successful response

#### Test: Show existing profile
```testShowProfile()```
- Assertions:
  - HTTP status code 200 for successful response
  - Returned JSON structure includes profile data

#### Test: Delete existing profile
```testDestroyProfile()```
- Assertions:
  - HTTP status code 200 for successful response
  - Returned JSON includes the message "Profile deleted successfully"
  - profiles no longer exists in the database

#### Test: Update existing profile
```testUpdateProfile()```
- Assertions:
  - HTTP status code 200 for successful response
  - Returned JSON includes the message "Profile Update successfully"
  - profiles data update in the database

#### Test: Store new profile
```testStoreProfile()```
- Assertions:
  - HTTP status code 200 for successful response
  - Returned JSON includes the message "Profile store successfully"
  - profiles data store in the database

### DatabaseConnectionTest

#### Test: Database connection to the testing database
```test_database_connection_to_testing_schema()```
- Assert: Connection established

#### Test: Database connection to the production database
```test_database_connection_to_public_schema()```
- Assert: Connection established

### GameControllerTest
#### Test: IGDB API to get games by name, GET request to api/games is successful
```test_get_games_by_name()```
- Assert: 
  - HTTP status code 200 for successful response
  - Expecte JSON returned