import { useParams } from "react-router-dom";
import FindPasswordPage from "./FindPassword";
import FindIdPage from "./FindId";

export default function FindAccountPage() {
  const { findType } = useParams();

  if (findType === "password") {
    return <FindPasswordPage />;
  }

  return <FindIdPage />;
}
