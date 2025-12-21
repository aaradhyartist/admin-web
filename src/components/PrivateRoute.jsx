import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {

    console.log("=====================");
    
  const token = useSelector((state) => state.auth.token);
   console.log("============token=========",token);
    
  return token ? children : <Navigate to="/login" />;
}
