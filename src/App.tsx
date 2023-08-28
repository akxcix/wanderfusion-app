import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="flex px-5 py-10 w-full lg:w-1/2 mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
