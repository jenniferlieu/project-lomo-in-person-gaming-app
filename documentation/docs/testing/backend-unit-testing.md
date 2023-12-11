---
sidebar_position: 2
---
# Backend Unit Tests

Laravel uses the built-in [PHPUnit testing framework](https://phpunit.de/) to create and run all tests.

Backend tests are automated by Github Actions and run every time a new pull request is made into the main branch.

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

### AttendeeControllerTest
#### Test: GET request to api/attendees is successful
```test_get_all_attendees()```
- Assert: HTTP status code 200 for successful response

#### Test: DELETE request to api/attendees/{user_id}/beacon/{beacon_id} is successful
```test_delete_attendee()```
- Assert: HTTP status code 200 for successful response

#### Test: POST request to api/attendees is successful
```test_store_attendee()```
- Assert: HTTP status code 201 for successful response

#### Test: PATCH request to api/attendees/{user_id}/beacon/{beacon_id} is successful
```test_update_attendee()```
- Assert: HTTP status code 200 for successful response

#### Test: GET request to api/attendee/{attendee} is successful
```test_show_attendee()```
- Assert: HTTP status code 200 for successful response 
