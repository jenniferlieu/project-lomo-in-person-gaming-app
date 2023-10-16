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

### BeaconController Class
The purpose of this class is to handle data pertaining to the `/api/beacons` route.

- **`index()` method: Gets a list of all beacons from the database**
  - Pre-condition: GET /api/beacons/
  - Returns: JSON response with HTTP status code
- **`store(Request $request)` method: Creates a beacon in the database**
  - Pre-condition: POST /api/beacons/{beacon}
  - Parameters: Request request
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
- **`showNearby(Request $request)` method: Gets a list of beacons near the user using the user's location**
  - Pre-condition: GET /api/beacons/nearby/{location}
  - Parameters: Request $request
  - Returns: JSON response with HTTP status code
- **`showRecommended(Request $request)` method: Gets a list of recommended beacons using _____???**
  - Pre-condition: GET /api/beacons/recommended/{beacon}
  - Parameters: Request $request
  - Returns: JSON response with HTTP status code

### ReportController Class
The purpose of this class is to handle data pertaining to the `/api/reports` route.

- **`store(Request $request)` method: Creates a report in the database**
  - Pre-condition: POST /api/reports/{report}
  - Parameters: Request request
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

### Report

The Report model class defines the object instance of a reports document/row in Laravel. It contains a list of all the reports collection fields.

- **`fillable`: array**
  - The attributes that are mass assignable.