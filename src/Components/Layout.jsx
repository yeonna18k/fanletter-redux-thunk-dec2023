import React from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
