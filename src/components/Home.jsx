import React from "react";
import OrderTable from "./tables/Table";
import { abbreviateNumber } from "../utils/AbbreviateNumber";
// import OrderTable from "./Table";

const Home = () => {
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
                  <span className="text-lg font-semibold">
                    {name === "Total Sales"
                      ? `KES ${abbreviateNumber(value)}`
                      : `${abbreviateNumber(value)}`}
                  </span>
                </div>
                <div className={`p-4 ${background} rounded-full`}>{icon}</div>
              </div>
              <div>
                <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">
                  {percentage}
                </span>
                <span className="px-2">from {year}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h2 className="text-xl   text-mainRed py-2">Recent Order</h2>
        <div>
          <OrderTable />
        </div>
      </div>
    </div>
  );
};

export default Home;

const stats = [
  {
    id: 1,
    name: "Sales",
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
    value: 100221,
    percentage: "14%",
    year: "2020",
  },
  {
    id: 2,
    name: "Orders",
    icon: (
      <i className="bx bx-purchase-tag text-orange-600 text-center text-2xl w-8 h-8"></i>
    ),
    background: "bg-orange-200",
    value: 18695,
    percentage: "25%",
    year: "2022",
  },
  {
    id: 3,
    name: "Products",
    icon: (
      <i className="bx bxl-product-hunt text-blue-600 text-center text-2xl w-8 h-8"></i>
    ),
    background: "bg-blue-200",
    value: 4096945,
    percentage: "5%",
    year: "2021",
  },
  {
    id: 4,
    name: "Customers",
    icon: (
      <i className="bx bx-group text-ourYellow text-center text-2xl w-8 h-8"></i>
    ),
    background: "bg-yellow-200",
    value: 38100,
    percentage: "36%",
    year: "2019",
  },
];
