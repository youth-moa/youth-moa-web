import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "../layouts/Layout";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import HomePage from "../pages/Home";
import ProgramPage from "../pages/Program";
import NoticePage from "../pages/Notice";
import FindAccountPage from "../pages/FindAccount";
import ProgramDetailPage from "../pages/ProgramDetail";
import ProgramApplyPage from "../pages/ProgramApply";
import MyPage from "../pages/My";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/find/:findType" element={<FindAccountPage />} />
      <Route path="/program" element={<ProgramPage />} />
      <Route
        path="/program/detail/:programId"
        element={<ProgramDetailPage />}
      />
      <Route path="/program/apply/:programId" element={<ProgramApplyPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/my" element={<MyPage />} />
    </Route>
  )
);
