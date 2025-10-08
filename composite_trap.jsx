import { useState } from "react";
import { evaluate } from "mathjs";
import Plot from "react-plotly.js";
import nerdamer from 'nerdamer';
import 'nerdamer/Calculus';
import { MathJax,MathJaxContext } from "better-react-mathjax";
function CompositeTrapezoidal(){
    const [fx,setFx] = useState("");
    const [a,setA] = useState("");
    const [b,setB] = useState("");
    const [n,setN] = useState("");
    const [Ireal,setIreal] = useState(null);
    const [Ical,setIcal] = useState(null);
    const [error,setError] = useState(null);
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
            alert("n ต้องมากกว่า 0");
            return;
        } 
        if(b<a){
            alert("bต้องมากกว่าa");
            return;
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
            if(i==0) return null;
                return {
                    x: [xi[i-1], xi[i], xi[i], xi[i-1]], //xi[i-1]ขอบซ้าย xi[i]ขอบขวา
                    y: [0, 0, yi[i], yi[i-1]], //y=0 เส้นด้านล่างซ้าย/ขวา yi[i-1],yi[i]  เส้นด้านบนของ trapezoid
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
            setError(error);
        }
        catch{
            alert("สมการผิด");
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
            <h1 className="font-bold text-3xl">Composite Trapzoidal</h1>
            <MathJaxContext>
                <div className="w-full max-w-4xl px-4 ">
                    <div className="mt-1 p-4 bg-white-50 rounded-2xl shadow-md text-center ">
                        <MathJax className="text-3xl">{"\\[\\int_{"+(a||"a")+"}^{"+(b||"b")+"} ("+(fx||"\\;...\\;")+")\\,dx\\]"}</MathJax>
                    </div>
                </div>
            </MathJaxContext>
            <div className="w-full max-w-xl space-y-3 mt-1 px-10 py-10 bg-white-50 rounded-2xl shadow-md text-center">
                <div >
                    <label className="block">f(X)</label>
                    <input type="text" 
                    placeholder="2x^3-5x^2+3x+1"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={fx}
                    onChange={(e) => setFx(e.target.value)}/>
                </div>
                <div>
                    <label className="block">a</label>
                    <input type="text" 
                    placeholder="0"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={a}
                    onChange={(e) => setA(e.target.value)}/>
                </div>
                <div>
                    <label className="block">b</label>
                    <input type="text"
                    placeholder="2"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center" 
                    value={b}
                    onChange={(e) => setB(e.target.value)}/>
                </div>
                <div>
                    <label className="block">n</label>
                    <input type="text"
                    placeholder="4"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center" 
                    value={n}
                    onChange={(e) => setN(e.target.value)}/>
                </div>
            </div>
                
            <button onClick={Calculate} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-white">Calculate</button>
            <div className="mt-1 p-4 bg-white-50 rounded-2xl shadow-md w-full max-w-4xl px-4 text-center">
                <h2 className="text-xl mb-2 font-bold">Solution</h2>
                {Ireal!==null &&(
                    <div className="text-xl">Result of I_real is : {Ireal.toFixed(6)}</div>
                )}
                {Ical!==null &&(
                    <div className="text-xl">Result of I_cal is : {Ical.toFixed(6)}</div>
                )}
                {error!==null &&(
                    <div className="text-xl">Result of Error is : {error.toFixed(6)}</div>
                )}
            </div>
            <div className="w-full max-w-4xl mt-1 p-4 bg-white-50 rounded-2xl shadow-md">
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
                            mode: "lines+markers",
                            marker: {color: "black"},
                            line: { color: "gray" },
                        },...graphtrapezoidal
                    ]}
                    layout={{
                        autosize: true,
                        responsive: true,
                        title: {text: "Graph Composite Trapezoidal"},
                        xaxis: {title:{text:"X"}},
                        yaxis: {title:{text:"f(X)"}},
                    }}
                    style={{width:"100%",height:"500px"}}
                />
            </div>
                
        </div>
    )
}
export default CompositeTrapezoidal;