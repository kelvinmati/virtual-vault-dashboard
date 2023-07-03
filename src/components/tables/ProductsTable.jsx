import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Space, Table, Popconfirm } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import Products from "../Products";
// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     occupation: "Software developer",
//   },
//   {
//     key: "2",
//     name: "Joe Black",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     occupation: "Farmer",
//   },
//   {
//     key: "3",
//     name: "Jim Green",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//     occupation: "Doctor",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//     occupation: "Pilot",
//   },
// ];s

const ProductsTable = ({ data, totalItems, setCurrentPage, currentPage }) => {
  // console.log("current page ", currentPage);
  console.log("data  is ", data);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
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

  const handleAtion = (record) => {
    console.log("record is", record);
  };

  const columns = [
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="relative">
          <button onClick={() => handleAtion(record)}>
            <i class="bx bx-sm bx-dots-vertical-rounded"></i>
          </button>
          {/* <div className="absolute">q</div> */}
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
    </>
  );
};
export default ProductsTable;
