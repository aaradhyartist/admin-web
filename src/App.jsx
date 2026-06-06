import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { fetchUserProfile } from "./services/authService";
import { setUser, clearUser } from "./store/authSlice";

import AdminLayout from "./layouts/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import ContactInquiry from "./pages/ContactInquiry";
import NewsletterAdminPage from "./pages/Newsletter";

function App() {
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  // Validate the stored token on load; log out if it's invalid/expired.
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const user = await fetchUserProfile();
        dispatch(
          setUser({
            user,
            accessToken: token,
            refreshToken:
              localStorage.getItem(
                `${import.meta.env.VITE_APP_TOKEN_PREFICS}_refreshToken`
              ) || null,
          })
        );
      } catch {
        dispatch(clearUser());
      }
    })();
  }, [token, dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected admin area */}
        <Route
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contacts" element={<ContactInquiry />} />
          <Route path="newsletter" element={<NewsletterAdminPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
