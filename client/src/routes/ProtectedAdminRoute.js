import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const ProtectedAdminRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if(loading === true){
    return <Loader />;
  }else{
    if (!isAuthenticated && user?.role !== "Admin") {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};

export default ProtectedAdminRoute;




