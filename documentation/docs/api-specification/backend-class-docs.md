---
sidebar_position: 2
description: Documentation for Laravel classes
---
# Backend Class Documentation

Documentation for the Laravel backend classes.

## Controller Classes
### UserController Class

The purpose of this class is to handle HTTP requests pertaining to the `/api/users` route.

- **`index()` method: Gets a list of all users from the database**
  - Pre-condition: GET /api/users/
  - Returns: JSON response with HTTP status code
- **`store()` method: Creates a user in the database**
  - Pre-condition: POST /api/users/{user}
  - Parameters: Request request
  - Returns: JSON response with HTTP status code
- **`show(User $user)` method: Gets user data from the database using their user_id**
  - Pre-condition: GET /api/users/{user}
  - Parameters: User $user
  - Returns: JSON response with HTTP status code
- **`update(User $user)` method: Updates the user's data in the database**
  - Pre-conditions:
    - PUT /api/users/{user}
    - PATCH /api/users/{user}
  - Parameters: User $user
  - Returns: JSON response with HTTP status code
- **`delete(User $user)` method: Deletes a user from the database using their user_id**
  - Pre-condition: DELETE /api/users/{user}
  - Parameters: User $user
  - Returns: JSON response with HTTP status code

  # ProfileController Class

The `ProfileController` class is responsible for handling HTTP requests related to user profiles.

## `index()` Method: Retrieve all profiles from the database.
  - Pre-condition: GET /api/profiles/
  - Returns: JSON response with HTTP status code
## `show($userId)` Method: Find and display the profile by user ID.
  - Pre-condition: GET /api/profiles/{userId}
  - Parameters: int $userId
  - Returns: JSON response with HTTP status code
## `update(ProfileUpdateRequest $request, $userId)` Method: Update the profile with the specified user ID.
  - Pre-condition: PUT /api/profiles/{userId}
  - Parameters: Request $request, int $userId
  - Returns: JSON response with HTTP status code
## `destroy($userId)` Method: Delete the profile with the specified user ID.
  - Pre-condition: DELETE /api/profiles/{userId}
  - Parameters: int $userId
  - Returns: JSON response with HTTP status code
## `store(ProfileStoreRequest $request)` Method: Create a new profile with the specified user ID.
  - Pre-condition: POST /api/profiles/
  - Parameters: Request $request
  - Returns: JSON response with HTTP status code


### BeaconController Class
The purpose of this class is to handle data pertaining to the `/api/beacons` route.

- **`index()` method: Gets a list of all beacons from the database**
  - Pre-condition: GET /api/beacons/
  - Returns: JSON response with HTTP status code
- **`store(BeaconPostRequest $request)` method: Creates a beacon in the database**
  - Pre-condition: POST /api/beacons/{beacon}
  - Parameters: BeaconPostRequest request
  - Returns: JSON response with HTTP status code
- **`show(Beacon $beacon)` method: Gets user beacon from the database using their beacon_id**
  - Pre-condition: GET /api/beacons/{beacon}
  - Parameters: Beacon $beacon
  - Returns: JSON response with HTTP status code
- **`update(Beacon $beacon)` method: Updates the beacon's data in the database**
  - Pre-conditions: 
    - PUT /api/beacons/{beacon}
    - PATCH /api/beacon/{beacon}
  - Parameters: Beacon $beacon
  - Returns: JSON response with HTTP status code
- **`delete(Beacon $beacon)` method: Deletes a beacon from the database using their beacon_id**
  - Pre-condition: DELETE /api/beacons/{beacon}
  - Parameters: Beacon $beacon
  - Returns: JSON response with HTTP status code
- **`createsCoordinatesField(array $beaconArray)` method: Combine the latitude and longitude fields into a single coordinates field for the database.**
  - Parameters: array $beaconArray
  - Returns: array

### GameController Class
The purpose of this class is to handle data pertaining to the `/api/games` route.

- **`getGamesByName(string $game_title)` method: Gets game data by name using IGDB's API. Returned as an array of objects.**
  - Pre-condition: GET /api/games/{game_title}
  - Parameters: string $game_title
  - Returns: JSON response with HTTP status code

## Model Classes

