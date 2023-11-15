import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createProduct, getAllProducts } from "../redux/actions.js/products";
import ProductsTable from "./tables/ProductsTable";
import CommonDrawer from "../utils/Drawer";
import {
  getAllCategories,
  getCategoriesByparentId,
  getTopMostCategories,
} from "../redux/actions.js/categories";
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

  // fetch all products
  // useEffect(() => {
  //   dispatch(getAllProducts(currentPage));
  // }, [currentPage]);
  const payload = {
    page: 1,
    searchTerm: "",
  };
  useEffect(() => {
    dispatch(getAllProducts(payload));
  }, []);

  const products = useSelector((state) => state?.products?.products);

  // get top most categories
  useEffect(() => {
    dispatch(getTopMostCategories());
  }, []);
  const topMostCategories = useSelector((state) => state?.category?.top_most);
  // console.log("topMostCategories are", topMostCategories);

  // Image upload
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
  const [gallery, setGallery] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  // console.log("categoryId is", categoryId);

  // get categories by category id
  useEffect(() => {
    dispatch(getCategoriesByparentId(categoryId));
  }, [categoryId]);
  const subCategories = useSelector(
    (state) => state?.category?.categories_by_category_id
  );
  // console.log("subCategories are", subCategories);
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
  const handleChange = ({ fileList: newFileList }) => setGallery(newFileList);
  const handleFeaturedChange = ({ fileList: newFileList }) =>
    setFeatured(newFileList);
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
    const newData = { ...data, gallery, featured };
    // console.log("newData is", newData);
    dispatch(createProduct(newData));
  };
  // title,
  // sku,
  // weight,
  // unit,
  // price,
  // currency,
  // discount,
  // quantity,
  // categoryId,
  // brand,
  // description,
  // additionalInformation,
  // sizes,

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold border-b py-2">Products</h2> */}
      <div className="flex justify-between items-center border-b py-2">
        <h2 className="text-2xl font-bold">Products</h2>
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
          currentPage={products?.currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={products?.totalProducts}
          data={products?.products}
        />
        <CommonDrawer
          width={600}
          open={open}
          setOpen={setOpen}
          drawerTitle="Add new product"
          content={
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <label className="font-bold">Name</label>
                <input
                  type="text"
                  placeholder="product  name"
                  className="p-2 border rounded focus:border-mainBlue outline-none"
                  {...register("title", {
                    required: "Product name is required!",
                  })}
                />
                <p className="text-mainRed">{errors?.title?.message}</p>
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Category</label>
                <select
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="p-2 bg-white border rounded focus:border-mainBlue outline-none"
                >
                  <option className="hidden"> Select category</option>
                  {topMostCategories?.map((topMostCategory) => {
                    const { _id, name } = topMostCategory;
                    return (
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex flex-col">
                <label>Sub category</label>
                <select
                  {...register("categoryId", {
                    required: "sub category  is required!",
                  })}
                  className="p-2 bg-white border rounded focus:border-mainBlue outline-none"
                >
                  <option className="hidden"> Select sub category</option>
                  {subCategories?.map((subCategory) => {
                    const { _id, name } = subCategory;
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
                <label className="font-bold">Brand</label>
                <input
                  type="text"
                  placeholder="product brand"
                  className="p-2 border rounded focus:border-mainBlue outline-none"
                  {...register("brand", {
                    required: false,
                  })}
                />
              </div>

              <div className="grid grid-cols-2  gap-3">
                <div>
                  <label className="font-bold">Weight</label>
                  <input
                    type="text"
                    placeholder="4kg,g,L"
                    className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                    {...register("weight", {
                      required: false,
                    })}
                  />
                </div>
                <div>
                  <label className="font-bold">Unit</label>
                  <select
                    {...register("unit", {
                      required: false,
                    })}
                    className="p-2.5 bg-white w-full border rounded focus:border-mainBlue outline-none"
                  >
                    <option className="hidden"> Select unit</option>
                    {units?.map((unit) => {
                      const { _id, name } = unit;
                      return (
                        <option key={_id} value={_id}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold">Featured image</label>
                <>
                  <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={featured}
                    onPreview={handlePreview}
                    onChange={handleFeaturedChange}
                  >
                    {featured.length >= 1 ? null : uploadButton}
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
              <div className="grid grid-cols-2  gap-3">
                <div>
                  <label className="font-bold">Price (Ksh)</label>
                  <input
                    type="text"
                    placeholder="Enter product price"
                    className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                    {...register("price", {
                      required: "Price is required",
                    })}
                  />
                  <p className="text-mainRed">{errors?.price?.message}</p>
                </div>
                <div>
                  <label className="font-bold">Discount</label>
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
              <div className="grid grid-cols-2  gap-3">
                <div>
                  <label className="font-bold">Quantity</label>
                  <input
                    type="text"
                    placeholder="JH6878F"
                    className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                    {...register("quantity", {
                      required: false,
                    })}
                  />
                </div>
                <div>
                  <p className="font-bold">Sku(Stock Keeping Unit)</p>
                  <input
                    type="text"
                    placeholder="JH6878F"
                    className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                    {...register("sku", {
                      required: false,
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Description</label>
                <input
                  type="text"
                  placeholder="product description"
                  className="p-2 border rounded focus:border-mainBlue outline-none"
                  {...register("description", {
                    required: false,
                  })}
                />
              </div>

              <div>
                <p className="font-bold">Sizes</p>
                <input
                  type="text"
                  placeholder="S,M,L,XL"
                  className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                  {...register("sizes", {
                    required: false,
                  })}
                />
              </div>
              <div>
                <label className="font-bold">Image gallery</label>
                <>
                  <Upload
                    listType="picture-card"
                    fileList={gallery}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {gallery.length >= 4 ? null : uploadButton}
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
                <button className="bg-mainBlue px-5 py-3  text-white rounded-md w-full">
                  SUBMIT
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

const units = [
  { _id: "kg", name: "Kilograms" },
  { _id: "g", name: "Grams" },
  { _id: "t", name: "Tonnes" },
];
