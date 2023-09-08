import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/home/home";
import { Login } from "@/pages/login/login";
import { Register } from "@/pages/register/register";
import { NotFound } from "@/pages/errors/notfound";
import { LOCAL_STORAGE_KEYS, PATHS } from "@/commons/constants";
import { useSetPayload } from "@/redux/utils";
import Layout from "@/pages/layout/layout";
import { UpdateProfile } from "@/pages/updateprofile/updateprofile";
import CalendarPicker from "@/pages/calendar/picker";
import { Dashboard } from "./pages/dashboard/dashboard";
import { CreateGroup } from "./pages/createGroup/createGroup";

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: PATHS.LOGIN,
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: PATHS.REGISTER,
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: PATHS.DASHBOARD,
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: PATHS.UPDATE_PROFILE,
    element: (
      <Layout>
        <UpdateProfile />
      </Layout>
    ),
  },
  {
    path: PATHS.CREATE_CALENDAR,
    element: (
      <Layout>
        <CreateGroup />
      </Layout>
    ),
  },
  {
    path: PATHS.UPDATE_CALENDAR,
    element: (
      <Layout>
        <CalendarPicker />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const setPayload = useSetPayload();
  const existingJwt = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  if (existingJwt) {
    setPayload(existingJwt);
  }
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
