import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";
import Cookies from 'js-cookie'; // Import the js-cookie library

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const authToken = Cookies.get('token'); // Replace 'token' with your cookie name
  console.log("authToken : ", authToken , "isAuthenticated : ", isAuthenticated);
  if (loading) {
    return <Loader />;
  } else {
    // Check if the authToken exists in the cookie
    if (!isAuthenticated && !authToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }   
};

export default ProtectedRoute;

