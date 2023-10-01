## Use Case 4: User Joins a Beacon
```mermaid
sequenceDiagram
  actor user as User
  participant homePage as HomePage
  participant apiMiddleware as API Middleware
  participant database as Database
  participant beaconDetailsPage as BeaconDetailsPage
  participant beaconForm as BeaconForm
  activate user

  user->>homePage: Opens the menu for beacons
  activate homePage
  user->>homePage: Sorts or filters beacons

  homePage->>apiMiddleware: Requests beacon list

  apiMiddleware->>database: Retrieves beacon data
  apiMiddleware-->>homePage: Sends beacon data

  homePage->>user: Displays beacon list

  user->>homePage: (Possibly) Notified for a preferred beacon
  user->>homePage: Taps on a displayed beacon

  homePage->>apiMiddleware: Requests beacon details
  apiMiddleware->>database: Retrieves beacon details
  apiMiddleware-->>homePage: Sends beacon details
  homePage->>beaconDetailsPage: Displays beacon details

  user->>beaconDetailsPage: (Optionally) Comments on the beacon
  user->>beaconDetailsPage: Taps "Apply"
  
  beaconDetailsPage->>beaconForm: Navigates to Beacon Application
  beaconForm->>apiMiddleware: Submits beacon application
  apiMiddleware->>database: Creates new beacon and user association
  database-->>apiMiddleware: Acknowledges beacon creation and user association
  beaconForm->>user: Displays success message
  user->>beaconForm: User is now part of the beacon
  ```
