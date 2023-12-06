import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../redux/actions.js/products";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("id is", id);
  // fetch product by id
  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  const product = useSelector((state) => state?.products?.product);
  console.log("product is", product);
  return (
    <div>
      <div className="grid grid-cols-3 gap-10 items-center">
        <div className="space-y-3">
          <div class="w-full h-96  overflow-hidden">
            <img
              src={product.featured_image}
              alt="Image"
              class="w-full h-full object-cover rounded"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product?.gallery?.map((image) => {
              return (
                <div
                  // key={product._id}
                  className="w-full rounded-xl h-20 bg-gray-200 overflow-hidden"
                >
                  <img
                    className="w-full h-full object-contain"
                    src={image}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-2">
          <h2 className="text-mainRed text-xl">{product.title}</h2>
          <p>
            <span className="text-gray-700 ">SKU :</span>{" "}
            <span className="font-bold">{product.sku}</span>
          </p>
          <p>
            <span className="text-gray-700 ">Price :</span>{" "}
            <span className="font-bold">{product.price}</span>
          </p>
          <p>
            <span className="text-gray-700 ">Quantity :</span>{" "}
            <span className="font-bold">{product.quantity}</span>
          </p>
          <p>
            <span className="text-gray-700 ">Weight :</span>{" "}
            <span className="font-bold">{product.weight}</span>
          </p>
          <p>
            <span className="text-gray-700 ">Category :</span>{" "}
            {/* <span className="font-bold">{product.categoryId}</span> */}
          </p>
          <p>
            <span className="text-gray-700 ">Description :</span>{" "}
            <span className="font-bold">{product.description}</span>
          </p>
          <button
            className="px-6 py-3 bg-mainBlue text-white "
            // onClick={handleDrawerOpen}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
