// import {useState} from "react"
// import { evaluate } from "mathjs";
// import Plot from "react-plotly.js";
// import { generateGraphData } from "../graph/graph-bisection";
// function Bisection(){
//     const [fx,setFx] = useState("")
//     const [xl,setXl] = useState("")
//     const [xr,setXr] = useState("")
//     const [error,setError] = useState("")
//     const [iteration,setIteration] = useState([])
//     // const [xm,setXm] = useState(null)
//     // const [fxm,setFxm] = useState(null)
//     // const [fxl,setFxl] = useState(null)
//     const [result,setResult] = useState(null)
//     const [graphData, setGraphData] = useState(null)
//     function Calculate(){
//         try{
//             {/*แปลงสมการ \dจับตัวเลข (x)จับx */}
//             const equation = fx.replace(/(\d)(x)/g,"$1*$2")
//             {/*letเปลี่ยนค่า */}{/*parseFloat แปลง string → ตัวเลข แบบทศนิยม */}
//             let xl1 = parseFloat(xl)
//             let xr1 = parseFloat(xr)
//             let agree = parseFloat(error)
//             let xmold = 0
//             const resultarr = []
//             {/*หาxm */}
//             let xmnew = (xl1+xr1)/2
//             // let error = 1
//             do{
//                 {/*หาf(xl),f(xm) */}{/*equationคือสมการที่กรอกมา .replace แปลงค่าxเปนตัวเลข /x/gหาทุกตัวx gคือglobal */}
//                 {/*evaluate คำนวณสมการที่เป็น string คืนค่าเปนตัวเลข*/}
//                 const fxl = evaluate(equation.replace(/x/g,xl1))
//                 const fxm = evaluate(equation.replace(/x/g,xmnew))
//                 resultarr.push({
//                     xl: xl1,
//                     xr: xr1,
//                     xm: xmnew,
//                     fxl,fxm
//                 })
//                 if(fxl*fxm>0){
//                     xl1 = xmnew
//                 }
//                 else{
//                     xr1 = xmnew
//                 }
//                 xmold = xmnew
//                 xmnew = (xl1+xr1)/2
//                 // error = Math.abs((xmnew-xmold)/xmnew)
                
//             }while(Math.abs((xmnew-xmold)/xmnew)>agree);
//                 setIteration(resultarr)
//                 setResult(xmnew)
//                 const { x, y } = generateGraphData(equation, xr1, xl1); // สร้าง curve
//                 const xmPoints = resultarr.map(r => r.xm); // จุด XM
//                 const fxmPoints = resultarr.map(r => r.fxm); // f(XM)

//                 setGraphData({
//                     xCurve: x,
//                     yCurve: y,
//                     xXM: xmPoints,
//                     yXM: fxmPoints
//                 });

//         }
//         catch(error){
//             alert("Invalid equation or numbers")
//         }
//     }
//     return(
//         <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 ">
//             <h1 className="text-2xl font-bold ">Bisection</h1>
//             {/*กล่องข้อความ*/}
//             <div >  {/*label ข้อความบนกล่อง */} 
//                 <label className="block text-left">f(x)</label>
//            {/*ป้อนinput onChange ทำงาน → setFx(e.target.value) เปลี่ยนค่าfx ผ่าน value={fx}*/}
//                     <input type="text"
//                     placeholder="f(x)"
//                     className="border px-2 py-1 rounded"
//                     value={fx} 
//                     onChange={(e) => setFx(e.target.value)}/>   
//             </div>
//             <div>
//                 <label className="block text-left">XL</label>
//                     <input type="text" 
//                     placeholder="x1"
//                     className="border px-2 py-1 rounded"
//                     value={xl}
//                     onChange={(e) => setXl(e.target.value)}/>
//             </div>
//             <div>
//                 <label className="block text-left">XR</label>
//                     <input type="text" 
//                     placeholder="x2"
//                     className="border px-2 py-1 rounded"
//                     value={xr}
//                     onChange={(e) => setXr(e.target.value)}/>
//             </div>
//             <div>
//                 <label className="block text-left">Error</label>
//                     <input type="text" 
//                     placeholder="Error"
//                     className="border px-2 py-1 rounded"
//                     value={error}
//                     onChange={(e) => setError(e.target.value)}/>
//             </div>
//             {/*ข้อความปกติ */}
//             <button onClick={Calculate} className="bg-blue-500 text-white px-4 py-2 rounded">Calculate</button>
//             {result !== null && (
//                 <div className="labelline">Result is : {result.toFixed(6)}</div>
//             )}
//             {iteration.length > 0 &&(
//                 <table className="border-collapse border border-gray-400 w-full">
// {/*theadส่วนหัวcolumn*/}<thead>
//                         <tr>
// {/*th หัวcolumn */}          <th className="bordor px-2 py-1">Iteration</th>
//                             <th className="bordor px-2 py-1">XL</th>
//                             <th className="bordor px-2 py-1">XR</th>
//                             <th className="bordor px-2 py-1">XM</th>
//                             <th className="bordor px-2 py-1">f(XL)</th>
//                             <th className="bordor px-2 py-1">f(XM)</th>
//                         </tr>
//                     </thead>{/*.map() เพื่อวนซ้ำข้อมูลของแต่ละรอบในอาเรย์ iteration */}   {/*<tr key={index}>*/}{/*<td>{item.xl.toFixed(6)}</td> แสดงค่าของ xl ปัดทศนิยม 6 ตำแหน่ง */}
// {/*tbodyเนื้อหาของตาราง*/}<tbody>
                        //{/*tr = table row , td = table data */}
