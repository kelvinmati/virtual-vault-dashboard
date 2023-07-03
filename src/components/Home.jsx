import React from "react";
import OrderTable from "./tables/Table";
// import OrderTable from "./Table";

const Home = () => {
  return (
    <div className="p-6 space-y-7">
      <h2 className="text-2xl font-bold border-b py-2">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-gray-50 p-3 rounded-md">COL</div>
        <div className="bg-gray-50 p-3 rounded-md">COL</div>
        <div className="bg-gray-50 p-3 rounded-md">COL</div>
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
