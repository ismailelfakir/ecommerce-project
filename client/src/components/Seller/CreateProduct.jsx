import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createProduct } from "../../redux/actions/product";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai"; // Importing the close icon


const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard-products");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {

    e.preventDefault();

    let files = Array.from(e.target.files);

    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDeleteImage = (image) => {
    setImages(images.filter((img) => img !== image));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("sellerId", seller._id);
    dispatch(createProduct(newForm));
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-gray-200 dark:bg-gray-800  shadow h-[80vh] rounded-lg p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center dark:text-gray-100 text-gray-900">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2 text-gray-700 dark:text-gray-300">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
        <label className="pb-2 text-gray-700 dark:text-gray-300">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />
        <div>
        <label className="pb-2 text-gray-700 dark:text-gray-300">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 border-gray-300 rounded-lg h-[35px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category" className="text-gray-300 dark:text-gray-700" >Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title} className="text-gray-300 dark:text-gray-700">
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
        <label className="pb-2 text-gray-700 dark:text-gray-300">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div>
        <br />
        <div>
        <label className="pb-2 text-gray-700 dark:text-gray-300">
            Original Price
          </label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div>
        <br />
        <div>
        <label className="pb-2 text-gray-700 dark:text-gray-300">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 border-gray-300 rounded-lg rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
          />
        </div>
        <br />
        <div>
        <label className="pb-2 text-gray-700 dark:text-gray-300">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
          />
        </div>
        <br />
        <div>
        <label className="pb-2 text-gray-700 dark:text-gray-300">
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
            <label htmlFor="upload" className="cursor-pointer">
              <AiOutlinePlusCircle size={35}
               className="mt-3 dark:text-gray-300 text-gray-700" 
               />
            </label>
            {images.map((image, index) => (
              <div key={index} className="relative m-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                  className="h-[120px] w-[120px] object-cover"
                />
                <button
                  onClick={() => handleDeleteImage(image)}
                  className="absolute top-0 right-0 bg-red-500 rounded-full p-1"
                >
                  <AiOutlineClose color="white" />
                </button>
              </div>
            ))}

          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center text-gray-900 dark:text-gray-50 hover:dark:bg-gray-500 hover:bg-gray-300 block w-full px-3 h-[35px] bg-gray-50 dark:bg-gray-900 border dark:border-gray-600 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
