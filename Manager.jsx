import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([]);


    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords();

    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length) {

            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id:form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            // localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
        }
        else {
            alert("add minimum 3 later ")
        }
    }

    const deletePassword = async (id) => {
        console.log("Delete password")
        let c = confirm("Do you really want to delete this")
        if (c) {
              setPasswordArray(passwordArray.filter(item => item.id !== id))
            //setPasswordArray([...passwordArray,form])
            //   localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id }) })
        }
        // console.log([...passwordArray,form])
    }

    const editPassword = (id) => {
        console.log("Editing password")
        setForm({...passwordArray.filter(i => i.id === id)[0],id:id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const copyText = (text) => {
        toast("Copy to clipboard", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        navigator.clipboard.writeText(text)

    }


    return (

        <>
            <ToastContainer
                position="top-right"      // Notification ke screen par position
                autoClose={5000}          // Notification kitni der tak rahega (milliseconds mein)
                hideProgressBar={false}    // Progress bar ko show/hide karne ke liye
                newestOnTop={false}        // Naye notifications ko top par dikhane ke liye
                closeOnClick               // Notification click karne par close ho jaye
                rtl={false}                // Right-to-left alignment ke liye
                pauseOnHover               // Hover karne par notification pause ho
                draggable                  // Notification ko drag kar sakte hain
            />


            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-200 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

            <div className=" bg-slate-550 md:p-2 md:mycontainer p-2  ">

                <h1 className="font-bold text-2xl text-center"><span className="text-green-500 ">&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </h1>

                <p className="text-red-500 text-center text-xl">Your Website link ,Username and Password Manager</p>

                <div className="input1 flex  flex-col p-4 gap-10 items-center">
              
                    <input value={form.site} onChange={handleChange} className="rounded-full  w-full bg-pink-100 border-green-500 border-spacing-1 text-xl px-4 py-1"
                        type="text" name="site" placeholder="Enter Website URL" />

                    <div className="input2 w-1/2 flex justify-center gap-5">

                        <input vlaue={form.username} onChange={handleChange} className="rounded-full w-full border-green-500 text-xl px-4 py-1 " type="text" placeholder="Enter Username" name="username" />

                        <span>

                            <input vlaue={form.password} onChange={handleChange} className="rounded-full w-full border-green-500 text-xl px-4 py-1 " type="password" placeholder="Enter Password" name="password" />
                        </span>

                    </div>


                    <button onClick={savePassword} className="flex justify-center items-center bg-cyan-300 rounded-full w-fit gap-2 border-2 border-green-500 px-8 py-1 hover:bg-cyan-200  ">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save</button>
                </div>
                <div>

                </div>

                <div className="password">
                    <h2 className="text-purple-600 text-center text-2xl py-4">Your Passwords Details</h2>
                    {passwordArray.length === 0 && <div>No Password To Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full border-2 border-black rounded-md overflow-hidden">
                        <thead className="py-2 bg-green-700 text-white">
                            <tr>
        
                                <th className="py-2">Site</th>
                                <th className="py-2">Username</th>
                                <th className="py-2">Password</th>
                                <th className="py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-green-350 border-2 border-black mb-4">
                            {passwordArray.map((item) => {
                                return <tr>
            
                                    <td className="py-2 text-center max-w-32 border-2 border-green-500 ">
                                        <div className="flex justify-center items-center gap-2">
                                            <a href={item.site} target="_blank"><span>{item.site} </span> </a>
                                            <div className="lordicon size-7 cursor-pointer " onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/oqdmuxru.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>

                                        </div>
                                    </td>

                                    <td className="py-2 text-center max-w-32 border-2 border-green-500">
                                        <div className="flex justify-center items-center gap-2">
                                            <span> {item.username}</span>
                                            <div className="lordicon size-7 cursor-pointer " onClick={() => { copyText(item.username) }} >
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/oqdmuxru.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 text-center max-w-32 border-2 border-green-500">
                                        <div className="flex justify-center items-center gap-2">
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className="lordicon size-7 cursor-pointer" onClick={() => { copyText(item.password) }} >
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/oqdmuxru.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 text-center max-w-32 border-2 border-green-500">
                                        <span className="cursor-pointer m-2" onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/becebamh.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className="cursor-pointer m-2" onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                       
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                    }
                </div>


            </div>

        </>

    )
}
export default Manager