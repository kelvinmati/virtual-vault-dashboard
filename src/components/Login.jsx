import React, { useState, useEffect } from "react";
import Button from "../../src/utils/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions.js/auth";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [buttonLoading, setButtonLoading] = useState(false);
  const error = useSelector((state) => state?.error);
  const auth = useSelector((state) => state?.auth?.isAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    shouldFocusError: true,
  });
  // handleSubmit
  const onSubmit = (data) => {
    setButtonLoading(true);
    dispatch(userLogin(data));
    // console.log(data);
  };
  // control button loading
  useEffect(() => {
    if (error?.typeId === "REGISTER_USER_FAIL") {
      setButtonLoading(false);
    } else {
      setButtonLoading(false);
    }
  }, [error]);
  // redirect to home page
  useEffect(() => {
    if (auth) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [auth]);
  return (
    <div className="bg-mainBlue h-screen flex justify-center items-center">
      <div className="bg-white w-[450px] space-y-4 p-7 rounded-lg">
        <div className="flex flex-col justify-center items-center pb-7">
          <p className="w-16 h-16  flex justify-center items-center text-white rounded-full font-bold text-5xl bg-mainBlue">
            V
          </p>
          <h2 className="text-mainRed font-bold text-xl">
            VIRTUAL VAULT LOGIN
          </h2>
        </div>
        <form
          className="flex flex-col space-y-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <p>Email</p>
            <input
              type="text"
              className="p-2 w-full border rounded focus:border-mainBlue outline-none"
              {...register("email", {
                required: "Email address is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
                shouldFocus: true,
              })}
            />
            <p className="text-mainRed">{errors?.email?.message}</p>
          </div>
          <div>
            <p>password</p>
            <input
              type="password"
              className="p-2 w-full border rounded focus:border-mainBlue outline-none"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Password should be atleast 8 characters",
                },
              })}
            />
            <p className="text-mainRed">{errors?.password?.message}</p>

            <p className="text-end my-2 text-mainRed">Forgot password</p>
          </div>
          <div>
            <Button width="full" title="Login" loading={buttonLoading} />
          </div>
          <div>
            <p>
              I don't have an account.{" "}
              <Link to="/register">
                <span className="text-mainRed">Register</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
