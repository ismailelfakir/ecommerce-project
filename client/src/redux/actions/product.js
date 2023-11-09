import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct =
  (
    productData
    // name,
    // description,
    // category,
    // tags,
    // originalPrice,
    // discountPrice,
    // stock,
    // sellerId,
    // images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });

      const config = { Headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(
        `${server}/product/create-product`,
        productData,
        config
        // name,
        // description,
        // category,
        // tags,
        // originalPrice,
        // discountPrice,
        // stock,
        // sellerId,
        // images,
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// get All Products of a seller
export const getAllProductsSeller = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsSellerRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-seller/${id}`
    );
    dispatch({
      type: "getAllProductsSellerSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsSellerFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a Seller
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-seller-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// product update information
export const updateProduct =
  (productId,name, description, category, tags, originalPrice, discountPrice, stock) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateProductRequest",
      });

      const { data } = await axios.put(
        `${server}/product/update-product/${productId}`,
        {
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateProductSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "updateProductFailed",
        payload: error.response.data.message,
      });
    }
  };

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
