import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent, getAllEventsSeller } from "../../redux/actions/event";
import Loader from "../Layout/Loader";
import UpdateEvent from './UpdateEvent';
import { AiOutlineClose } from "react-icons/ai"; // Importing the close icon


const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const [openEdit, setOpenEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [idEventDelete, setIdEventDelete] = useState(null);

  const dispatch = useDispatch();

    // Function to handle opening the edit component
    const handleOpenEdit = (EventId) => {
    
      const updatedEvent = events.find(event => event._id === EventId);
  
      setOpenEdit(updatedEvent);
    };

      // Function to handle closing the edit component
  const handleCloseEdit = () => {
    setOpenEdit(null);
  };

  useEffect(() => {
    dispatch(getAllEventsSeller(seller._id));
  }, [dispatch]);

    // Function to handle opening the Delete component

    const handleDeleteEvent = () => {
      dispatch(deleteEvent(idEventDelete));
      window.location.reload();
  
    };
    const handleDelete = (id) => {
      setShowModal(true)
      setIdEventDelete(id)
    };

  

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} 
                className="dark:text-gray-300 text-gray-800"/>
                </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Update",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleOpenEdit(params.id)}>
                <AiOutlineEdit size={20}
                className="dark:text-gray-300 text-gray-800"/>
                </Button>
          </>
        );
      },
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
              <AiOutlineDelete size={20} 
                className="dark:text-gray-300 text-gray-800"/>
                </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.discountPrice + " DH",
        Stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 rounded-lg">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="dark:bg-gray-800 bg-gray-200 rounded-lg dark:border-gray-700 dark:text-gray-300"      
          />
        </div>
      )}
      {openEdit && (
      <UpdateEvent
        event={openEdit}
        onUpdate={(updatedEvent) => {
          handleOpenEdit(updatedEvent);
          handleCloseEdit(); // Close the edit dialog when the update is successful
        }}
      />
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
                            onClick={handleDeleteEvent}
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

export default AllEvents;
