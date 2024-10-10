import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div className="bg-white w-80">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="program">프로그램</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="notice">공지사항</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/">마이페이지</Link>
        </li>
      </ul>

      <div className="flex flex-col">
        <button>로그인</button>
        <button>회원가입</button>
      </div>

      <div className="text-sm text-header-black">
        Copyright © 2024 청년모아 All Rights Reserved <br />
        본 웹사이트는 2024 경기청년 갭이어 프로그램의 지원을 받아 제작되었습니다.
      </div>
    </div>
  )
}