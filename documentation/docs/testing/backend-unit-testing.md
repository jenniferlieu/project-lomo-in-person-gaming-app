---
sidebar_position: 2
---
# Backend Unit Tests

## Beacon Creation Test

```php
test_post_request_returns_successful_response()
```
- Test: Checks that POST request to /api/beacons/ successfully accepts JSON data
- Returns: HTTP status code 201 for successful resource creation

```php
test_validation_should_fail_on_insufficient_post_request()
```
- Test: Checks that POST request to /api/beacons/ fails when required fields are empty
- Returns: HTTP status code 422 for unprocessable entity