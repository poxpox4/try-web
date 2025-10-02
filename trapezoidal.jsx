import { useState } from "react";
import { evaluate } from "mathjs";
import Plot from "react-plotly.js";
import nerdamer from 'nerdamer';
import 'nerdamer/Calculus';
function Trapezoidal(){
    const [fx,setFx] = useState("");
    const [a,setA] = useState("");
    const [b,setB] = useState("");
    const [n,setN] = useState("");
    const [Ireal,setIreal] = useState(null);
    const [Ical,setIcal] = useState(null);
    const [result,setResult] = useState(null);
    const [iterationxi,setIterationxi] = useState([]);
    const [iterationyi,setIterationyi] = useState([]);
    const [xcurve,setXcurve] = useState([]);
    const [ycurve,setYcurve] = useState([]);
    const [graphtrapezoidal,setGraphtrapezoidal] = useState([]);
    function F(x,variable){
        const equation = evaluate(fx,{[variable]:x}); 
        return equation;
    }
    function CompositeTrapezoidal(a,b,n,variable){
        if(n<1){
            n=1;
        }
        if(b<a){
            alert("bต้องมากกว่าa");
        }
        const h = (b-a)/n;
        let sum = 0;
        // const xi = [];
        // const yi = [];
        for(let i=1;i<n;i++){
            sum += F(a+i*h,variable);
            // xi.push(sum);
            // yi.push(sum);
        }
        const I = (h/2)*(F(a,variable)+F(b,variable)+2*sum);
        return I;
    }
    function Calculate(){
        try{
            const variablematch = fx.match(/[a-zA-Z]+/g);
            const variable = variablematch ? variablematch[variablematch.length-1] : "x";
            const anum = parseFloat(a);
            const bnum = parseFloat(b);
            const nnum = parseFloat(n);
            const xcurve = [];
            const ycurve = [];
            for(let i=anum;i<=bnum;i += 0.01){
                //const val = F(i);
                xcurve.push(i);
                ycurve.push(F(i,variable));
            }
            setXcurve(xcurve);
            setYcurve(ycurve);
            const h = (bnum-anum)/nnum;
            const xi = [];
            const yi = [];
            for(let i=0;i<=nnum;i++){
                const xcal = anum+i*h;
                xi.push(xcal);
                yi.push(F(xcal,variable));
            }
            setIterationxi(xi);
            setIterationyi(yi);
            const trapezoid = xi.map((x,i)=>{
            if(i===0) return null;
                return {
                    x: [xi[i-1], xi[i], xi[i], xi[i-1]],
                    y: [0, 0, yi[i], yi[i-1]],
                    type: "scatter",
                    mode: "lines",
                    fill: "toself",
                    fillcolor: "rgba(0,100,200,0.3)",
                    line: { color: "blue" },
                };
            }).filter(Boolean);
            setGraphtrapezoidal(trapezoid);
            const Fx_integral = nerdamer.integrate(fx, variable).toString();
            const Fa = evaluate(Fx_integral,{[variable]:anum});
            const Fb = evaluate(Fx_integral,{[variable]:bnum});
            const I_real = Fb-Fa;
            //const I_real = parseFloat(Fb)-parseFloat(Fa);
            const I_cal = CompositeTrapezoidal(anum,bnum,nnum,variable);
            const error = ((I_real-I_cal)/I_real)*100;
            setIreal(I_real);
            setIcal(I_cal);
            setResult(error);
        }
        catch{
            alert("สมการผิด");
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <h1 className="font-bold text-3xl">Trapzoidal</h1>
            <h2 className="font-bold">Single And Composite</h2>
            <div>
                <label className="block">f(X)</label>
                <input type="text" 
                placeholder="f(X)"
                className="border px-2 py-1 rounded"
                value={fx}
                onChange={(e) => setFx(e.target.value)}/>
            </div>
            <div>
                <label className="block">a</label>
                <input type="text" 
                placeholder="a"
                className="border px-2 py-1 rounded"
                value={a}
                onChange={(e) => setA(e.target.value)}/>
            </div>
            <div>
                <label className="block">b</label>
                <input type="text"
                placeholder="b"
                className="border px-2 py-1 rounded" 
                value={b}
                onChange={(e) => setB(e.target.value)}/>
            </div>
            <div>
                <label className="block">n</label>
                <input type="text"
                placeholder="n"
                className="border px-2 py-1 rounded" 
                value={n}
                onChange={(e) => setN(e.target.value)}/>
            </div>
            <button onClick={Calculate} className="bg-blue-500 px-4 py-2 rounded text-white">Calculate</button>
            {Ireal!==null &&(
                <div className="text-xl">Result of I_real is : {Ireal.toFixed(6)}</div>
            )}
            {Ical!==null &&(
                <div className="text-xl">Result of I_cal is : {Ical.toFixed(6)}</div>
            )}
            {result!==null &&(
                <div className="text-xl">Result of Error is : {result.toFixed(6)}</div>
            )}
            <Plot useResizeHandler={true} 
                data={[
                    {
                        x: xcurve,
                        y: ycurve,
                        type: "scatter",
                        mode: "lines",
                    },
                    {
                        x: iterationxi,
                        y: iterationyi,
                        type: "scatter",
                        mode: "markers",
                        marker: {color: "black"},
                        line: { color: "gray" },
                    },...graphtrapezoidal
                    // {
                    //     x: iterationxi.map((item,index) => [xi[index-1],xi[index],xi[index],xi[index-1]]),
                    //     y: iterationyi.map((item,index) => [0,0,yi[index],yi[i-1]]),
                    //     type: "scatter",
                    //     mode: "lines",
                    //     fill: "toself",
                    //     fillcolor: "rgba(240, 241, 242, 0.3)",
                    //     line: {color: "gray"},
                    // },
                ]}
                layout={{
                    width: 800,
                    height: 500,
                    title: {text: "Graph Trapezoidal"},
                    xaxis: {title:{text:"X"}},
                    yaxis: {title:{text:"f(X)"}},
                }}
            />
        </div>
    )
}
export default Trapezoidal;