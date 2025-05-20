"use client";

import { usePathname } from "next/navigation";
import Header from "@/src/components/common/Header";
import Footer from "@/src/components/common/Footer";
import InitialPopup from "@/src/components/popup/InitialPopup";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isPdfPage =
    pathname.match(/^\/(a-levels|igcse)\/[^\/]+\/[^\/]+\/?$/) ||
    pathname.match(/^\/other-resources\/syllabus\/[^\/]+\/[^\/]+\/?$/) ||
    pathname.match(/^\/other-resources\/timetable\/[^\/]+\/?$/);

  return (
    <>
      {!isPdfPage && <Header />}
      {!isPdfPage && <InitialPopup />}
      {children}
      {!isPdfPage && <Footer />}
    </>
  );
}
