import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CommonDrawer from "../utils/Drawer";
// import { Button } from "antd";
const Categories = () => {
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  console.log("fileList is", fileList);
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
  // const showModal = () => {
  //   setOpen(true);
  // };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onSubmit = (data) => {
    console.log("data is", data);
  };
  return (
    <div className="p-6">
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
              <button className="bg-mainBlue px-5 py-2 text-white rounded-md">
                Submit
              </button>
            </div>
          </form>
        }
      />
    </div>
  );
};

export default Categories;
