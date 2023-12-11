---
sidebar_position: 5
---
# Test Report
This document contains a summary of test results performed.

## Frontend Unit Test Results
Uses React's jest testing suite.

## Backend Unit Test Results
Uses Laravel's built-in PHPUnit testing.

```bash
 PASS  Tests\Unit\DatabaseConnectionTest
  ✓ database connection to testing schema                        2.93s  
  ✓ database connection to public schema                         0.70s  

   PASS  Tests\Unit\ServerTest
  ✓ the application returns a successful response                0.69s  
  ✓ the request docs returns a successful response               0.55s  

   PASS  Tests\Feature\AttendeeControllerTest
  ✓ get all attendees                                            2.11s  
  ✓ delete attendee                                              1.04s  
  ✓ store attendee                                               1.20s  
  ✓ update attendee                                              1.08s  
  ✓ show attendee                                                1.10s  

   PASS  Tests\Feature\AuthControllerTest
  ✓ register                                                     6.85s  
  ✓ login                                                        0.73s  

   PASS  Tests\Feature\BeaconControllerTest
  ✓ post beacon request returns successful response              1.15s  
  ✓ post beacon request fails when required fields are empty     0.81s  
  ✓ get all beacons                                              0.85s  
  ✓ beacon created event dispatched                              0.91s  

   PASS  Tests\Feature\GameControllerTest
  ✓ get games by name                                            0.88s  

   PASS  Tests\Feature\ProfileControllerTest
  ✓ index profiles                                               1.23s  
  ✓ show profile                                                 0.77s  
  ✓ destroy profile                                              0.96s  
  ✓ update profile                                               0.92s  
  ✓ store profile                                                0.76s  

   PASS  Tests\Feature\UserControllerTest
  ✓ get all users                                                0.66s  
  ✓ show existing user                                           0.69s  
  ✓ delete existing user                                         0.94s  

  Tests:    24 passed (49 assertions)
  Duration: 31.69s
```

## Integration Test Results
Uses Laravel's built-in PHPUnit tests to test requests made from the frontend url is successful and returns the expected json structure.

```bash
 PASS  Tests\Feature\IntegrationTest
  ✓ user can create an account                            10.12s  
  ✓ user can login                                         0.84s  
  ✓ user can create a beacon                               0.96s  
  ✓ user can join a beacon                                 1.02s  
  ✓ user can comment on a beacon                           1.73s  

  Tests:    5 passed (20 assertions)
  Duration: 15.39s
```

## Acceptance Test Results
Google sheet checklist used to perform acceptance tests:
[https://docs.google.com/spreadsheets/d/1Onw7Wb_8_TdrBmMoUPSHZEh0YipOCYOefBJ3FHvcLW4/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1Onw7Wb_8_TdrBmMoUPSHZEh0YipOCYOefBJ3FHvcLW4/edit?usp=sharing)