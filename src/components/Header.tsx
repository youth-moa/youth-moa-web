import { Link, useNavigate } from "react-router-dom";
import {
  IcoAlarm,
  IcoDownload,
  IcoHamburger,
  IcoSetting,
  Logo,
  Symbol,
} from "../assets";
import { useUser } from "../hooks/useUser";
import { logout } from "../api/auth";
import { useContext } from "react";
import { CommonContext } from "../store/CommonContext";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();
  const { setCommon } = useContext(CommonContext);

  const { accessToken } = useUser();

  const onLogin = () => {
    navigate("/login");
  };

  const onLogout = async () => {
    try {
      const response = await logout();

      if (!response.success) {
        throw response;
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      toast.success("로그아웃 되었습니다.");
    } catch (error: any) {
      console.error(error);

      setCommon &&
        setCommon((prev) => ({
          ...prev,
          alert: {
            isShow: true,
            message: error.response.data.message,
          },
        }));
    }
  };

  return (
    <header className="sticky top-0 flex items-center justify-between px-5 py-7 shadow-header bg-white md:px-10 md:py-3.5 z-50">
      <Link to="/">
        <Logo height={30} className="hidden md:inline-block" />
        <Symbol height={25} className="md:hidden" />
      </Link>

      <ul className="hidden text-xl font-semibold md:flex gap-x-24">
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/program">프로그램</Link>
        </li>
        {/* <li>
          <Link to="/notice">공지사항</Link>
        </li> */}
      </ul>

      <ul className="flex gap-x-3">
        <li>
          <Link to="/">
            <IcoAlarm />
          </Link>
        </li>
        <li className="hidden md:inline-block">
          <Link to="/">
            <IcoSetting />
          </Link>
        </li>
        <li
          className="hidden cursor-pointer md:inline-block"
          onClick={accessToken ? onLogout : onLogin}
        >
          <IcoDownload />
        </li>
        <li className="md:hidden">
          <IcoHamburger />
        </li>
      </ul>
    </header>
  );
}
