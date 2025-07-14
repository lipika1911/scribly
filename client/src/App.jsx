import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PublicRoute from './utils/PublicRoute';
import ProtectedRoute from './utils/ProtectedRoute';
import Landing from './pages/Landing/Landing';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Landing />
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <Login />
    ),
  },
  {
    path: "/signup",
    element: (
      <SignUp />
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
