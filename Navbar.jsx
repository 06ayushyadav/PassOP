import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-slate-600  text-white">
            <div className="mycontainer flex justify-between items-center  px-4 py-2 ">
            <div className="logo font-bold text-2xl">
                <span className="text-green-500">&lt;</span>
                Pass
                <span className="text-green-500">OP/&gt;</span>
                </div>
            {/* <ul className="unorder">
                <li className="list flex gap-4">
                    <a className="hover:bg-slate-400 hover:font-bold" href="/">Home</a>
                    <a className="hover:bg-slate-400 hover:font-bold " href="/About">About</a>
                    <a className="hover:bg-slate-400 hover:font-bold" href="/Contact">Contact</a>
                </li>
            </ul> */}
            <button className=" bg-slate-400 rounded-full flex justify-center items-center px-1  ">
                <img className="w-10 p-1" src="/public/github.svg" alt="github" />
                <span  >GitHub</span>
            </button>
            </div>
        </nav>
    )
}

export default Navbar