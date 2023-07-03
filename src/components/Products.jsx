import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getAllProducts } from "../redux/actions.js/products";
import ProductsTable from "./tables/ProductsTable";
import CommonDrawer from "../utils/Drawer";

const Products = () => {
  const dispatch = useDispatch();

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
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getAllProducts(currentPage));
  }, [currentPage]);

  const products = useSelector((state) => state?.products?.products?.products);
  console.log("length is", products?.length);
  // const currentPage = useSelector(
  //   (state) => state?.products?.products?.currentPage
  // );
  const totalItems = useSelector(
    (state) => state?.products?.products?.totalItems
  );

  console.log("totalItems are", totalItems);
  // add product
  const onSubmit = (data) => {
    console.log("data is", data);
  };
  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold border-b py-2">Products</h2> */}
      <div className="flex justify-between items-center border-b py-2">
        <h2 className="text-2xl font-bold ">Products</h2>
        <button
          onClick={() => setOpen(true)}
          className="flex  items-center space-x-2  bg-mainBlue text-white px-5 py-2 rounded-md text-lg"
        >
          <span>
            <i class="bx bx-sm bx-plus"></i>
          </span>{" "}
          <span>Add product</span>
        </button>
      </div>
      <div>
        <ProductsTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={totalItems}
          data={products}
        />
        <CommonDrawer
          width={600}
          open={open}
          setOpen={setOpen}
          drawerTitle="Add new product"
          content={
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="product  name"
                  className="p-2 border rounded"
                  {...register("name", {
                    required: "Product name is required!",
                  })}
                />
                <p className="text-mainRed">{errors?.name?.message}</p>
              </div>
              <div className="flex flex-col">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="product description"
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
    </div>
  );
};

export default Products;
