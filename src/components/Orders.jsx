import React from "react";

const Orders = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold border-b py-2">Orders (10)</h2>

      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200  text-gray-700 text-left uppercase text-sm ">
              <th className="p-2"> Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              const { name, description, createdAt, status } = category;
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
                  <td className="p-2">{name}</td>
                  <td className="p-2">{description || "Null"}</td>
                  <td className="p-2">
                    {format(new Date(createdAt), "do MMM yyyy")}
                  </td>
                  <td className="p-2">{status}</td>

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
