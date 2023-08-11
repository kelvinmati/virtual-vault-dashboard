import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLogout } from "../redux/actions.js/auth";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handle logout
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  useEffect(() => {
    if (auth) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [auth]);

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
          <NavLink to="/orders" activeclassname="active">
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

      <div
        className="absolute text-mainRed  w-full bottom-0 flex  p-4 items-center space-x-2"
        onClick={() => dispatch(userLogout())}
      >
        <p className="text-xl">Logout</p>
        <i class="bx  bx-sm bx-log-out"></i>
      </div>
    </div>
  );
};

export default Sidebar;
