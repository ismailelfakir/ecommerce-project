import React from "react";

const PasswordChangedConfirmationSeller = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-green-200 p-2 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h1 className="block text-2xl font-bold text-gray-800">Password Changed Successfully</h1>
            <p className="mt-2 text-sm text-gray-600">Your password has been successfully changed.</p>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Check your email for confirmation and further instructions. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangedConfirmationSeller;