Model classes are like object classes in Java. They define the object instance for a collection in the database. They follow a naming convention that allows Laravel to automatically connect to the correct database collection/table. The Model classes are singular and the database collection is plural.

### User

The User model class defines the object instance of a users document/row in Laravel. It contains a list of all the users collection fields.

**Data fields:**

- **`fillable`: array**
  - The attributes that are mass assignable.
- **`hidden`: array**
  - The attributes that should be hidden for serialization.
- **`casts`: array**
  - The attributes that should be cast.

### Beacon

The Beacon model class defines the object instance of a beacons document/row in Laravel. It contains a list of all the beacons collection fields.

- **`fillable`: array**
  - The attributes that are mass assignable.
- **`guarded`: array**
  - The attributes that are protected against mass assignment
- **`casts`: array**
  - The attributes that should be cast.

## Events

### BeaconCreated Class
The purpose of this class is to send Beacon data through the websocket.

- **`public BeaconJsonResponse $beacon` variable: Beacon data in json format.**
- **`__construct(BeaconJsonResponse $beacon)` method: Creates a new BeaconCreated instance.**
  - Pre-condition: called with either the `event()` method or the `broadcast()` method
  - Parameters: BeaconJsonResponse $beacon
  - Returns: BeaconCreated instance
- **`broadcastOn()` method: Get the channels the event should broadcast on.**
  - Returns: array

## Form Request

### BeaconPostRequest Class
The purpose of this class is to validate incoming data received through the POST `api/beacons` route.

- **`authorize()` method: Determine if the user is authorized to make this request.**
  - Pre-condition: POST /api/beacons/{beacon}
  - Returns: bool
- **`rules()` method: Get the validation rules that apply to the request.**
  - Returns: array

## Resources

### BeaconJsonResponse Class
The purpose of this class is to convert the data returned from the beacons table database into a json type. And to remove the coordinates field and split it into a latitude and longitude field.

- **`toArray(Request $request)` method: Transform the resource into an array.**
  - Pre-condition: new BeaconJsonResponse() is called
  - Returns: array

## Factories

### UserFactory
The purpose of this class is to create an entry in the users table with fake data. Primarily used for testing.

- **`definition()` method: Define the model's default state.**
  - Pre-condition: `User::factory()` method is called
  - Returns: User instance

### BeaconFactory
The purpose of this class is to create an entry in the beacons table with fake data. Primarily used for testing.

- **`definition()` method: Define the model's default state.**
  - Pre-condition: `Beacon::factory()` method is called
  - Returns: Beacon instance

## Migrations

### create_users_table
The purpose of this class is to create a users table in the database from Laravel.

- **`run()` method: Run the migrations.**
  - Pre-condition: php artisan migrate commands are called
  - Returns: null, a table in the database
- **`down()` method: Reverse the migrations.**
  - Pre-condition: php artisan migrate commands are called
  - Returns: null, table deleted from database

### create_beacons_table
The purpose of this class is to create a beacons table in the database from Laravel.

- **`run()` method: Run the migrations.**
  - Pre-condition: php artisan migrate commands are called
  - Returns: null, a table in the database
- **`down()` method: Reverse the migrations.**
  - Pre-condition: php artisan migrate commands are called
  - Returns: null, table deleted from database

### create_profiles_table
The purpose of this class is to create a profiles table in the database from Laravel.

- **`run()` method: Run the migrations.**
  - Pre-condition: php artisan migrate commands are called
  - Returns: null, a table in the database
- **`down()` method: Reverse the migrations.**
  - Pre-condition: php artisan migrate commands are called
  - Returns: null, table deleted from database

### create_attendees_table
The purpose of this class is to create a attendees table in the database from Laravel.

- **`run()` method: Run the migrations.**
  - Pre-condition: php artisan migrate commands are called
  - Returns: null, a table in the database
- **`down()` method: Reverse the migrations.**
  - Pre-condition: php artisan migrate commands are called
  - Returns: null, table deleted from database

### create_comments_table
The purpose of this class is to create a comments table in the database from Laravel.

- **`run()` method: Run the migrations.**
  - Pre-condition: php artisan migrate commands are called
  - Returns: null, a table in the database
- **`down()` method: Reverse the migrations.**
  - Pre-condition: php artisan migrate commands are called
  - Returns: null, table deleted from database