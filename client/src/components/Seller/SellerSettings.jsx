import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const SellerSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState(null);
  const [fname, setFname] = useState(seller && seller.fname);
  const [lname, setLname] = useState(seller && seller.lname);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const reader = new FileReader();
  
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
  
        axios
          .put(`${server}/seller/update-seller-avatar`, formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            dispatch(loadSeller());
            toast.success('Avatar updated successfully!');
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    };
  
    reader.readAsDataURL(e.target.files[0]);
  };


  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/seller/update-seller-info`,
        {
          fname,
          lname,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Seller info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={`${seller?.avatar?.url}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
        <br/><br/>
        {/* Seller info */}
        <div className="w-full px-5">
            <form onSubmit={updateHandler} aria-required={true}>
            <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2 dark:text-gray-300">First Name</label>
                  <input
                    type="name"
                    placeholder={`${seller.fname}`}
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 `}
                     required
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2 dark:text-gray-300">Last Name</label>
                  <input
                    type="name"
                    placeholder={`${seller.lname}`}
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:bg-gray-700 dark:text-gray-300`}
                    required
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2 dark:text-gray-300">Description</label>
                  <input
                    type="name"
                    placeholder={`${
                      seller?.description
                        ? seller.description
                        : "Enter your description"
                    }`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 `}
                     required
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2 dark:text-gray-300">Adress</label>
                  <input
                    type="name"
                    placeholder={seller?.address}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:bg-gray-700 dark:text-gray-300`}
                    required
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 dark:text-gray-300">Phone Number</label>
                  <input
                    type="number"
                    placeholder={seller?.phoneNumber}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:bg-gray-700 dark:text-gray-300`}
                    required
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 dark:text-gray-300">Zip Code</label>
                  <input
                    type="number"
                    placeholder={seller?.zipCode}
                    value={zipCode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:bg-gray-700 dark:text-gray-300`}
                    required
                  />
                </div>
              </div>

              <input
                className={`w-[250px] h-[40px] hover:dark:bg-gray-950 bg-gray-200 hover:bg-blue-200 dark:bg-gray-800 border border-[#3a24db] text-center text-[#3a24db] rounded-lg mt-8 cursor-pointer`}
                required
                value="Update Informations"
                type="submit"
                readOnly
              />
            </form>
          </div>
      </div>
    </div>
  );
};

export default SellerSettings;
