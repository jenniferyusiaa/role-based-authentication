# After deployment

Link: https://role-based-authentication-sigma.vercel.app/

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## Dependencies

- React router: https://reactrouter.com/en/main

## auth.ts (/src/api/auth.ts)

- const testUser with type User is an object with id, email, and role
- async function getUser: await new Promise with resolve, setTimeout, and delay duration --> const authToken: returned value from generateAuthToken function --> return array with type of const of 200 (for status success gimmmick) and object contains authToken and user that is testUser
- async function login: the same as getUser
- generateAuthToken function: return random number, then set it as string with base 36, then extract from the third character

## main.tsx

- Install react router: https://reactrouter.com/en/main
- Import createBrowserRouter and RouterProvider (Routers) from react-router-dom
- Define router using createBrowserRouter: path ('/') and element (App) (Reference: https://reactrouter.com/en/main/routers/create-browser-router)
- Use RouterProvider at return element that nested with React.StrictMode (Reference: https://reactrouter.com/en/main/routers/router-provider)

## user.ts (/src/types/user.ts)

- type of User that is an object with properties id integer, email string, and role string

## AuthProvider.tsx (/src/components/AuthProvider.tsx)

- Define type of AuthContext which contains AuthToken optional string or null, currentUser optional User or null, handleLogin function Promise void, and handleLogout function Promise void
- Define AuthContext using createContext (Reference https://react.dev/reference/react/createContext) and also apply the type or undefined with initial value is undefined
- Create Context outside the export default function
- Add type AuthProviderProps PropsWithChildren
- Export default function AuthProvider containing useState of authToken --> useState of currentUser --> handleLogin which is a async function a try and catch block that try define response is await login function, destructure the returned value and setAuthToken and setCurrentUser from those values , meanwhile catch setAuthToken and setCurrentUser to null --> handleLogout is async function that setAuthToken and setCurrentUser to null (Actually not a must to be async, but because the type is Promise)
- AuthProvider function returns context provider wrapper with value of the context are the same as defined before, which are authToken, currentUser, handleLogin, and handleLogout --> children props
- useAuth custom hook function: context that is useContext of created context (Reference: https://react.dev/reference/react/useContext), conditional if context undefined, throw new Error with any messages, and return context

## main.tsx

- import AuthProvider and use it as a wrapper above the RouterProvider

## App.tsx

- Import useAuth custom hook function and destructure authToken, handleLogin, and handleLogout
- Conditional rendering element which if authToken is defined, then return button with handleLogout on click and handleLogin otherwise
- Add Link component from react router that link to /protected

## main.tsx

- Add new object at router that path /protected and element that says protected content

## ProtectedRoute (/src/components/ProtectedRoute.tsx)

- Define type of ProtectedRouteProps which is a PropsWithChildren and and object allowedRoles Array of optional User['role']
- useAuth custom hook that destructure the currentUser property
- if currentUser is undefined, then loading...
- if currentUser is null or (allowedRoles is defined and allowedRoles not include currentUser role), then permission denied (Reference: https://www.w3schools.com/jsref/jsref_includes_array.asp)
- return children

## main.tsx

- Nest the element of path /protected with ProtectedRoute wrapper also pass the Array of allowedRoles

## AuthProvider.tsx

- Add useEffect that contains fetchUser which is an async function of try and catch block the same as the handleLogin function
