import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  
  return (
    <>
      <div className="w-full h-[370px] bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-3 relative cursor-pointer">

      <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link
              to={`/seller/preview/${data?.seller?._id}`} className="flex items-center w-[150px]">
              <img src={`${data?.seller && data?.seller?.avatar?.url}`} alt=""
                className="w-[40px] h-[40px] rounded-full border-[2px] border-blue-500"
              />
              <h5 className={`${styles.shop_name} ml-1`}>{data?.seller?.fname} {data?.seller?.lname}</h5>
            </Link>
            <div>
              {click ? (
                <AiFillHeart
                  size={22}
                  className={`cursor-pointer absolute right-2 top-5 ${
                    click ? "text-red-500" : "text-gray-800"
                  } dark:text-white`}
                  onClick={() => removeFromWishlistHandler(data)}
                  title="Remove from wishlist"
                />
              ) : (
                <AiOutlineHeart
                  size={22}
                  className={`cursor-pointer absolute right-2 top-5 ${
      click ? "text-red-500" : "text-gray-800"
    } dark:text-white`}
                  onClick={() => addToWishlistHandler(data)}
                  title="Add to wishlist"
                />
              )}
              <AiOutlineEye
                size={22}
                className="cursor-pointer absolute right-2 top-14 dark:text-white"
                onClick={() => setOpen(!open)}
                title="Quick view"
              />
              <AiOutlineShoppingCart
                size={25}
                className="cursor-pointer absolute right-2 top-24 dark:text-white"
                onClick={() => addToCartHandler(data._id)}
                title="Add to cart"
              />
              {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
            </div>
          </div>


          <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
            <h4 className="pb-3 font-[500] dark:text-gray-100">
              {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
            </h4>

            <div className="flex">
              <Ratings rating={data?.ratings} />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex">
                <h5 className={`${styles.productDiscountPrice} dark:text-gray-300`}>
                  {data.originalPrice === 0
                    ? data.originalPrice
                    : data.discountPrice}
                  DH
                </h5>
                <h4 className={`${styles.price}`}>
                  {data.originalPrice ? data.originalPrice + " DH" : null}
                </h4>
              </div>
              <span className="font-[400] text-[17px] text-[#68d284]">
                {data?.sold_out} sold
              </span>
            </div>
          </Link>
        </div>



      </div>


    </>
  );
};

export default ProductCard;
