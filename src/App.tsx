import { Link } from "react-router-dom";
import { useAuth } from "./components/AuthProvider";

const App = () => {
  const { authToken, currentUser, handleLogin, handleLogout } = useAuth();

  return (
    <div>
      <div>
        {authToken ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>

      <div>
        {currentUser ? (
          <>
            <h1>Your information</h1>
            <p>{`Authentication token: ${authToken}`}</p>
            <p>{`ID: ${currentUser?.id}`}</p>
            <p>{`Email: ${currentUser?.email}`}</p>
            <p>{`Role: ${currentUser?.role}`}</p>
          </>
        ) : (
          <p>No user found</p>
        )}
      </div>

      <Link to="/protected">
        <button>Go to protected page</button>
      </Link>
    </div>
  );
};
export default App;
