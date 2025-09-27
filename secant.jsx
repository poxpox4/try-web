import { useState } from "react";
import { evaluate } from "mathjs";
import Plot from "react-plotly.js";
function Secant(){
    const [fx,setFx] = useState("");
    const [x0,setX0] = useState("");
    const [x1,setX1] = useState("");
    const [error,setError] = useState("");
    const [result,setResult] = useState(null);
    const [iteration,setIteration] = useState([]);
    function Calculate(){
        try{
            const variablematch = fx.match(/[a-zA-Z]+/g);
            const variable = variablematch ? variablematch[variablematch.length-1] : "x";
            //const variable = variablematch ? variablematch[0] : "x";
            let x0cal = parseFloat(x0);
            let x1cal = parseFloat(x1);
            let agree = parseFloat(error);
            let x2cal = 0;
            let errorcal = 0;
            const resultarr = [];
            do{
                let fx0 = evaluate(fx,{[variable]:x0cal});
                let fx1 = evaluate(fx,{[variable]:x1cal});
                x2cal = x1cal-(fx1*(x0cal-x1cal))/(fx0-fx1);
                errorcal = Math.abs((x2cal-x1cal)/x2cal);
                resultarr.push({
                    x0:x0cal,
                    x1:x1cal,
                    fx0,fx1,
                    error:errorcal,
                })
                x0cal = x1cal;
                x1cal = x2cal;
            }while(errorcal>agree);
            setResult(x2cal);
            setIteration(resultarr);
        }
        catch{
            alert("สมการผิด");
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <h1 className="font-bold text-3xl">Secant Method</h1>
            <div>
                <label className="block">f(X)</label>
                <input type="text"
                placeholder="f(X)" 
                className="border px-2 py-1 rounded"
                value={fx}
                onChange={(e) => setFx(e.target.value)}/>
            </div>
            <div>
                <label className="block">X Start</label>
                <input type="text"
                placeholder="X Start" 
                className="border px-2 py-1 rounded"
                value={x0}
                onChange={(e) => setX0(e.target.value)}/>
            </div>
            <div>
                <label className="block">X Next</label>
                <input type="text"
                placeholder="X Next" 
                className="border px-2 py-1 rounded"
                value={x1}
                onChange={(e) => setX1(e.target.value)}/>
            </div>
            <div>
                <label className="block">ERROR</label>
                <input type="text" 
                placeholder="ERROR"
                className="border px-2 py-1 rounded"
                value={error}
                onChange={(e) => setError(e.target.value)}/>
            </div>
            <button onClick={Calculate} className="bg-blue-500 px-4 py-2 rounded text-white">Calculate</button>
            {result!==null &&(
                <div className="text-xl">Result is : {result.toFixed(6)}</div>
            )}
            {iteration.length >0 &&(
                <table className="border border-collapse border-gray-400 w-full">
                    <thead>
                        <tr>
                            <th className="border px-2 py-1">ITERATION</th>
                            <th className="border px-2 py-1">X Start</th>
                            <th className="border px-2 py-1">X Next</th>
                            <th className="border px-2 py-1">f(X Start)</th>
                            <th className="border px-2 py-1">f(X Next)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {iteration.map((item,index) => (
                        
                            <tr key={index}>
                                <td className="border px-2 py-1">{index+1}</td>
                                <td className="border px-2 py-1">{item.x0.toFixed(6)}</td>
                                <td className="border px-2 py-1">{item.x1.toFixed(6)}</td>
                                <td className="border px-2 py-1">{item.fx0.toFixed(6)}</td>
                                <td className="border px-2 py-1">{item.fx1.toFixed(6)}</td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            )}
            <Plot useResizeHandler={true}
                data={[
                    {
                        x: iteration.map((item,index) => index+1),
                        y: iteration.map((item) => item.error),
                        type: "scatter",
                        mode: "lines+markers",
                        marker: {color: "black"},
                        line: {color: "gray"}
                    }
                ]}
                layout={{
                    width: 800,
                    height: 500,
                    title: {text: "Graph Secant Method"},
                    xaxis: {title:{text:"X"}},
                    yaxis: {title:{text:"f(X)"}},
                }}
            />
        </div>
    )
}
export default Secant;