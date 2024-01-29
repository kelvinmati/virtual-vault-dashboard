import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonDrawer from "../../utils/Drawer";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from "antd";
import { Popconfirm } from "antd";
import format from "date-fns/format";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getTopMostCategories,
} from "../../redux/actions.js/categories";
import Button from "../../utils/Button";
import { set } from "date-fns";
const Categories = () => {
  const dispatch = useDispatch();
  // get all categories
  useEffect(() => {
    dispatch(getTopMostCategories());
  }, []);

  const [open, setOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [category, setCategory] = useState({});
  const [categoryData, setCategoryData] = useState({
    name: "",
    id: "",
  })


  // redux data
  const categories = useSelector((state) => state?.category?.top_most);
  const loading = useSelector((state) => state?.category?.loading);
  console.log("loading", loading)
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

  // handle add category
  const handleAddCategory = () => {
    setOpen(true);
    setIsEdit(false);
    reset();
  };

  // handle edit
  const handleEdit = (category) => () => {
    setCategory(category);
    setOpen(true);
    setIsEdit(true);
  };

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const onSubmit = (data) => {
    setButtonLoading(true);
    isEdit
      ? dispatch(editCategory(category._id, category))
      : dispatch(addCategory(data));

    // console.log("data is", data);
  };




  // update button state
  useEffect(() => {
    if (error?.typeId === "EDIT_CATEGORY_FAIL") {
      setButtonLoading(false);
      setOpen(true);
    } else {
      setButtonLoading(false);
      setOpen(false);
      reset();
    }
  }, [error]);

  // handle delete
  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(categoryId))
    } else {
      return
    }
  }
  return (
    <div>
    <div className="p-6 space-y-7">
      <div className="flex justify-between items-center border-b py-2">
        <h2 className="text-2xl font-bold ">Categories</h2>
        <button
          onClick={handleAddCategory}
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
                    <i
                      onClick={handleEdit(category)}
                      class="cursor-pointer bx bx-sm bx-edit"
                    ></i>
                    <i onClick={() => handleDelete(category._id)} class="cursor-pointer bx bx-sm bx-trash text-red-600"></i>
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
        drawerTitle={isEdit ? "Edit category" : "Add new category"}
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
                defaultValue={isEdit ? category?.name : null}
                onChange={handleChange}
              />
              <p className="text-mainRed">{errors?.name?.message}</p>
            </div>
            <div className="flex flex-col">
              <label>Description</label>
              <input
                type="text"
                placeholder="Category description"
                className="p-2 border rounded"
                {...register("description", {
                  required: false,
                })}
                defaultValue={isEdit ? category?.description : null}
                onChange={handleChange}
              />
            </div>
            <div>
              <Button
                title={isEdit ? "Update" : "Submit"}
                loading={buttonLoading}
              />
            </div>
          </form>
        }
      />
      </div>



    </div>
  );
};

export default Categories;
