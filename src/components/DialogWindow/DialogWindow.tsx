import React from "react";
const DialogWindow = ({
  children,
  head,
  title,
  Image,
}: {
  children: React.ReactNode;
  head: string;
  title: string;
  Image?: React.ReactNode;
}) => {
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            {Image && Image}
            <h2 className="text-xl font-bold py-4 ">{head}</h2>
            <p className="text-md text-gray-500 px-8">
              {title}
            </p>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogWindow;
