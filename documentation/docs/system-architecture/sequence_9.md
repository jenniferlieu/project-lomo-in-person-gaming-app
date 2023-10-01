```mermaid
sequenceDiagram
  actor user as User
  participant profilePage as ProfilePage
  participant editProfilePage as EditProfilePage
  participant apiMiddleware as API Middleware
  participant database as Database
  activate user

  user->>profilePage: Taps the "profile" button on the top left corner
  activate profilePage
  profilePage-->>user: Displays user stats and preferences
  user->>profilePage: Taps the "edit" button in the top right corner
  profilePage->>editProfilePage: Opens the edit profile page
  user->>editProfilePage: Adds or removes preferences or tags
  user->>editProfilePage: Presses "save" to confirm changes
  editProfilePage->>apiMiddleware: Sends updated user data
  activate apiMiddleware
  apiMiddleware->>database: Updates user preferences and tags
  database-->>apiMiddleware: Acknowledges data update
  apiMiddleware-->>editProfilePage: Confirms data update
  deactivate apiMiddleware
  editProfilePage-->>user: Closes edit profile page
  profilePage->>user: Displays updated user stats and preferences
  deactivate user
  deactivate profilePage
  ```
