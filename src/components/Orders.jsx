import { format } from "date-fns";
import React from "react";

const Orders = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold border-b py-2">Orders List</h2>

      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200  text-gray-700 text-left uppercase text-sm ">
              <th className="p-2"> Order No</th>
              <th className="p-2">Username</th>
              <th className="p-2">phone</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const { order_no, username, phone, createdAt } = order;
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

                  <td className="p-2">{username}</td>

                  <td className="p-2">{phone}</td>

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
  );
};

export default Orders;

const orders = [
  {
    order_no: "VORD1345",
    username: "John Doe",
    phone: "0767145097",
    createdAt: "2023-08-11T01:45:59.982+00:00",
  },
  {
    order_no: "VORD9544",
    username: "Doris Otieno",
    phone: "0778149097",
    createdAt: "2023-07-20T01:45:59.982+00:00",
  },
  {
    order_no: "VORD980",
    username: "Alex Stone",
    phone: "011609245",
    createdAt: "2023-08-02T01:45:59.982+00:00",
  },
];
