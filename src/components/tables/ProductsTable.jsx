import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Pagination,
  Space,
  Table,
  Popconfirm,
  Modal,
} from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import Products from "../Products";
import { abbreviateNumber } from "../../utils/AbbreviateNumber";
import CommonDrawer from "../../utils/Drawer";
import { useNavigate } from "react-router-dom";
const ProductsTable = ({ data, totalItems, setCurrentPage, currentPage }) => {
  // console.log("current page ", currentPage);
  // console.log("data  is ", data);
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
          {/* <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            closeee
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

  const handleAtion = (record) => {
    // console.log("record is", record);
    setSelectedRow(record);
    navigate("/product/" + record._id);
  };
  console.log("selectedRow is", selectedRow);
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
              : ""
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
        <div className="relative">
          <button onClick={() => handleAtion(record)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
              />
            </svg>
          </button>
          {/* Modal for displaying the selected row's data */}
          {/* <div className="">
            <Modal
              open={!!selectedRow}
              onCancel={handleModalClose}
              // title="Product Details"
              footer={null}
              width={1000}
            >
              {selectedRow && (
                <div className="grid grid-cols-3 gap-10 items-center">
                  <div className="space-y-3">
                    <div class="w-full h-96  overflow-hidden">
                      <img
                        src={selectedRow.featured_image}
                        alt="Image"
                        class="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedRow?.gallery?.map((image) => {
                        return (
                          <div
                            // key={selectedRow._id}
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
                    <h2 className="text-mainRed text-xl">
                      {selectedRow.title}
                    </h2>
                    <p>
                      <span className="text-gray-700 ">SKU :</span>{" "}
                      <span className="font-bold">{selectedRow.sku}</span>
                    </p>
                    <p>
                      <span className="text-gray-700 ">Price :</span>{" "}
                      <span className="font-bold">{selectedRow.price}</span>
                    </p>
                    <p>
                      <span className="text-gray-700 ">Quantity :</span>{" "}
                      <span className="font-bold">{selectedRow.quantity}</span>
                    </p>
                    <p>
                      <span className="text-gray-700 ">Weight :</span>{" "}
                      <span className="font-bold">{selectedRow.weight}</span>
                    </p>
                    <p>
                      <span className="text-gray-700 ">Category :</span>{" "}
                      <span className="font-bold">
                        {selectedRow.categoryId}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-700 ">Description :</span>{" "}
                      <span className="font-bold">
                        {selectedRow.description}
                      </span>
                    </p>
                    <button
                      className="px-6 py-3 bg-mainBlue text-white "
                      onClick={handleDrawerOpen}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </Modal>
          </div> */}
        </div>
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
  const handleChange = (page) => {
    console.log("page is", page);
    setCurrentPage(page);
  };
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
          <form className="space-y-5">
            <div className="flex flex-col">
              <label>Name</label>
              <input
                type="text"
                placeholder="product  name"
                className="p-2 border rounded"
                defaultValue={selectedRow?.title}
                // {...register("name", {
                //   required: "Product name is required!",
                // })}
              />
              {/* <p className="text-mainRed">{errors?.name?.message}</p> */}
            </div>
            <div className="flex flex-col">
              <label>Description</label>
              <input
                type="text"
                placeholder="product description"
                className="p-2 border rounded"
                // {...register("description", {
                //   required: false,
                // })}
              />
            </div>
            <div>
              <button className="bg-mainBlue px-5 py-2 text-white rounded-md">
                Update
              </button>
            </div>
          </form>
        }
      />
    </>
  );
};
export default ProductsTable;
