import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/Home";
import Detail from "pages/Detail";
import Signin from "pages/Signin";
import Profile from "Components/Profile";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Layout from "Components/Layout";

export default function Router() {
  const auth = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    if (auth == null) {
      <Navigate to="/login"></Navigate>;
    }
  }, []);
  // console.log(auth);
  return (
    <BrowserRouter>
      <Routes>
        {auth == null ? (
          <>
            <Route path="/login" element={<Signin />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
          </>
        )}

        {/* 홈 화면으로 강제로 리다이렉팅 */}
      </Routes>
    </BrowserRouter>
  );
}
