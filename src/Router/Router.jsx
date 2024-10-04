import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Employee from "../components/Employee";
import MainComponent from "../components/MainComponent";

const Router = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainComponent />,
    },
    {
      path: "/employee",
      element: <Employee />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default Router;
