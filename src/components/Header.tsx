import { Link } from "react-router-dom";
import {
  IcoAlarm,
  IcoDownload,
  IcoHamburger,
  IcoSetting,
  Logo,
  Symbol,
} from "../assets";

export default function Header() {
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
        <li>
          <Link to="/notice">공지사항</Link>
        </li>
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
        <li className="hidden md:inline-block">
          <Link to="/login">
            <IcoDownload />
          </Link>
        </li>
        <li className="md:hidden">
          <IcoHamburger />
        </li>
      </ul>
    </header>
  );
}
