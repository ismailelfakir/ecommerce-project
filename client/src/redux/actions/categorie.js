import axios from "axios";
import { server } from "../../server";

// delete product of a Seller
export const deleteCategorie = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteCategoriesRequest",
      });
  
      const { data } = await axios.delete(
        `${server}/categorie/delete-categorie/${id}`,
        {
          withCredentials: true,
        }
      );
  
      dispatch({
        type: "deleteCategorieSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteCategorieFailed",
        payload: error.response.data.message,
      });
    }
  };
  
  // product update information
//   export const updateCategorie =
//     (productId,name, description, category, tags, originalPrice, discountPrice, stock) =>
//     async (dispatch) => {
//       try {
//         dispatch({
//           type: "updateProductRequest",
//         });
  
//         const { data } = await axios.put(
//           `${server}/product/update-product/${productId}`,
//           {
//             name,
//             description,
//             category,
//             tags,
//             originalPrice,
//             discountPrice,
//             stock,
//           },
//           {
//             withCredentials: true,
//             headers: {
//               "Access-Control-Allow-Credentials": true,
//             },
//           }
//         );
  
//         dispatch({
//           type: "updateProductSuccess",
//           payload: data.product,
//         });
//       } catch (error) {
//         dispatch({
//           type: "updateProductFailed",
//           payload: error.response.data.message,
//         });
//       }
//     };
  
  // get all categories
  export const getAllCategories = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllCategoriesRequest",
      });
  
      const { data } = await axios.get(`${server}/Categorie/get-all-Categories`);
      dispatch({
        type: "getAllCategoriesSuccess",
        payload: data.Categories,
      });
    } catch (error) {
      dispatch({
        type: "getAllCategoriesFailed",
        payload: error.response.data.message,
      });
    }
  };