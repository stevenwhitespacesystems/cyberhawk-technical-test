# Authentication Documentation

## Overview

The application implements a token-based authentication system using Laravel Sanctum for the backend and Zustand for frontend state management. The authentication flow includes login, registration, token verification, and protected routes.

## Backend Implementation

### Laravel Sanctum Configuration

The application uses Laravel Sanctum for API token authentication with the following key configurations:

- Stateful domains configured for local development
- Web guard enabled
- Token expiration set to never expire
- CSRF protection enabled
- Cookie encryption enabled

### Authentication Service

The authentication service implements the following features:

- Login with email/password
- User registration
- Token generation
- Logout functionality

The service is implemented through a contract-based approach:

```php
interface AuthServiceContract
{
    public function login(LoginRequestDTO $dto): LoginResponseDTO;
    public function register(RegisterRequestDTO $dto): RegisterResponseDTO;
    public function logout(): void;
}
```

### API Routes

Authentication endpoints are exposed through the following public routes:

```php
Route::group(['prefix' => 'auth'], static function () {
    Route::post('/login', LoginController::class);
    Route::post('/register', RegisterController::class);
});
```
### CORS Configuration

CORS is configured to allow credentials and specific paths:

```php
'paths' => ['api/', 'sanctum/csrf-cookie'],
'allowed_methods' => [''],
'allowed_origins' => [''],
'allowed_origins_patterns' => [],
'allowed_headers' => [''],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

## Frontend Implementation

### Authentication State Management

The application uses Zustand with persistence for managing authentication state:

```typescript
interface AuthStore {
    token: string | null;
    user: UserState | null;
    setAuth: (token: string, user: UserState) => void;
    clearAuth: () => void;
}
```

Key features:
- Stores user data and token
- Persists auth state in session storage
- Provides methods for setting and clearing auth state

### Protected Routes

The application implements route protection using TanStack Router:

- Verify token validity
- Redirect to login if unauthorized
- Maintain original redirect URL

### Login Implementation

The login form includes:
- Email/password validation
- CSRF token handling
- Error handling
- Redirect after successful login
- Token storage

### Registration Implementation

The registration form includes:
- Name/email/password validation
- Password confirmation
- Error handling
- Automatic login after registration

## Testing

The authentication system includes comprehensive test coverage:

### Login Tests
- Validates request method
- Tests empty request body
- Validates email format
- Validates password requirements
- Tests successful login flow

### Registration Tests
- Validates input fields
- Tests password confirmation
- Tests successful registration
- Verifies token generation

## Security Considerations

1. CSRF Protection
   - CSRF token verification for all authentication requests
   - Sanctum middleware configuration

2. Password Security
   - Minimum 8 characters
   - Password confirmation required
   - Hashed storage

3. Token Management
   - Tokens stored securely in session storage
   - Automatic token inclusion in API requests
   - Token verification on protected routes

4. Error Handling
   - Structured error responses
   - Validation error messages
   - Authentication failure handling

## Usage Example

To implement authentication in a new component:
```typescript
import { useAuthStore } from "@/state/auth-store";
const Component = () => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    // Access token and user data as needed
};
```

For protected API requests:
```typescript
axios.defaults.headers.common["Authorization"] = Bearer ${token};
```
