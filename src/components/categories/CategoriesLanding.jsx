import React, { useState } from "react";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Navbar from "../Navbar";
// import Categories from "./Categories";
// import ChildCategories from "./ChildCategories";
// import Navbar from "./Navbar";
// import SubCategories from "./SubCategories";

const categoriesLanding = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [renderedComponent, setRenderedComponent] = useState(<Categories />);
  const loadComponent = (name, index) => {
    setActiveTab(index);
    switch (name) {
      case "Categories":
        setRenderedComponent(<Categories />);
        break;
      case "Sub Categories":
        setRenderedComponent(<SubCategories />);
        break;
      default:
        loadComponent;
        loadComponent;
        break;
    }
  };
  return (
    <div>
      {/* <Navbar /> */}
      <div className="p-5">
        {/* <div className="pb-5">
          <Link to="/products">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
        </div> */}
        <div className="grid  md:grid-cols-2   items-center  text-center  border-b border-gray-100  w-full  ">
          {tabs.map((tab, index) => {
            const { name } = tab;
            return (
              <div
                key={index}
                onClick={() => loadComponent(name, index)}
                className={
                  activeTab === index
                    ? "md:text-xl cursor-pointer  p-2.5 rounded-t-full border-t border-gray-100 text-white bg-mainBlue"
                    : "md:text-xl cursor-pointer  p-2.5"
                }
              >
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>{renderedComponent}</div>
    </div>
  );
};

export default categoriesLanding;
const tabs = [
  {
    name: "Categories",
  },
  {
    name: "Sub Categories",
  },
];
