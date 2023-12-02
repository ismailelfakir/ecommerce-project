import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfSeller } from "../../redux/actions/order";
import { getAllProductsSeller } from "../../redux/actions/product";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
     dispatch(getAllOrdersOfSeller(seller._id));
     dispatch(getAllProductsSeller(seller._id));
  }, [dispatch]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders && orders.forEach((item) => {
    row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: item.totalPrice+ 'DH',
        status: item.status,
      });
  });
  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2 text-gray-800 dark:text-gray-200">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-gray-50 dark:bg-gray-800 shadow rounded-lg px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2 dark:text-gray-300 text-gray-900"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] dark:text-gray-300 text-gray-900`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500] dark:text-gray-100 text-gray-900">{availableBalance} DH </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#31cfeb]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-gray-50 dark:bg-gray-800 shadow rounded-lg px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear 
              size={30} 
              className="mr-2 dark:text-gray-300 text-gray-900"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] dark:text-gray-300 text-gray-900`}
              >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500] dark:text-gray-100 text-gray-900">{orders && orders.length}</h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#31cfeb] ">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-gray-50 dark:bg-gray-800 shadow rounded-lg px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2 dark:text-gray-300 text-gray-900"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] dark:text-gray-300 text-gray-900`}
              >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500] dark:text-gray-100 text-gray-900">{products && products.length}</h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#31cfeb]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2 text-gray-800 dark:text-gray-200">Latest Orders</h3>
      <div className="w-full min-h-[45vh] rounded-lg">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        className="dark:bg-gray-800 bg-gray-200 rounded-lg dark:border-gray-700 dark:text-gray-300"      
        />
      </div>
    </div>
  );
};

export default DashboardHero;
