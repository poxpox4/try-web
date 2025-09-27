import React from "react";
import {useState} from "react"
import { Link } from "react-router-dom";
function Navbar() {
  const [openmenu,setMenu] = useState(false);
  const [openmenumobile,setOpenmenumobile] = useState(false);
  function toggle(){
    setMenu(!openmenu)
  }
  function Clickmenu(){
    setOpenmenumobile(!openmenumobile)
  }
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex items-center justify-between">
        {/* <div className="text-white text-2xl font-bold">NUMER NICAL</div> */}
        <Link to="/" className="text-white font-bold text-3xl">Numer Nical</Link>
        <div className="md:hidden">
          {/*toggle menu*/}
          <button id="menu-toggle" className="text-white" onClick={toggle}>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" 
            strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-4">
          <li className="relative group"><a href="#" className="text-white" >ROOT OF EQUATION</a>
          {/*drop down */}
            <ul className="absolute hidden group-hover:block bg-gray-900 left-0 ofset-0">
              <li className="hover:bg-cyan-400 px-4">
                <Link to="/graphical" className="text-white block">Graphical Method</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 ">
                {/*link to bisection page*/}
                <Link to="/bisection" className="text-white block">Bisection</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2">
                {/*link falseposition page */}
                <Link to="/falseposition" className="text-white block">False Position</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2">
                <Link to="/newton-raphson" className="text-white">Newton Raphson</Link>
              </li>
            </ul>
          </li>
          <li><a href="#" className="text-white">LINEAR</a></li>
        </ul>
      </div>
      {/*แสดงเมนูmobile*/}
        {/* {openmenu ?  (
          <ul className="flex-col md:flex">
            <li className="py-2"><a href="#" className="text-white">ROOT OF EQUATION</a></li>
            <li className="py-2"><a href="#" className="text-white">LINEAR</a></li>
          </ul>
        ) : null} */}
        {openmenu ? (
        <ul className="flex flex-col md:flex py-2">
          <li>
            <button onClick={Clickmenu} className="text-white text-left py-2">ROOT OF EQUATION</button>
            {openmenumobile ? (
              <ul className="bg-gray-900">
                <li className="hover:bg-cyan-400 px-4 py-2">
                  <Link to="/graphical" className="text-white">Graphical Method</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2">
                  <Link to="/bisection" className="text-white">Bisection</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2">
                  <Link to="/falseposition" className="text-white">False Position</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2">
                  <Link to="/newton-raphson" className="text-white">Newton Raphson</Link>
                </li>
              </ul>
            ) : null}
          </li>
          <li>
            <button onClick={Clickmenu} className="text-white text-left py-2">Linear</button>
          </li>
          
        </ul>
        ) : null}
    </nav>
  )
}
export default Navbar;
