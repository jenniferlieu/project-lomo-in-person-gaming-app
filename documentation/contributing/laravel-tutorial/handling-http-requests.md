---
sidebar_position: 4
---
# Handling HTTP Requests
This simple API example will get user from the database and create user and insert it to the database. 

**Disclaimers:**
- this is a PUBLIC route and is not authenticated.
- the `save()` and `find()` methods won't work until the database is configured to accept data from Laravel.
- individual routes were created in the example, but we're going to be using mass created routes using `Route::resource()`.


**Generate all MVC files and connect them together:**
```bash
sail artisan -mrc make:model User
```

**Create the HTTP requests for the /users route and map them to the functions in the UserController:**
```php
// routes/api.php
use App\Http\Controllers\UserController;

Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
```

**Handle the data received from the HTTP request in the Controller file:**
```php
// UserController.php

use App\Models\User; // uses the User model file 

class UserController extends Controller
{
    /**
    * Display the specified User.
    */
    public function show($id) {
        // uses the builtin Laravel 'find()' function to find and get the user data from the database
        // this part of the code doesn't work yet
        $user = User::find($id); 

        // returns the data, and a 200 status code
        return response()->json(['data' => $user], 200); 
    }

    /**
    * Store a newly created User in storage.
    */
    public function store(Request $request) {
        // validates that the JSON data actually has all the required fields
        // for more validation rules, check the Laravel Validation docs
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        // creates an object instance of the User model and insert the JSON data into the object
        $user = new User()
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;

        // builtin Laravel function to save into the database
        // this part of the code doesn't work yet
        $user->save(); 

        // returns the user that was just created and a 201 status code
        return response()->json(['data' => $user], 201); 
    }
}
```

**Add the User fields to the Model file**

Models have a specific naming convention to allow automagic connection to the database, otherwise we'll have to explicitly specify which table to use. Model names are singular; database table names are plural. 

For example, if the model name is "User", then it will automagically connect to the "users" table in the database.

```php
// User.php

/**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
protected $fillable = [
    'name',
    'email',
    'password',
];
```

**Test the API**
  - Use the _Desktop_ version of Postman or `curl` to test POST and GET requests
  - Localhost url: http://localhost/api/users