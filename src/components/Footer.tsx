import { Link } from "react-router-dom";
import { Logo } from "../assets";

// TODO: 링크 페이지 생성
export default function Footer() {
  return (
    <footer className="flex flex-col items-start gap-3 px-10 py-9 text-header-black bg-gray-005 md:flex md:flex-row md:gap-16">
      <Logo height={25} />

      <section className="flex flex-col gap-3 text-xs">
        <ul className="flex gap-4">
          <li>
            <Link to="/">개인정보처리방침</Link>
          </li>
          <li>
            <Link to="/">이용약관</Link>
          </li>
          <li>
            <Link to="/">이메일주소무단수집거부</Link>
          </li>
        </ul>

        <p>Copyright © 2024 청년모아 All Rights Reserved</p>
      </section>

      <section className="flex-col hidden gap-3 text-xs md:flex">
        <p>Email: helpmoa@naver.com</p>
        <p>본 웹사이트는 2024 경기청년 갭이어 프로그램의 지원을 받아 제작되었습니다.</p>
      </section>
    </footer>
  );
}