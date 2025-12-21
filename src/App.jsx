import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchUserProfile } from "./services/authService";
import { setUser } from "./store/authSlice";
import { useEffect } from "react";


import { Toaster } from "react-hot-toast";

import AdminLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import ContactInquiry from "./pages/ContactInquiry";
import NewsletterAdminPage from "./pages/Newsletter";

function App() {
  const token = useSelector((state) => state.auth.accessToken); // read token from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const { data } = await fetchUserProfile();

          dispatch(
            setUser({
              user: data,
              accessToken: token,
              refreshToken:
                localStorage.getItem(
                  `${import.meta.env.VITE_APP_TOKEN_PREFICS}_refreshToken`
                ) || null,
            })
          );
        } catch (error) {
          console.log("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [dispatch]);


  return (

    <>
      <div className="relative">

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Admin Routes */}
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="contacts" element={<ContactInquiry />} />
            <Route path="newsletter" element={<NewsletterAdminPage />} />


            {/* 404 CATCH-ALL: This renders inside AdminLayout */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );

}


export default App;
