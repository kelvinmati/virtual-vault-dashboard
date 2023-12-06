import React, { useEffect, useState } from "react";
import Button from "../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../redux/actions.js/auth";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfile());
  }, []);
  const currentUser = useSelector((state) => state?.auth?.user);
  console.log("current user is", currentUser);
  return (
    <div>
      <main className="p-4 space-y-5">
        <h2 className="text-2xl font-bold border-b py-2">Profile</h2>
        <div className="space-y-5">
          <form className="bg-white rounded p-4 space-y-8">
            <h2 className="text-lg font-semibold">Edit profile</h2>
            <div className="grid grid-cols-2 items-center">
              <label className="text-lg">Firstname</label>
              <input
                type="text"
                className="p-2  bg-gray-100 rounded focus:bg-white focus:border outline-none focus:border-gray-100"
                defaultValue={currentUser?.name.split(" ")[0]}
                name="name"
                // onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 items-center">
              <label className="text-lg">Lastname</label>
              <input
                type="text"
                className="p-2  bg-gray-100 rounded focus:bg-white focus:border outline-none focus:border-gray-100"
                defaultValue={currentUser?.name.split(" ")[1]}
                name="name"
                // onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 items-center">
              <label className="text-lg">Email</label>
              <input
                type="text"
                className="p-2  bg-gray-100 rounded focus:bg-white focus:border outline-none focus:border-gray-100"
                defaultValue={currentUser?.email}
                name="email"
                // onChange={handleChange}
              />
            </div>
            {/* <div className="grid grid-cols-2 items-center">
              <label className="text-lg">Phone Number</label>
              <input
                type="numbers"
                className="p-2 bg-gray-100 rounded focus:bg-white focus:border outline-none focus:border-gray-100"
                // defaultValue={updatedData?.phone}
                name="phone"
                // onChange={handleChange}
              />
            </div> */}

            <div className="flex justify-end">
              <Button title="Update profile" />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
