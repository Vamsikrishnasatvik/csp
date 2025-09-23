# SmartCommute

A web application for managing student and admin carpooling, schedules, vehicles, and destinations.

## Features

- **Role-based Navigation:**  
  - Students see only student dashboard and links.
  - Admins see only admin dashboard and links.

- **Secure Logout:**  
  - Clears all session data from `localStorage`, `sessionStorage`, and cookies.
  - Redirects to the home page after logout.

## Usage

### Login

- Users and admins log in with their credentials.
- After login, navigation and dashboard are shown based on user role.

### Logout

- Click the **Logout** button in the sidebar or header.
- All session data and cookies are cleared.
- You are redirected to the home page.

### Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Development

1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

## Notes

- Make sure to set user role in `localStorage` after login for correct navigation.
- Admin pages are protected and only visible to users with the `admin` role.

---

Feel free to update this file with more details about your project!
