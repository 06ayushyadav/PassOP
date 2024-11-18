import React from "react";

const Footer = () => {
    return (
        <>
            <div className=" text-white bg-slate-700 fixed bottom-0 w-full ">
                <div className=" text-white bg-slate-700 flex justify-center">
                    <div className="logo font-bold text-2xl">
                        <span className="text-green-500">&lt;</span>
                        Pass
                        <span className="text-green-500">OP/&gt;</span>


                    </div>
                </div>
                <div className="text-base  flex justify-center">
                    Created By Ayush
                {/* <span className="flex justify-start p-1 font-bold ">
                  <p>Copywright &copy; 2024</p> 
                </span> */}
                </div>

            </div>
        </>
    )
}

export default Footer