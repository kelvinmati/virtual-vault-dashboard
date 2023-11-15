import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonDrawer from "../../utils/Drawer";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from "antd";
import format from "date-fns/format";
import {
  addCategory,
  getAllCategories,
} from "../../redux/actions.js/categories";
import Button from "../../utils/Button";
const Categories = () => {
  const dispatch = useDispatch();
  // get all categories
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const [open, setOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const categories = useSelector((state) => state?.category?.categories);
  // console.log("categories are", categories);
  const loading = useSelector((state) => state?.category?.loading);

  const error = useSelector((state) => state?.error);
  useEffect(() => {
    if (error?.typeId === "ADD_CATEGORY_FAIL") {
      setButtonLoading(false);
    } else {
      setButtonLoading(false);
      setOpen(false);
      reset();
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    shouldFocusError: true,
  });

  const onSubmit = (data) => {
    setButtonLoading(true);
    dispatch(addCategory(data));
    console.log("data is", data);
  };

  return (
    <div className="p-6 space-y-7">
      <div className="flex justify-between items-center border-b py-2">
        <h2 className="text-2xl font-bold ">Categories</h2>
        <button
          onClick={() => setOpen(true)}
          className="flex  items-center space-x-2  bg-mainBlue text-white px-5 py-2 rounded-md text-lg"
        >
          <span>
            <i class="bx bx-sm bx-plus"></i>
          </span>{" "}
          <span>Add category</span>
        </button>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200  text-gray-700 text-left uppercase text-sm ">
              <th className="p-2"> Name</th>
              <th className="p-2">Description</th>
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
                      ? "bg-gray-100 text-gray-600 "
                      : "bg-white text-gray-600 "
                  }
                >
                  <td className="p-2">{name}</td>
                  <td className="p-2">{description || "Null"}</td>
                  <td className="p-2">
                    {format(new Date(createdAt), "do MMM yyyy")}
                  </td>
                  <td className="p-2">{status}</td>

                  <td className="p-2 flex space-x-3">
                    <i class="cursor-pointer bx bx-sm bx-edit"></i>
                    <i class="cursor-pointer bx bx-sm bx-trash text-red-600"></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <CommonDrawer
        open={open}
        setOpen={setOpen}
        drawerTitle="Add new category"
        content={
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label>Name</label>
              <input
                type="text"
                placeholder="Category name"
                className="p-2 border rounded"
                {...register("name", {
                  required: "Category name is required!",
                })}
              />
              <p className="text-mainRed">{errors?.name?.message}</p>
            </div>
            {/* <div className="flex flex-col ">
              <label>Parent Category</label>
              <select
                className="p-2 bg-white border rounded"
                {...register("parentId", {
                  required: false,
                })}
              >
                <option value="0">Top most</option>
                {categories?.map((category) => {
                  const { _id, name } = category;
                  return (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div> */}

            <div className="flex flex-col">
              <label>Description</label>
              <input
                type="text"
                placeholder="Category description"
                className="p-2 border rounded"
                {...register("description", {
                  required: false,
                })}
              />
            </div>
            <div>
              <Button title="Submit" loading={buttonLoading} />
            </div>
          </form>
        }
      />
    </div>
  );
};

export default Categories;
const categoriess = [
  {
    name: "Womens fashion",
    description: "Represents all clothes under women",
    createdAt: "2023-06-28T13:21:20.738+00:00",
  },
  {
    name: "Men fashion",
    description: "Represents all clothes under men",
    createdAt: "2023-06-28T13:21:20.738+00:00",
  },
];

const parentCategories = [];
