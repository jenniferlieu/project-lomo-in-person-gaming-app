---
sidebar_position: 6
---
# Extra: HTTP status codes

Here's a list of relevant HTTP status codes that we might use:

**2xx Success**

- 200 OK: The request was successful.
- 201 Created: The request has been fulfilled, and a new resource has been created.
- 204 No Content: The request was successful, but there is no response body (often used for DELETE requests).


**3xx Redirection:**

- 301 Moved Permanently: The requested resource has been permanently moved to a different URL.
- 302 Found (or 307 Temporary Redirect): The requested resource is temporarily available at a different URL.
- 304 Not Modified: The client's cached copy is up-to-date, so there's no need to transfer a new one.

**4xx Client Errors:**

- 400 Bad Request: The server could not understand the request (often due to malformed syntax).
- 401 Unauthorized: Authentication is required and has failed or has not yet been provided.
- 403 Forbidden: The server understands the request but refuses to fulfill it.
- 404 Not Found: The requested resource could not be found on the server.
- 422 Unprocessable Entity: The request was well-formed but semantically incorrect (often used for validation errors).
- 429 Too Many Requests: The user has sent too many requests in a given amount of time.

**5xx Server Errors:**

- 500 Internal Server Error: A generic error message indicating that something went wrong on the server.
- 502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed.
- 503 Service Unavailable: The server is currently unable to handle the request due to temporary overloading or maintenance.
- 504 Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.