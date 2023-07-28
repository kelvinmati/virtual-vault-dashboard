import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createProduct, getAllProducts } from "../redux/actions.js/products";
import ProductsTable from "./tables/ProductsTable";
import CommonDrawer from "../utils/Drawer";
import { getAllCategories } from "../redux/actions.js/categories";
import Editor from "../utils/Editor";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

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
  const [description, setDescription] = useState("");
  // fetch all products
  useEffect(() => {
    dispatch(getAllProducts(currentPage));
  }, [currentPage]);

  const products = useSelector((state) => state?.products?.products?.products);
  const totalItems = useSelector(
    (state) => state?.products?.products?.totalItems
  );

  // get all categories
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const categories = useSelector((state) => state?.category?.categories);
  // Image upload
  // upload
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  // add product
  const onSubmit = (data) => {
    const newData = { ...data, fileList, description };
    console.log("newData is", newData);
    dispatch(createProduct(newData));
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
                  className="p-2 border rounded focus:border-mainBlue outline-none"
                  {...register("name", {
                    required: "Product name is required!",
                  })}
                />
                <p className="text-mainRed">{errors?.name?.message}</p>
              </div>
              <div className="flex flex-col">
                <label>Category</label>
                <select
                  {...register("categoryId", {
                    required: "Category  is required!",
                  })}
                  className="p-2 bg-white border rounded focus:border-mainBlue outline-none"
                >
                  <option className="hidden"> Select category</option>
                  {categories?.map((category) => {
                    const { _id, name } = category;
                    return (
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <p className="text-mainRed">{errors?.categoryId?.message}</p>
              </div>
              <div className="flex flex-col">
                <label>Brand</label>
                <select
                  {...register("brandId", {
                    required: false,
                  })}
                  className="p-2 bg-white border rounded focus:border-mainBlue outline-none"
                >
                  <option className="hidden"> Select brand</option>
                  {brands?.map((brand) => {
                    const { _id, name } = brand;
                    return (
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <p className="text-mainRed">{errors?.categoryId?.message}</p>
              </div>
              <div className="flex flex-col">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="product description"
                  className="p-2 border rounded focus:border-mainBlue outline-none"
                  {...register("description", {
                    required: false,
                  })}
                />
              </div>
              <div className="grid grid-cols-2  gap-3">
                <div>
                  <p>Sku(Stock Keeping Unit)</p>
                  <input
                    type="text"
                    placeholder="JH6878F"
                    className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                    {...register("sku", {
                      required: false,
                    })}
                  />
                </div>
                <div>
                  <p>Weight</p>
                  <input
                    type="text"
                    placeholder="4kg,g,L"
                    className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                    {...register("weight", {
                      required: false,
                    })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2  gap-3">
                <div>
                  <p>Price (Ksh)</p>
                  <input
                    type="text"
                    placeholder="Enter product price"
                    className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                    {...register("price", {
                      required: "Product is required",
                    })}
                  />
                  <p className="text-mainRed">{errors?.price?.message}</p>
                </div>
                <div>
                  <p>Discount (%)</p>
                  <input
                    type="text"
                    placeholder="Enter discount"
                    className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                    {...register("discount", {
                      required: false,
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>Description</label>
                {/* <input
                  type="text"
                  placeholder="product description"
                  className="p-2 border rounded focus:border-mainBlue outline-none"
                  {...register("description", {
                    required: false,
                  })}
                /> */}
                <Editor setDescription={setDescription} />
              </div>
              <div>
                <>
                  <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 4 ? null : uploadButton}
                  </Upload>
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{
                        width: "100%",
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </>
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

const brands = [
  { _id: "wedfdfbkj883", name: "Louis Vuitonn" },
  { _id: "GJ834bv", name: "Channel" },
  { _id: "OPIOGH9935tvc", name: "Gucci" },
  { _id: "cvmdf9099", name: "Nike" },
];

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllProducts, searchProduct } from "../redux/actions.js/products";
// import Pagination from "../utils/Pagination";
// import Spinner from "../utils/Spinner";
// const Products = () => {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   useEffect(() => {
//     dispatch(getAllProducts(currentPage));
//   }, [currentPage]);

//   const products = useSelector((state) => state?.products?.products?.products);
//   // console.log("length is", products);
//   // const currentPage = useSelector(
//   //   (state) => state?.products?.products?.currentPage
//   // );
//   const totalItems = useSelector(
//     (state) => state?.products?.products?.totalItems
//   );

//   // console.log("totalItems are", totalItems);
//   //get total products
//   const onPageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//   // const totalProducts = 200;
//   const totalPages = Math.ceil(totalItems / 10);
//   const loading = useSelector((state) => state?.products?.loading);
//   // console.log("loading is", loading);
//   // search functionality
//   // const [searchTerm, setSearchTerm] = useState("");
//   const handleSearch = (e) => {
//     let searchTerm = e.target.value;
//     dispatch(searchProduct(searchTerm));
//   };
//   const searchProducts = useSelector(
//     (state) => state?.products?.search_results?.results
//   );
//   console.log("searchProducts are", searchProducts);
//   return (
//     <div className="p-6 space-y-7">
//       <h2 className="text-2xl font-bold border-b py-2">Products</h2>
//       <div className="relative">
//         <form>
//           <input
//             type="text"
//             className="border w-full p-2 rounded"
//             placeholder="Search product"
//             onChange={handleSearch}
//           />
//         </form>
//         {/* <div className="absolute bg-blue-400 w-full p-2">
//           <ul>
//             {searchProducts?.map((searchProduct) => {
//               return <li>{searchProduct.title}</li>;
//             })}
//           </ul>
//         </div> */}
//       </div>
//       <div>
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-200  text-gray-700 text-left uppercase text-sm  ">
//               <th className="p-2.5 ">name</th>
//               <th className="p-2.5 ">Quantity</th>
//               <th className="p-2.5 ">price</th>
//               <th className="p-2.5 ">status</th>
//               <th className="p-2.5 ">action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <Spinner />
//             ) : (
//               products?.map((product, index) => {
//                 const { title, _id, quantity, price, status } = product;
//                 const even = index % 2 == 0;
//                 return (
//                   <tr
//                     key={_id}
//                     className={
//                       !even
//                         ? "bg-gray-50 text-gray-600  "
//                         : "bg-white text-gray-600    "
//                     }
//                   >
//                     <td className="p-1.5  ">{title}</td>
//                     <td className="p-1.5  ">{quantity}</td>
//                     <td className="p-1.5  ">{price}</td>
//                     <td className="p-1.5  ">{status}</td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//         <div className="">
//           <Pagination
//             currentPage={currentPage}
//             onPageChange={onPageChange}
//             totalPages={totalPages}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
