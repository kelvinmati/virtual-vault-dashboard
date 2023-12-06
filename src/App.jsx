import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Home from "./components/Home";
// import Categories from "./components/categories/Categories";
import Profile from "./components/profile";
import Orders from "./components/Orders";
import Products from "./components/Products";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Register from "./components/Register";
import Auth from "./components/middleware/Auth";
// import SubCategories from "./components/categories/SubCategories";
import CategoriesLanding from "./components/categories/CategoriesLanding";
import ProductDetails from "./components/ProductDetails";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Auth />}>
          <Route path="/" element={<Landing />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<CategoriesLanding />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductDetails />} />

            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="sub-categories" element={<SubCategories />} /> */}
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/editor" element={<Editor />} /> */}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
