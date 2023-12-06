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
              const { order_no, name, address, quantity, email, createdAt } =
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
  );
};

export default Orders;

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
