import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { getCategoriesByparentId, getTopMostCategories } from "../../redux/actions.js/categories";
import Button from "../../utils/Button";
import {
  Input,
  Pagination,
  Space,
  Table,

  Modal,
  Upload
} from "antd";

import Highlighter from "react-highlight-words";
import { abbreviateNumber } from "../../utils/AbbreviateNumber";
import CommonDrawer from "../../utils/Drawer";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { deleteProduct, getProductById, updateProduct } from "../../redux/actions.js/products";

const ProductsTable = ({ data, totalItems, setCurrentPage, currentPage }) => {
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

  const dispatch = useDispatch();
  // console.log("current page ", currentPage);
  // console.log("data  is ", data);
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            // type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (open) => {
      if (open) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            // backgroundColor: "#ffc069",
            backgroundColor: "red",

            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const [selectedRow, setSelectedRow] = useState(null);



  // Function to close the modal
  const handleModalClose = () => {
    setSelectedRow(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
    // setSelectedRow(null);
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "featured_image",
      key: "featured_image",
      width: "8%",

      render: (img) => (
        <img
          src={img}
          className="h-14 w-14 object-contain shadow border rounded-full"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      width: "20%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "20%",
      // ...getColumnSearchProps("quantity"),
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",

      sorter: (a, b) => a.price.length - b.price.length,
      sortDirections: ["descend", "ascend"],
      render: (price) => price,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "12%",
      render: (status) => (
        <p
          className={
            status === "in-stock"
              ? "bg-green-400 p-1 rounded-full text-center"
              : status === "out-of-stock"
              ? "bg-yellow-500 p-1 rounded-full text-center"
                : "bg-gray-200 p-1 rounded-full text-center"
          }
        >
          {status}
        </p>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (record) => (

        <div>

          <i
            onClick={() => openEditDrawer(record)}
            class="cursor-pointer bx bx-sm bx-edit"
          ></i>
          <i onClick={() => handleDelete(record._id)} class="cursor-pointer bx bx-sm bx-trash text-red-600"></i>

        </div>

        // <div className="relative">
        //   <button onClick={() => handleAtion(record)}>
        //     <svg
        //       xmlns="http://www.w3.org/2000/svg"
        //       fill="none"
        //       viewBox="0 0 24 24"
        //       strokeWidth={1.5}
        //       stroke="currentColor"
        //       className="w-6 h-6"
        //     >
        //       <path
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
        //       />
        //     </svg>
        //   </button>
        // </div>
      ),
    },
    // {
    //   render: (_, record) =>
    //     dataSource.length >= 1 ? (
    //       <Popconfirm
    //         title="Sure to delete?"
    //         onConfirm={() => handleDelete(record.key)}
    //       >
    //         <a>Delete</a>
    //       </Popconfirm>
    //     ) : null,
    // },
  ];

  // const [currentPage, setCurrentPage] = useState(1);
  // handleChange
  // const handleChange = (page) => {
  //   console.log("page is", page);
  //   setCurrentPage(page);
  // };
  // product edit
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [gallery, setGallery] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [productId, setProductId] = useState("")
  // const [product, setProduct] = useState({})
  // Image upload
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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

  const product = useSelector((state) => state?.products?.product)
  const openEditDrawer = (record) => {
    setProductId(record._id)
    setOpen(true);
    dispatch(getProductById(record._id))

  };
  // console.log("product  is", product)
  const loading = useSelector((state) => state?.products?.loading)
  // console.log("loading is", loading)

  // useEffect(() => {
  //   dispatch(getProductById(productId))
  // }, [productId])
  // console.log("product  is", product);
  // get top most categories

  const topMostCategories = useSelector((state) => state?.category?.top_most);
  useEffect(() => {
    dispatch(getTopMostCategories());
  }, []);

  // get categories by category id
  // useEffect(() => {
  //   dispatch(getCategoriesByparentId(categoryId));
  // }, [categoryId]);

  const handleGetSubCategories = (e) => {
    console.log("e.target.value", e.target.value);
    dispatch(getCategoriesByparentId(e.target.value));
  }
  const subCategories = useSelector(
    (state) => state?.category?.categories_by_category_id
  );


  const onSubmit = (data) => {
    setButtonLoading(true);
    const payload = { ...data, gallery, featured };
    console.log("new data is", payload);
    dispatch(updateProduct(productId, payload));
  }

  const error = useSelector((state) => state?.error);
  useEffect(() => {
    if (error?.typeId === "UPDATE_PRODUCT_FAIL") {
      setButtonLoading(false);
    } else {
      setButtonLoading(false);
      setOpen(false);
      reset();
    }
  }, [error]);

  // handle delete
  const handleDelete = (productId) => {
    // check if the user is sure to delete the product
    if (window.confirm("Are you sure you want to delete this product")) {
      dispatch(deleteProduct(productId))
      console.log("confirmed")
    }
    else {
      return
    }
  }
  return (
    <>
      <Table
        childrenColumnName="antdChildren"
        columns={columns}
        dataSource={data}
        pagination={false}
        // footer={() => "Footer f"}
      />
      <div className="flex justify-end my-5">
        <Pagination
          total={totalItems}
          pageSize={20}
          current={currentPage}
          onChange={handleChange}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          // pageSizeOptions={}
        />
      </div>
      <CommonDrawer
        width={600}
        open={open}
        setOpen={setOpen}
        drawerTitle="Edit product"
        content={
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="font-bold">Name</label>
              <input
                type="text"
                placeholder="product  name"
                defaultValue={product?.title}
                className="p-2 border rounded focus:border-mainBlue outline-none"
                {...register("title", {
                  required: false
                })}

              />

            </div>
            <div className="flex flex-col">
              <label className="font-bold">Category</label>
              <select
                defaultValue={product?.categoryId?._id}
                className="p-2 bg-white border rounded focus:border-mainBlue outline-none"
                {...register("categoryId", {
                  required: false,
                })
                }
                onChange={handleGetSubCategories}
              >
                <option className="hidden" value={product?.categoryId?._id}>{product?.categoryId?.name ? product?.categoryId?.name : product?.categoryId?._id}</option>

                {
                  topMostCategories?.map((topMostCategory) => {
                    const { _id, name } = topMostCategory;
                    if (product?.categoryId?._id !== _id) {
                      return (
                        <option key={_id} value={_id}>
                          {name ? name : "No category"}
                        </option>
                      );

                    }
                    return null;

                  }
                  )
                }
              </select>
            </div>


            <div className="flex flex-col">
              <label>Sub category</label>
              <select
                className="p-2 bg-white border rounded focus:border-mainBlue outline-none"
                defaultValue={product?.subCategoryId?._id}
                {...register("subCategoryId", {
                  required: false,

                })}
              >
                <option className="hidden" value={product?.subCategoryId?._id}>{product?.subCategoryId?.name ? product?.subCategoryId?.name : product?.subCategoryId?._id}</option>
                {subCategories?.map((subCategory) => {
                  const { _id, name } = subCategory;
                  return (
                    <option key={_id} value={_id}>
                      {subCategories ? name : "No sub category"}
                    </option>
                  );
                })}
              </select>

            </div>

            <div className="flex flex-col">
              <label className="font-bold">Brand</label>
              <input
                type="text"
                placeholder="product brand"
                defaultValue={product?.brand}
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
                  defaultValue={product?.weight}
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
                  defaultValue={product?.unit}
                  className="p-2.5 bg-white w-full border rounded focus:border-mainBlue outline-none"
                >
                  <option className="hidden">{product?.unit === "g" ? "Grams" : product?.unit === "kg" ? "Kilograms" : product?.unit === "Tonnes" ? "t" : product?.unit === "Liters" ? "l" : "ml"} </option>
                  {units?.map((unit) => {
                    const { _id, name } = unit;
                    if (product?.unit !== _id) {
                      return (
                        <option key={_id} value={_id}>
                          {name}
                        </option>
                      );
                    }
                    return null;

                  })}
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <label className="font-bold ">Featured image</label>
              <div className="w-[250px]  h-[200px] flex justify-start">
                <img src={product?.featured_image} alt="" />
              </div>

              <>
                <Upload
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={featured}
                  onPreview={handlePreview}
                  onChange={handleFeaturedChange}
                  beforeUpload={() => false}

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
                  defaultValue={product?.price}
                  placeholder="Enter product price"
                  className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                  {...register("price", {
                    required: false
                  })}
                />

              </div>
              <div>
                <label className="font-bold">Discount</label>
                <input
                  type="text"
                  defaultValue={product?.discount}
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
                  defaultValue={product?.quantity}
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
                  defaultValue={product?.sku}
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
                defaultValue={product?.description}
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
                defaultValue={product?.sizes || null}
                placeholder="S,M,L,XL"
                className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                {...register("sizes", {
                  required: false,
                })}
              />
            </div>
            <div className="space-y-4">
              <label className="font-bold">Image gallery</label>
              <div className="w-[200px]  h-[150px] flex justify-start space-x-3">
                {
                  product?.gallery?.map((img, index) => {
                    return (


                      <img key={index} src={img} alt="" />


                    )
                  }
                  )
                }

              </div>
              <>
                <Upload
                  listType="picture-card"
                  fileList={gallery}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => false}
                >
                  {gallery.length >= 3 ? null : uploadButton}
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
              {/* <button className="bg-mainBlue px-5 py-3  text-white rounded-md w-full"> */}
              {/* SUBMIT */}
              {/* </button> */}

              <Button title="Edit product" loading={buttonLoading} />
            </div>
          </form>
        }
      />
    </>
  );
};
export default ProductsTable;
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
  { _id: "l", name: "Liters" },
  { _id: "ml", name: "milliliters" },
];