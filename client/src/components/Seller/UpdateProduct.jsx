import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { categoriesData } from "../../static/data";
import { updateProduct } from "../../redux/actions/product";
import { AiOutlineClose } from "react-icons/ai"; // Importing the close icon
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllProductsSeller } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";



const UpdateProduct = ({ product, onUpdate }) => {
  const { products: productsVariable } = useSelector((state) => state.products);
  const [images, setImages] = useState(product.images);
  const [imageLocals, setImageLocals] = useState([]);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [tags, setTags] = useState(product.tags);
  const [originalPrice, setOriginalPrice] = useState(product.originalPrice);
  const [discountPrice, setDiscountPrice] = useState(product.discountPrice);
  const [stock, setStock] = useState(product.stock);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImageLocals([...imageLocals, ...newImages]);
  };





  const handleDeleteImageConfirmation = (imagePublicId) => {
    setSelectedImage(imagePublicId);
    setShowModal(true);
  };

  const handleDeleteImageLoacls = (image) => {
    setImageLocals(imageLocals.filter((img) => img !== image));
  };

  const handleDeleteImage = async () => {
    const imageIdentifier = selectedImage;
    console.log(`${server}/user/product/${product._id}/delete-image/${imageIdentifier}`)

    try {
      const response = await axios.delete(`${server}/product/product/${product._id}/delete-image/${imageIdentifier}`, {
        withCredentials: true,
      });


      if (response.status === 200) {
        setImages(images.filter((img) => img.publicId !== imageIdentifier));
        toast.success('Image deleted successfully!');
      } else {
        toast.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error in deleting image');
    }

    setShowModal(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    imageLocals.forEach((image) => {
      newForm.append("images", image);
    });


    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);

    dispatch(
      updateProduct(
        product._id,
        newForm
      )
    );
    dispatch(getAllProductsSeller(seller._id));
    
    console.log("productsVariable : ", productsVariable )
    onUpdate()
  };

  return (
    <div className="bg-[#fff]">
      {product ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => onUpdate(false)}
            />
            <h5 className="text-[30px] font-Poppins text-center">
              Update Product
            </h5>
            {/* Update product form */}
            <form onSubmit={handleUpdate}>
              <br />
              <div>
                <label className="pb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your product name..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  cols="30"
                  required
                  rows="8"
                  type="text"
                  name="description"
                  value={description}
                  className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your product description..."
                ></textarea>
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Choose a category">Choose a category</option>
                  {categoriesData &&
                    categoriesData.map((i) => (
                      <option value={i.title} key={i.title}>
                        {i.title}
                      </option>
                    ))}
                </select>
              </div>
              <br />
              <div>
                <label className="pb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={tags}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter your product tags..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">Original Price</label>
                <input
                  type="number"
                  name="price"
                  value={originalPrice}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="Enter your product price..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Price (With Discount) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={discountPrice}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  placeholder="Enter your product price with discount..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Product Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={stock}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter your product stock..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Upload Images <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="images"
                  id="upload"
                  className="hidden"
                  multiple
                  onChange={handleImageChange}
                />
                <div className="w-full flex items-center flex-wrap">
                  <label htmlFor="upload">
                    <AiOutlinePlusCircle
                      size={30}
                      className="mt-3"
                      color="#555"
                    />
                  </label>
                  {imageLocals.map((image, index) => (
                    <div key={index} className="relative m-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index}`}
                        className="h-[120px] w-[120px] object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImageLoacls(image)}
                        className="absolute top-0 right-0 bg-blue-700 rounded-full p-1"
                      >
                        <AiOutlineClose color="white" />
                      </button>
                    </div>
                  ))}

                  {images.map((image, index) => (
                    <div key={index} className="relative m-2">
                      <img
                        src={image.url}
                        alt={`Product ${index}`}
                        className="h-[120px] w-[120px] object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImageConfirmation(image.publicId)}
                        className="absolute top-0 right-0 bg-red-500 rounded-full p-1"
                      >
                        <AiOutlineClose color="white" />
                      </button>
                    </div>
                  ))}
                  {showModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                      <div className="bg-white p-5 rounded-md shadow-xl relative">
                        <button
                          type="button"
                          onClick={() => setShowModal(false)}
                          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900 transition ease-in-out duration-150"
                        >
                          <AiOutlineClose size={24} />
                        </button>
                        <div className="text-center">
                          <h4 className="text-lg font-semibold text-gray-800">Are you sure?</h4>
                          <p className="text-gray-600">Do you really want to delete these records? This process cannot be undone.</p>
                        </div>
                        <div className="mt-5 sm:mt-6 flex justify-center">
                          <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="bg-gray-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleDeleteImage}
                            className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
                <br />
                <div>
                  <input
                    type="submit"
                    value="Update"
                    className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UpdateProduct;