//                         {iteration.map((item,index) =>(
//                             <tr key={index}>
//                                 <td className="border px-2 py-1">{index + 1}</td>
//                                 <td className="border px-2 py-1">{item.xl.toFixed(6)}</td>
//                                 <td className="border px-2 py-1">{item.xr.toFixed(6)}</td>
//                                 <td className="border px-2 py-1">{item.xm.toFixed(6)}</td>
//                                 <td className="border px-2 py-1">{item.fxl.toFixed(6)}</td>
//                                 <td className="border px-2 py-1">{item.fxm.toFixed(6)}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
                
//             )}
//             {graphData && (
//                 <Plot
//                     data={[
//                     {
//                         x: graphData.xCurve,
//                         y: graphData.yCurve,
//                         type: "scatter",
//                         mode: "lines",
//                         name: "f(x)",
//                         marker: {color:"blue"}
//                     },
//                     {
//                         x: graphData.xXM,
//                         y: graphData.yXM,
//                         type: "scatter",
//                         mode: "markers+lines",
//                         name: "XM"
//                     }
//                     ]}
//                     layout={{ width: 700, height: 400, title: "Bisection Method" }}/>
//             )}

            
//         </div>
//     )
// }
// export default Bisection

import { useState } from "react";
import {evaluate} from "mathjs";
import Plot from 'react-plotly.js';
function Bisection(){
    const [fx,setFx] = useState("");
    const [xl,setXl] = useState("");
    const [xr,setXr] = useState("");
    const [error,setError] = useState("");
    const [result,setResult] = useState(null);
    const [iteration,setIteration] = useState([]);
    function Calculate(){
        try{
            const variablematch = fx.match(/[a-zA-Z]+/g);
            const variable = variablematch ? variablematch[0] : "x";
            //const variable = variablematch ? variablematch[variablematch.length - 1] : "x";
            let xlcal = parseFloat(xl);
            let xrcal = parseFloat(xr);
            let agree = parseFloat(error);
            let xmnew = (xlcal+xrcal)/2;
            let xmold = 0;
            //const fxmnew = evaluate(fx,{[variable]:xmnew});
            const resultarr = [];
            do{
                const fxl = evaluate(fx,{[variable]:xlcal});
                const fxm = evaluate(fx,{[variable]:xmnew});
                let errorcal = Math.abs((xmnew-xmold)/xmnew)
                resultarr.push({
                    xl: xlcal,
                    xr: xrcal,
                    xm: xmnew,
                    fxl,fxm,error:errorcal,
                })
                if(fxl*fxm>0){
                    xlcal = xmnew;
                }
                else{
                    xrcal = xmnew;
                }
                xmold = xmnew;
                xmnew = (xlcal+xrcal)/2;
            }while(Math.abs((xmnew-xmold)/xmnew)>agree&&Math.abs(evaluate(fx,{[variable]:xmnew}))>agree);
            setIteration(resultarr);
            setResult(xmnew);
        }
        catch{
            alert("สมการผิด");
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 ">
            <h1 className="font-bold text-3xl">Bisection</h1>
            <div>
                <label className="block text-left">f(X)</label>
                <input type="text" 
                placeholder="f(X)"
                className="border rounded px-2 py-1"
                value={fx}
                onChange={(e) => setFx(e.target.value)}/>
            </div>
            <div>
                <label className="block text-left">XL</label>
                <input type="text" 
                placeholder="XL"
                className="border rounded px-2 py-1"
                value={xl}
                onChange={(e) => setXl(e.target.value)}/>
            </div>
            <div>
                <label className="block text-left">XR</label>
                <input type="text" 
                placeholder="XR"
                className="border rounded px-2 py-1"
                value={xr}
                onChange={(e) => setXr(e.target.value)}/>
            </div>
            <div>
                <label className="block text-left">ERROR</label>
                <input type="text" 
                placeholder="ERROR"
                className="border rounded px-2 py-1"
                value={error}
                onChange={(e) => setError(e.target.value)}/>
            </div>
            <button onClick={Calculate} className="bg-blue-500 px-4 py-2 rounded text-white">Calculate</button>
            {result !== null &&(
                <div className="text-xl">Result is : {result.toFixed(6)}</div>
            )}
            {iteration.length > 0 &&(
                <table className="border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr>
                            <th className="border px-2 py-1">ITERATION</th>
                            <th className="border px-2 py-1">XL</th>
                            <th className="border px-2 py-1">XR</th>
                            <th className="border px-2 py-1">XM</th>
                            <th className="border px-2 py-1">f(XL)</th>
                            <th className="border px-2 py-1">f(XM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {iteration.map((item,index) =>( 
                            <tr key={index}>
                                <td className="border px-2 py-1 text-center">{index+1}</td>
                                <td className="border px-2 py-1 text-center">{item.xl.toFixed(6)}</td>
                                <td className="border px-2 py-1 text-center">{item.xr.toFixed(6)}</td>
                                <td className="border px-2 py-1 text-center">{item.xm.toFixed(6)}</td>
                                <td className="border px-2 py-1 text-center">{item.fxl.toFixed(6)}</td>
                                <td className="border px-2 py-1 text-center">{item.fxm.toFixed(6)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
           <Plot useResizeHandler={true} 
                 data={[
                   {
                     //x: iteration.map((item) => item.xm),
                     //y: iteration.map((item) => item.fxm),
                     x: iteration.map((item,index) => index+1),
                     y: iteration.map((item) => item.error),
                     type: "scatter",
                     mode: "lines+markers",
                     marker: { color: "black" },
                     line: {color: "gray"},
                     //name: "XM Iterations"
                   }
               
                 ]}
                 layout={{
                    width: 800,
                    height: 500,
                    title: {text:"Graph Bisection"},
                    xaxis: { title: { text: "X" } },
                    yaxis: { title: { text: "f(X)" } },
                //    className: "w-full",
                 }}
               />
        </div>
        
    )
}
export default Bisection;