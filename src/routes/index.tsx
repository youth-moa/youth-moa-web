import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";

import Layout from "../layouts/Layout";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import ProgramPage from "../pages/Program";
import NoticePage from "../pages/Notice";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/program" element={<ProgramPage />} />
      <Route path="/notice" element={<NoticePage />} />
    </Route>
  )
)