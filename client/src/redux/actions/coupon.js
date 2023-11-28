import axios from "axios";
import { server } from "../../server";

// delete event of a seller
export const deleteCoupon = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteCouponRequest",
      });
  
      const { data } = await axios.delete(
        `${server}/couponCode/delete-coupon/${id}`,
        {
          withCredentials: true,
        }
      );
  
      dispatch({
        type: "deleteCouponSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteCouponFailed",
        payload: error.response.data.message,
      });
    }
  };