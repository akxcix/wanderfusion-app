import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/ui/navbar";
import { Register } from "./pages/register/register";
import { NotFound } from "./pages/errors/notfound";
import { LOCALSTORAGE_JWT_KEY, PATHS } from "@/commons/constants";
import { useSetPayload } from "./redux/utils";
import { Dashboard } from "./pages/dashboard/dashboard";

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <Home />,
  },
  {
    path: PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: PATHS.REGISTER,
    element: <Register />,
  },
  {
    path: PATHS.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const setPayload = useSetPayload();
  const existingJwt = localStorage.getItem(LOCALSTORAGE_JWT_KEY);
  if (existingJwt) {
    setPayload(existingJwt);
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col px-5 py-10 w-full lg:w-1/2 mx-auto">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
