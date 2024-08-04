import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* TODO: 사이드 메뉴 (모바일) 개발 예정 */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}