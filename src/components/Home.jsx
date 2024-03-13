import React, { useEffect, useState, useRef } from "react";
// import OrderTable from "./tables/Table";
import { abbreviateNumber } from "../utils/AbbreviateNumber";
import { useDispatch, useSelector } from "react-redux";
import { format, set } from "date-fns";
import { userProfile } from "../redux/actions.js/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { get } from "react-hook-form";
// import OrderTable from "./Table";
// import { regSw, subscribe } from "../helper";
const Home = () => {

  // const registerAndSubscribeCalled = useRef(false);

  // async function registerAndSubscribe() {
  //   try {
  //     const serviceWorkerReg = await regSw();
  //     const subscription = await subscribe(serviceWorkerReg);
  //     // console.log('subscription is', subscription)
  //     // localStorage.setItem('subxn', subscription.data.newSubscription.subscription_id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // // Run the function only once using useEffect
  // useEffect(() => {
  //   if (!registerAndSubscribeCalled.current) {
  //     registerAndSubscribeCalled.current = true;
  //     registerAndSubscribe();
  //   }
  // }, []);


  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state);
  // console.log("currentUser is", currentUser);
  useEffect(() => {
    dispatch(userProfile());
  }, []);

  const [statistics, setStatistics] = useState({})
  const getStatistics = async () => {
    try {

      const response = await axios.get("https://api.virtualvault.lol/api/statistics")
      const data = await response.data
      setStatistics(data.data)


    } catch (error) {
      console.log(error)
      toast.error("Error getting statistics")
    }

  }
  useEffect(() => {
    getStatistics()
  }, [])

  const stats = [
    {
      id: 1,
      name: "Total orders",
      icon: (
        <svg
          className="w-6 h-6 text-center text-green-600"
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx={9} cy={21} r={1} />
          <circle cx={20} cy={21} r={1} />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
      background: "bg-green-200",
      // value: statistics?.totalOrders,
      value: statistics?.totalOrders,
      percentage: "14%",
      year: "2020",
    },
    {
      id: 2,
      name: "Categories",
      icon: (
        <i className="bx bx-purchase-tag text-orange-600 text-center text-2xl w-8 h-8"></i>
      ),
      background: "bg-orange-200",
      value: statistics?.totalCategories,
      percentage: "25%",
      year: "2022",
    },
    {
      id: 3,
      name: "Sub Categories",
      icon: (
        <i className="bx bx-purchase-tag text-orange-600 text-center text-2xl w-8 h-8"></i>
      ),
      background: "bg-orange-200",
      value: statistics?.totalSubCategories,
      percentage: "25%",
      year: "2022",
    },
    {
      id: 4,
      name: "Products",
      icon: (
        <i className="bx bxl-product-hunt text-blue-600 text-center text-2xl w-8 h-8"></i>
      ),
      background: "bg-blue-200",
      value: statistics?.totalProducts,
      percentage: "5%",
      year: "2021",
    },
  ];

  const orders = [
    {
      order_no: "VORD1345",
      name: "John Doe",
      address: "Nairobi",
      email: "johndoe@gmail.com",
      quantity: 1,

      createdAt: "2023-08-11T01:45:59.982+00:00",
    },
    {
      order_no: "VORD9544",
      name: "Doris Otieno",
      address: "Mombasa",
      email: "johndoe@gmail.com",
      quantity: 6,
      createdAt: "2023-07-20T01:45:59.982+00:00",
    },
    {
      order_no: "VORD980",
      name: "Alex Stone",
      address: "Kisumu",
      email: "johndoe@gmail.com",
      quantity: 3,
      createdAt: "2023-08-02T01:45:59.982+00:00",
    },
  ];


  console.log("statistics", statistics)
  return (
    <div className="p-6 space-y-10">
      <h2 className="text-2xl font-bold border-b py-2">Admin Dashboard</h2>
      {/* <div className="grid grid-cols-3 gap-5">
        <div className="bg-gray-50 p-3 rounded-md">COL</div>
        <div className="bg-gray-50 p-3 rounded-md">COL</div>
        <div className="bg-gray-50 p-3 rounded-md">COL</div>
      </div> */}
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const { name, value, percentage, icon, year, background } = stat;

          return (
            <div
              key={index}
              className="bg-white p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-500">{name}</span>
                  <span className="text-lg font-semibold">{value}</span>
                </div>
                <div className={`p-4 ${background} rounded-full`}>{icon}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h2 className="text-xl   text-mainRed py-2">Recent Order</h2>
        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200  text-gray-700 text-left uppercase text-sm ">
                <th className="p-2"> Order No</th>
                <th className="p-2">name</th>
                <th className="p-2">Address</th>
                <th className="p-2">Email</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Created At</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const { order_no, createdAt, name, email, address, quantity } =
                  order;
                const even = index % 2 == 0;
                return (
                  <tr
                    key={index}
                    className={
                      !even
                        ? "bg-gray-50 text-gray-600 "
                        : "bg-white text-gray-600 "
                    }
                  >
                    <td className="p-2">{order_no}</td>
                    <td className="p-2">{name}</td>
                    <td className="p-2">{address}</td>
                    <td className="p-2">{email}</td>
                    <td className="p-2">{quantity}</td>

                    <td className="p-2">
                      {format(new Date(createdAt), "do MMM yyyy")}
                    </td>

                    <td className="p-2">
                      <i class="bx bx-sm bx-dots-vertical-rounded"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;


