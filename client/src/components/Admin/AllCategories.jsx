import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai"; // Importing the close icon
import { deleteCategorie } from "../../redux/actions/categorie";


const AllCategories = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [idCategoriesDelete, setIdCategoriesDelete] = useState(null);

  const [value, setValue] = useState(null);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/categories/admin-all-categories/`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCategories(res.data.categories);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

 // Function to handle opening the Delete component

 const handleDeleteCategories = () => {
  dispatch(deleteCategorie(idCategoriesDelete));
  window.location.reload();

};
const handleDelete = (id) => {
  setShowModal(true)
  setIdCategoriesDelete(id)
};

  // const handleDelete = async (id) => {
  //   axios
  //     .delete(`${server}/categories/admin-delete-categories/${id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       toast.success("Categorie code deleted succesfully!");
  //     });
  //   window.location.reload();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("title", title);
    newForm.append("subTitle", subTitle);

    await axios
      .post(
        `${server}/categories/admin-create-categories`,
        newForm,

        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Categorie created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "title",
      headerName: "title Categorie",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "subTitle",
      headerName: "subTitle",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete
                size={20}
                className="dark:text-gray-300 text-gray-800"
              />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  categories &&
    categories.forEach((item) => {
      row.push({
        id: item._id,
        title: item.title,
        subTitle: item.subTitle,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 rounded-lg">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Categories</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="dark:bg-gray-800 rounded-lg dark:border-gray-700 dark:text-gray-300"
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Create Categorie
                </h5>
                {/* create categories */}
                <form onSubmit={handleSubmit}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={title}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      SubTitle <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subTitle"
                      value={subTitle}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setSubTitle(e.target.value)}
                    />
                  </div>
                  <br />
                  <div>
                    <label
                      htmlFor="file-input"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <span>Upload a file</span>
                      <input
                        type="file"
                        name="avatar"
                        id="file-input"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileInputChange}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
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
                            onClick={handleDeleteCategories}
                            className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
      )}
    </>
  );
};

export default AllCategories;
