import { useState } from "react";
import { evaluate,derivative } from "mathjs";
import Plot from "react-plotly.js";
function Newton(){
    const [fx,setFx] = useState("");
    const [x0,setX0] = useState("");
    const [error,setError] = useState("");
    const [result,setResult] = useState(null);
    const [iteration,setIteration] = useState([]);
    function Calculate(){
      try{
        const variablematch = fx.match(/[a-zA-Z]+/g);
        //const variable = variablematch.length > 0 ? variablematch[0]: "x";
        //const variable = variablematch ? variablematch[0] : "x";
        const variable = variablematch ? variablematch[variablematch.length - 1] : "x";
        let fdif = derivative(fx,variable).toString();
        let x0cal = parseFloat(x0);
        let agree = parseFloat(error);
        let x0old = 0;
        let x1 = 0;
        const resultarr = [];
        do{
          
          x0old = x0cal;
          let fxx = evaluate(fx,{[variable]:x0cal});
          let fprime = evaluate(fdif,{[variable]:x0cal});
          
          if(fprime==0){
            alert("หาร 0 ไม่ได้");
            return;
          }
          x1 = x0cal - ((fxx)/(fprime));
          let errorcal = Math.abs((x1-x0old)/x1);
          resultarr.push({
            x0:x0cal,
            x1,fxx,fprime,error:errorcal
          })
          
          x0cal = x1;
          if (resultarr.length > 100) {
            alert("ทำงานเยอะเกิน ใส่ X start ใหม่");
            return;
          }
        }while(Math.abs((x1-x0old)/x1)>agree);
        setResult(x1);
        setIteration(resultarr);
      }
      catch{
        alert("สมการผิด");
      }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="font-bold text-3xl">Newton Raphson</h1>
      <div>
        <label className="block text-left">f(X)</label>
        <input type="text" 
        placeholder="f(X)"
        className="border px-2 py-1 rounded"
        value={fx}
        onChange={(e) => setFx(e.target.value)}/>
      </div>
      <div>
        <label className="block text-left">X Start</label>
        <input type="text" 
        placeholder="X Start"
        className="border px-2 py-1 rounded"
        value={x0}
        onChange={(e) => setX0(e.target.value)}/>
      </div>
      <div>
        <label className="block text-left">ERROR</label>
        <input type="text" 
        placeholder="ERROR"
        className="border px-2 py-1 rounded"
        value={error}
        onChange={(e) => setError(e.target.value)}/>
      </div>
      <button onClick={Calculate} className="bg-blue-500 px-4 py-2 text-white rounded">Calculate</button>
      {result!==null &&(
        <div className="text-xl">Result is : {result.toFixed(6)}</div>
      )}
      {iteration.length > 0 &&(
        <table className="border border-collapse border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border px-2 py-1">ITERATION</th>
              <th className="border px-2 py-1">X start</th>
              <th className="border px-2 py-1">X next</th>
              <th className="border px-2 py-1">f(x)</th>
              <th className="border px-2 py-1">f'(x)</th>
            </tr>
          </thead>
            <tbody>
              {iteration.map((item,index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{index+1}</td>
                  <td className="border px-2 py-1">{item.x0.toFixed(6)}</td>
                  <td className="border px-2 py-1">{item.x1.toFixed(6)}</td>
                  <td className="border px-2 py-1">{item.fxx.toFixed(6)}</td>
                  <td className="border px-2 py-1">{item.fprime.toFixed(6)}</td>
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
            //x: iteration.map((item) => item.x1),
            //y: iteration.map((item) => item.fxx),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "black"},
            line: {color: "gray"},
          }
        ]}
        layout={{
          width: 800,
          height: 500,
          title: {text: "Graph Newton-raphson"},
          xaxis: {title:{text:"X"}},
          yaxis: {title:{text:"f(X)"}},
        }}
      />
    </div>
  )
}
export default Newton;