import {useState} from "react"
import { Link } from "react-router-dom";
function Navbar() {
  const [openmenu,setMenu] = useState(false);
  const [openmenumobileroot,setOpenmenumobileroot] = useState(false);
  const [openmenumobilelinear,setOpenmenumobilelinear] = useState(false);
  const [openmenumobileintrgration,setOpenmenumobileintegration] = useState(false);
  const [openmenumobileregression,setOpenmenumobileregression] = useState(false);
  function toggle(){
    setMenu(!openmenu)
  }
  function Clickmenuroot(){
    setOpenmenumobileroot(!openmenumobileroot)
  }
  function Clickmenulinear(){
    setOpenmenumobilelinear(!openmenumobilelinear);
  }
  // function Clickmenuregression(){
  //   setOpenmenumobile(!openmenumobile);
  // }
  function Clickmenuintegration(){
    setOpenmenumobileintegration(!openmenumobileintrgration);
  }
  function Clickmenuregression(){
    setOpenmenumobileregression(!openmenumobileregression);
  }
  return (
    <nav className="bg-blue-500 p-4 shadow-lg sticky top-0 z-50 w-full">
      <div className="p-3  flex justify-between items-center text-white">
        {/* <div className="text-white text-2xl font-bold">NUMER NICAL</div> */}
        <Link to="/" className=" font-bold text-3xl">Numerical</Link>
        <div className="md:hidden">
          {/*toggle menu*/}
          <button id="menu-toggle" className="text-white" onClick={toggle}>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" 
            strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-6">
          <li className="relative group">{/* <a href="#" className="text-white" >ROOT OF EQUATION</a> */} 
            <span className="cursor-pointer">Root of equation</span>
          {/*drop down */}
            <ul className="absolute hidden group-hover:block bg-gray-900 top-full left-0 rounded-lg">
              <li className="hover:bg-cyan-400 px-4 rounded-lg">
                <Link to="/graphical" >Graphical Method</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg ">
                {/*link to bisection page*/}
                <Link to="/bisection" >Bisection</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                {/*link falseposition page */}
                <Link to="/falseposition" >False Position</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/one_point" >One-point iteration</Link>
                </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/newton-raphson" >Newton Raphson</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/secant" >Secant Method</Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <span className="cursor-pointer">Linear algebra equation</span>
            <ul className="absolute hidden group-hover:block bg-gray-900 top-full left-0 rounded-lg">
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/carmer_rule" >Carmer's Rule</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/gauss_elimination" className="text-white">Gauss Elimination Method</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/gauss_jordan" className="text-white">Gauss Jordan Method</Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <span className="cursor-pointer">Least-Squares Regression</span>
            
            <ul className="absolute hidden group-hover:block bg-gray-900 top-full left-0 rounded-lg">
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/linear-regression" >Linear Regression</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/trapezoidal" >Polynomial Regression</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/trapezoidal" >Multiple Linear Regression</Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
          <span className="cursor-pointer">Integration</span>
            <ul className="absolute hidden group-hover:block bg-gray-900 top-full right-0 rounded-lg">
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/trapezoidal" >Trapezoidal Rule</Link>
              </li>
               <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/composite_trap" >Composite Trapezoidal Rule</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/simpson" >Simpson Rule</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/composite_simpson" >Composite Simpson Rule</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      {/*แสดงเมนูmobile*/}
        {openmenu ? (
        <ul className="flex flex-col md:flex py-2 text-white space-y-1">
          <li>
            <button onClick={Clickmenuroot} className=" text-left py-2">Root of equation</button>
            {openmenumobileroot ? (
              <ul className="bg-gray-900 rounded-lg">
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/graphical" >Graphical Method</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/bisection" >Bisection</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/falseposition" >False Position</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/one_point" >One-point iteration</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/newton-raphson" >Newton Raphson</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/secant" >Secant Method</Link>
                </li>
              </ul>
            ) : null}
          </li>
          <li>
            <button onClick={Clickmenulinear} className="text-white text-left py-2">Linear algebra equation</button>
            {openmenumobilelinear ? (
              <ul className="bg-gray-900 rounded-lg">
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/carmer_rule" className="text-white">Carmer Rule</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/gauss_elimination" className="text-white">Gauss Elimination Method</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/gauss_jordan" className="text-white">Gauss Jordan Method</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/matrix_invert" className="text-white">Matrix Inversion</Link>
                </li>
              </ul>
            ):null}
          </li>
          <li>
            <button onClick={Clickmenuregression} className="text-white py-2">Least-Squares Regression</button>
            {openmenumobileregression ?(
              <ul className="bg-gray-900 rounded-lg">
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/linear-regression" className="text-white">Linear Regression</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/" className="text-white">Polynomial Regression</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/" className="text-white">Multiple Linear Regression</Link>
                </li>
              </ul>
            ):null}
          </li>
          <li>
            <button onClick={Clickmenuintegration} className="text-white text-left py-2">Integration</button>
            {openmenumobileintrgration ? (
              <ul className="bg-gray-900 rounded-lg">
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/trapezoidal" className="text-white">Trapezoidal Rule</Link>
              </li>
               <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/composite_trap" className="text-white">Composite Trapezoidal Rule</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/simpson" className="text-white">Simpson Rule</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/composite_simpson" className="text-white">Composite Simpson Rule</Link>
              </li>
              </ul>
            ):null}
          </li>
          
          
        </ul>
        ) : null}
    </nav>
  )
}
export default Navbar;
