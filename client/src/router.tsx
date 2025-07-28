import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import BarPage from "./pages/BarPage/BarPage";
import EventDetails from "./pages/Event/EventDetails";
import Events from "./pages/Event/Events";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MusicGroup from "./pages/MusicGroup/MusicGroup";
import Register from "./pages/Register/Register";
import UserProfile from "./pages/UserProfile/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:id",
        element: <EventDetails />,
      },
      {
        path: "/groups/:id",
        element: <MusicGroup />,
      },
      {
        path: "/bars/:id",
        element: <BarPage />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
