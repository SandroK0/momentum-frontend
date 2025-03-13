import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Layout from "./Layout";
import TasksPage from "./pages/TasksPage/TasksPage";
import TaskPage from "./pages/TaskPage/TaskPage";
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage";

const Router: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<TasksPage />}></Route>
        <Route path="/task" element={<TaskPage />}></Route>
        <Route path="/create-task" element={<CreateTaskPage />}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
