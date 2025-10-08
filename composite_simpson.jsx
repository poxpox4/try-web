import { useState } from "react";
import nerdamer from "nerdamer";
import "nerdamer/Calculus";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";
import { MathJax,MathJaxContext } from "better-react-mathjax";
function CompositeSimpson(){
    const [fx,setFx] = useState("");
    const [a,setA] = useState("");
    const [b,setB] = useState("");
    const [n,setN] = useState("");
    const [Ireal,setIreal] = useState(null);
    const [Ical,setIcal] = useState(null);
    const [error,setError] = useState(null);
    const [xcurve,setXcurve] = useState([]);
    const [ycurve,setYcurve] = useState([]);
    const [iterationxi,setIterationxi] = useState([]);
    const [iterationyi,setIterationyi] = useState([]);
    const [graphsimpson,setGraphsimpson] = useState([]);
    function F(x,variable){
        const equation = evaluate(fx,{[variable]:x});
        return equation;
    }
    function Simpson(a,b,n,variable){
        if(n<1){
            alert("n ต้องมากกว่า 0");
            return;
        } 
        if(b<a){
            alert("bต้องมากกว่าa");
            return;
        }
        const h = (b-a)/(2*n);
        let sumpos = 0;
        let sumne = 0;
        for(let i=1;i<2*n;i++){
            if(i%2==0){
                sumpos += F(a+i*h,variable);
            }
            else{
                sumne += F(a+i*h,variable);
            }
        }
        const I = (h/3)*(F(a,variable)+F(b,variable)+4*sumne+2*sumpos);
        return I;
    }
    function Calculate(){
        try{
            const variablematch = fx.match(/[a-zA-Z]+/g);
            const variable = variablematch ? variablematch[variablematch.length-1] : "x";
            const anum = parseFloat(a);
            const bnum = parseFloat(b);
            const nnum = parseFloat(n);
            const Fx_integral = nerdamer.integrate(fx,variable).toString();
            const Fb = nerdamer(Fx_integral,{[variable]:bnum}).evaluate();
            const Fa = nerdamer(Fx_integral,{[variable]:anum}).evaluate();
            const I_real = Fb-Fa;
            setIreal(I_real);
            const I_cal = Simpson(anum,bnum,nnum,variable);
            setIcal(I_cal);
            const error = ((I_real-I_cal)/I_real)*100;
            setError(error);
            const xcurve = [];
            const ycurve = [];
            for(let i=anum;i<=bnum;i += 0.01){
                xcurve.push(i);
                ycurve.push(F(i,variable));
            }
            setXcurve(xcurve);
            setYcurve(ycurve);
            const h = (bnum-anum)/(2*nnum);
            const xi = [];
            const yi = [];
            for(let i=0;i<=2*nnum;i++){
                const xcal = anum+i*h;
                xi.push(xcal);
                yi.push(F(xcal,variable));
            }
            setIterationxi(xi);
            setIterationyi(yi);
            const simpson = xi.map((x,i)=>{
                if(i==0) return null;
                return{
                    x: [xi[i-1],xi[i],xi[i],xi[i-1]],
                    y: [0,0,yi[i],yi[i-1]],
                    type: "scatter",
                    mode: "lines",
                    fill: "toself",
                    fillcolor: "rgba(0,100,200,0.3)",
                    line: { color: "blue" },
                }
            }).filter(Boolean);
            setGraphsimpson(simpson);
        }
        catch{
            alert("สมการผิด");
        }
        
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
            <h1 className="font-bold text-3xl">Composite Simpson</h1>
            <MathJaxContext>
                <div className="w-full max-w-4xl px-4 ">
                    <div className="mt-1 p-4 bg-white-50 rounded-2xl shadow-md text-center ">
                    <MathJax className="text-3xl ">{"\\[\\int_{"+(a||"a")+"}^{"+(b||"b")+"} ("+(fx||"\\;...\\;")+")\\,dx\\]"}</MathJax>
                    </div>
                </div>
            </MathJaxContext>
            <div className="w-full max-w-xl space-y-3 mt-1 px-10 py-10 bg-white-50 rounded-2xl shadow-md text-center">
                <div>
                    <label className="block mb-1 ">f(x)</label>
                    <input type="text"
                    placeholder="x^7+2x^3-1" 
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={fx}
                    onChange={(e) => setFx(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1 ">a</label>
                    <input type="text"
                    placeholder="-1" 
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={a}
                    onChange={(e) => setA(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1 ">b</label>
                    <input type="text"
                    placeholder="2" 
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={b}
                    onChange={(e) => setB(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1 ">n</label>
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
                {Ireal !== null && (
                    <div className="text-xl mb-2">Result of I_real is : {Ireal.toFixed(6)}</div>
                )}
                {Ical !== null && (
                    <div className="text-xl mb-2">Result of I_cal is : {Ical.toFixed(6)}</div>
                )}
                {error !== null && (
                    <div className="text-xl mb-2">Result of Error is : {error.toFixed(6)}</div>
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
                            marker: {color:"black"},
                            line: {color:"gray"},
                        },...graphsimpson,
                    ]}
                    layout={{
                        autosize: true,
                        responsive: true,
                        title: { text: "Graph Composite Simpson" },
                        xaxis: { title: { text: "X" } },
                        yaxis: { title: { text: "f(X)" } },
                    }}
                    style={{ width: "100%", height: "500px" }}
                />
            </div>
                
        </div>
    )
}
export default CompositeSimpson;