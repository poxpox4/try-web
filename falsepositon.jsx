import { useState } from "react";
import { evaluate } from "mathjs";
import Plot from "react-plotly.js";
function Falseposition(){
    const [fx,setFx] = useState("");
    const [xl,setXl] = useState("");
    const [xr,setXr] = useState("");
    //const [x1,setX1] = useState("");
    const [error,setError] = useState("");
    const [result,setResult] = useState(null);
    const [iteration,setIteration] = useState([]);
    function Calculate(){
        try{
            const variablematch = fx.match(/[a-zA-Z]/);
            const variable = variablematch ? variablematch[0] : "x";
            let xlcal = parseFloat(xl);
            let xrcal = parseFloat(xr);
            const agree = parseFloat(error);
            let fxl = evaluate(fx,{[variable]:xlcal});
            let fxr = evaluate(fx,{[variable]:xrcal});
            let x1 = (fxr*xlcal-fxl*xrcal)/(fxr-fxl);
            let fx1 = evaluate(fx,{[variable]:x1});
            let x1old = 0;
            //let errorcal = 0;
            const resultarr = [];
            //x1old = x1; //x0รอบgiven
            do{
                
                let errorcal = Math.abs((x1-x1old)/x1);
                resultarr.push({
                    xl: xlcal,
                    xr: xrcal,
                    fxl,fxr,x1,fx1,error:errorcal,
                })
                x1old = x1;
                if(fxl*fx1>0){
                    xlcal = x1;
                }
                else{
                    xrcal = x1;
                }
                
                fxl = evaluate(fx,{[variable]:xlcal});
                fxr = evaluate(fx,{[variable]:xrcal});
                x1  = (fxr*xlcal-fxl*xrcal)/(fxr-fxl);
                fx1 = evaluate(fx,{[variable]:x1});
                //errorcal = Math.abs((x1-x1old)/x1);
            }while(Math.abs((x1-x1old)/x1)>agree&&Math.abs(fx1)>agree);
            setResult(x1);
            setIteration(resultarr);
        }
        catch{
            alert("สมการผิด");
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <h1 className="font-bold text-3xl">False Position</h1>
            <div>
                <label className="block text-left">f(X)</label>
                <input type="text" 
                placeholder="f(X)"
                className="border px-2 py-1 rounded"
                value={fx}
                onChange={(e) => setFx(e.target.value)}/>
            </div>
            <div>
                <label className="block text-left">XL</label>
                <input type="text" 
                placeholder="XL"
                className="border px-2 py-1 rounded"
                value={xl}
                onChange={(e) => setXl(e.target.value)}/>
            </div>
            <div>
                <label className="block text-left">XR</label>
                <input type="text" 
                placeholder="XR"
                className="border px-2 py-1 rounded"
                value={xr}
                onChange={(e) => setXr(e.target.value)}/>
            </div>
            <div>
                <label className="block text-left">ERROR</label>
                <input type="text" 
                placeholder="ERROR"
                className="border px-2 py-1 rounded"
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
                            <th className="border px-2 py-1">f(XL)</th>
                            <th className="border px-2 py-1">f(XR)</th>
                            <th className="border px-2 py-1">X1</th>
                            <th className="border px-2 py-1">f(X1)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {iteration.map((item,index) => (
                            <tr key={index}>
                                <td className="border px-2 py-1">{index+1}</td>
                                <td className="border px-2 py-1">{item.xl.toFixed(6)}</td>
                                <td className="border px-2 py-1">{item.xr.toFixed(6)}</td>
                                <td className="border px-2 py-1">{item.fxl.toFixed(6)}</td>
                                <td className="border px-2 py-1">{item.fxr.toFixed(6)}</td>
                                <td className="border px-2 py-1">{item.x1.toFixed(6)}</td>
                                <td className="border px-2 py-1">{item.fx1.toFixed(6)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Plot useResizeHandler={true} 
                data={[
                    {
                        //x: iteration.map((item) => item.x1),
                        //y: iteration.map((item) => item.fx1),
                        x: iteration.map((item,index) => index+1),
                        y: iteration.map((item) => item.error),
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "black" },
                        line: {color: "gray"},
                        //name: "X1 Iterations",
                    }
                ]}
                layout={{
                    width: 800,
                    height: 500,
                    title:{text: "Graph Falseposition"},
                    xaxis: { title: { text: "X" } },
                    yaxis: { title: { text: "f(X)" } },
                    
                }}
            />
        </div>
    )
}
export default Falseposition;