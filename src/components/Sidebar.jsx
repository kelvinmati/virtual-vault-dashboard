import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar bg-mainBlue text-white ">
      <h1 className="text-xl p-5  h-[60px] border-b text-mainRed">
        Virtual Vault
      </h1>
      <ul className="space-y-2  py-5 pl-4  w-full">
        <li>
          <NavLink to="/" activeclassname="active">
            <div className="flex items-center space-x-2 text-lg">
              <span>
                <i class="bx bx-sm bxs-home"></i>
              </span>
              <span className="">Home</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" activeclassname="active">
            <div className="flex items-center space-x-2 text-lg">
              <span>
                {/* <i class="bx bx-sm bxs-home"></i> */}
                <i class="bx  bx-sm bxs-category"></i>
              </span>
              <span className="">Categories</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" activeclassname="active">
            <div className="flex items-center space-x-2 text-lg">
              <span>
                <i className="bx bx-sm bxl-product-hunt"></i>
              </span>
              <span className="">Products</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Orders" activeclassname="active">
            <div className="flex items-center space-x-2 text-lg">
              <span>
                <i className="bx bx-sm bx-purchase-tag"></i>
              </span>
              <span className="">Orders</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeclassname="active">
            <div className="flex items-center space-x-2 text-lg">
              <span>
                <i class="bx bx-sm bxs-user"></i>
              </span>
              <span className="">Profile</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
