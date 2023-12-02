import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import OAuthSignup from "../../firebase/authentication/OAuthSignup";

const Singup = () => {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("fname", fname);
    newForm.append("lname", lname);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post(`${server}/user/create-user-cloud`, newForm, config)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setFname("");
          setLname("");
          setEmail("");
          setPassword("");
          setAvatar();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6 dark:text-gray-300 dark:bg-gray-800" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              ></label>
              <div className="mt-2 flex items-center flex-col">
                <span className="inline-block h-10 w-10 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-600"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="fname"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="fname"
                  autoComplete="first-name"
                  required
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lname"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lname"
                  autoComplete="last-name"
                  required
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"                />
                {visible ? (
                  <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer dark:text-gray-400 dark:hover:text-gray-100"
                  size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                  className="absolute right-2 top-2 cursor-pointer dark:text-gray-400 dark:hover:text-gray-100"
                  size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign up
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4 className="dark:mr-2 dark:text-gray-400" >Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign in
              </Link>
            </div>
          </form>
          <div className="my-4 flex items-center">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
            <p className="mx-4 text-sm font-semibold text-gray-800 dark:text-gray-200">
              OR
            </p>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <OAuthSignup />
        </div>
      </div>
    </div>
  );
};

export default Singup;
