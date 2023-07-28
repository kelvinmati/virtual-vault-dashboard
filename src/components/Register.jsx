import React, { useEffect, useState } from "react";
import Button from "../../src/utils/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { register } from "../redux/actions.js/auth";
import { registerUser } from "../redux/actions.js/auth";
const Register = () => {
  const dispatch = useDispatch();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    shouldFocusError: true,
  });
  const [buttonLoading, setButtonLoading] = useState(false);

  // handlesubmit
  const onSubmit = (data) => {
    setButtonLoading(true);
    dispatch(registerUser(data));

    // console.log(data);
  };
  //handle button loading
  const error = useSelector((state) => state?.error);
  console.log("error  is", error);
  useEffect(() => {
    if (error?.typeId === "REGISTER_USER_FAIL") {
      setButtonLoading(false);
    } else {
      setButtonLoading(false);
    }
  }, [error]);
  return (
    <div className="bg-mainBlue min-h-screen py-10 flex justify-center items-center">
      <div className="bg-white w-[700px] space-y-4 p-7 rounded-lg">
        <div className="flex flex-col justify-center items-center pb-3">
          <p className="w-16 h-16  flex justify-center items-center text-white rounded-full font-bold text-5xl bg-mainBlue">
            V
          </p>
          <h2 className="text-mainRed font-bold text-xl">
            CREATE VITUAL VAULT ACCOUNT
          </h2>
        </div>
        <form
          className="flex flex-col space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p>Firstname</p>
              <input
                type="text"
                className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                placeholder="John"
                {...register("firstname", {
                  required: "Firstname is required",
                })}
              />
              <p className="text-mainRed">{errors?.firstname?.message}</p>
            </div>
            <div>
              <p>Lastname</p>
              <input
                type="text"
                className="p-2 w-full border rounded focus:border-mainBlue outline-none"
                placeholder="Doe"
                {...register("lastname", {
                  required: "Lastname is required",
                })}
              />
              <p className="text-mainRed">{errors?.lastname?.message}</p>
            </div>
          </div>
          <div className="hidden">
            <input
              type="text"
              className="p-2 w-full border rounded focus:border-mainBlue outline-none"
              {...register("role", {
                required: false,
              })}
              defaultValue="admin"
            />
          </div>
          <div>
            <p>Email</p>
            <input
              type="email"
              className="p-2 w-full border rounded focus:border-mainBlue outline-none"
              placeholder="johndoe@gmail.com"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <p className="text-mainRed">{errors?.email?.message}</p>
          </div>
          <div>
            <p>Password</p>
            <input
              type="password"
              className="p-2 w-full border rounded focus:border-mainBlue outline-none"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <p className="text-mainRed">{errors?.password?.message}</p>
          </div>
          <div>
            <p>Shipping address</p>
            <input
              type="text"
              className="p-2 w-full border rounded focus:border-mainBlue outline-none"
              placeholder="example house ,4th floor,room 35"
              {...register("shippingAddress", {
                required: false,
              })}
            />
          </div>
          <div>
            <p>Contact number</p>
            <input
              type="text"
              className="p-2 w-full border rounded focus:border-mainBlue outline-none"
              placeholder="0712*****"
              {...register("contactNumber", {
                required: "Contact number is required",
              })}
            />
            <p className="text-mainRed">{errors?.contactNumber?.message}</p>
          </div>
          <div>
            <Button width="full" title="Register" loading={buttonLoading} />
          </div>
          <div>
            <p>
              I already have an account.{" "}
              <Link to="/login">
                <span className="text-mainRed">Login</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
