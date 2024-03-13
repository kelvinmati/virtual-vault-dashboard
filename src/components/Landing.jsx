import React, { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import { regSw, subscribe } from "../helper";

const Landing = () => {

  // const registerAndSubscribeCalled = useRef(false);

  // async function registerAndSubscribe() {
  //   try {
  //     const serviceWorkerReg = await regSw();
  //     const subscription = await subscribe(serviceWorkerReg);
  //     console.log('subscription is', subscription)
  //     // localStorage.setItem('subxn', subscription.data.newSubscription.subscription_id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // // Run the function only once using useEffect
  // useEffect(() => {
  //   if (!registerAndSubscribeCalled.current) {
  //     registerAndSubscribeCalled.current = true;
  //     registerAndSubscribe();
  //   }
  // }, []);
  return (
    <div>
      <Sidebar />
      <div className="home">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Landing;
