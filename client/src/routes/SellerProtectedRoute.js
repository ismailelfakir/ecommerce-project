import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);
  if (isLoading === false) {
    if (!isSeller) {
      return <Navigate to={`/seller-login`} replace />;
    }
    return children;
  }
};

export default SellerProtectedRoute;
