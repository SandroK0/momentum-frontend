import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Layout from "./Layout";
import TasksPage from "./pages/TasksPage/TasksPage";
import TaskPage from "./pages/TaskPage";

const Router: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<TasksPage />}></Route>
        <Route path="/task" element={<TaskPage />}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
