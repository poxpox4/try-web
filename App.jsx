import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/navbar";
import Graphical from "./page/graphical";
import Bisection from "./page/bisection";
import Falseposition from "./page/falsepositon";
import Newton from "./page/newton-raphson";
import "./index.css";
function App(){
  return (
    // <div>
    //   <Navbar/>
    //   <div className="flex items-center justify-center h-screen">
    //     <h1 className="text-3xl font-bold ">Welcome to Numer nical</h1>
    //   </div>
    // </div>
   <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="flex items-center justify-center h-screen">
          <h1 className="text-3xl font-bold">Welcome to Numer Nical</h1>
        </div>} />
        <Route path="/graphical" element={<Graphical/>}/>
        <Route path="/bisection" element={<Bisection />} />
        <Route path="/falseposition" element={<Falseposition/>} />
        <Route path="/newton-raphson" element={<Newton/>} />
      </Routes>
    </Router>
  );
}
export default App;