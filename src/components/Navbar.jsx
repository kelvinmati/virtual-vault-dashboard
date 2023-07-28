import React from "react";
import { Button, Dropdown } from "antd";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar bg-mainBlue text-white border-b z-50   ">
      {/* <div className="  flex   justify-end items-center  w-container_width mx-auto h-full">
        <div className="cursor-pointer">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            placement="bottomRight"
            arrow
          >
            <span>
              <i class="bx  bx-lg bxs-user-circle"></i>
            </span>
          </Dropdown>
        </div>
        <div>SDSDFC</div>
      </div> */}
    </div>
  );
};

export default Navbar;
const items = [
  {
    key: "1",
    label: (
      <Link to="/profile">
        <span>Profile</span>
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link to="/">
        <span className="text-mainRed">Logout</span>
      </Link>
    ),
  },
];
