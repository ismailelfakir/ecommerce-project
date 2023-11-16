import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {  AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { server } from "../../server";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../redux/actions/event";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [eventId, setEventId] = useState("");

  useEffect(() => {
   axios.get(`${server}/event/admin-all-events`, {withCredentials: true}).then((res) =>{
    setEvents(res.data.events);
   })
  }, []);

  const handleDelete = async (id) => {
    await axios
    .delete(`${server}/event/delete-admin-event/${id}`, { withCredentials: true })
    .then((res) => {
      toast.success(res.data.message);
      window.location.reload();
    });

  dispatch(getAllEvents());
  };

  const columns = [
    // { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
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
            <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Event",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setEventId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
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
        price: item.discountPrice+ " DH",
        Stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <>
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
     {open && (
      <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
        <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
          <div className="w-full flex justify-end cursor-pointer">
            <RxCross1 size={25} onClick={() => setOpen(false)} />
          </div>
          <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
            Are you sure you wanna delete this event?
          </h3>
          <div className="w-full flex items-center justify-center">
            <div
              className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
              onClick={() => setOpen(false)}
            >
              cancel
            </div>
            <div
              className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
              onClick={() =>  setOpen(false) || handleDelete(eventId)}
            >
              confirm
            </div>
          </div>
        </div>
      </div>
      )}
      </>
    );
};

export default AllEvents;
