import { useState } from "react";
import { evaluate } from "mathjs";
import Plot from "react-plotly.js";
import { MathJax,MathJaxContext } from "better-react-mathjax";
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import axios from "axios";
import { data } from "react-router-dom";
function Secant(){
    const [fx,setFx] = useState("");
    const [x0,setX0] = useState();
    const [x1,setX1] = useState();
    const [error,setError] = useState();
    const [result,setResult] = useState(null);
    const [iteration,setIteration] = useState([]);
    //backend
    const [selectId,setSelectId] = useState("");
    const queryClient = useQueryClient();
    //get DB
    const {data: equation = [],isLoading,error:fetchError} = useQuery({
        queryKey: ["equation"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/root");
            return res.data.results || [];
        }
    })
    //Select
    const Select = (e) => {
        const id = e.target.value;
        setSelectId(id);
        const found = equation.find((eq) => eq.ID === parseFloat(id))
        if(found) setFx(found.Equation);
    }
    //Add
    const addEquationMutation = useMutation({
        mutationFn: async (newEquation) => {
            const res = await axios.post("http://localhost:5000/root",{equation:newEquation});
            return res.data;
        },
        onSuccess: (data) => {
            if(data.success){
                alert("เพิ่มสมการสำเร็จ");
                queryClient.invalidateQueries({queryKey:["equation"]})
            }
            else{
                alert("ไม่สามารถเพิ่มสมการได้");
            }
        }
    })
    const AddEquation = () => {
        const trimfx = fx.trim();
        const isSameequation = equation.some((eq) => eq.Equation.trim().toLowerCase() === trimfx.toLowerCase());
        if(isSameequation){
            alert("สมการนี้มีอยู่แล้ว");
            return;
        }
        addEquationMutation.mutate(trimfx);
    }
    function Calculate(){
        try{
            if(!fx||!x0||!x1||!error){
                alert("กรุณากรอก f(x), X Start , X Next และ ERROR ให้ครบก่อนคำนวณ");
                return;
            }
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
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
            <h1 className="font-bold text-3xl ">Secant Method</h1>
            <MathJaxContext>
                <div className="w-full max-w-4xl px-4">
                    <div className="bg-white-50 rounded-2xl shadow-md mt-1 p-4 text-center">
                        <MathJax className="text-3xl">{"\\[f(x)=" +(fx || "\\;...\\;")+ "\\]"}</MathJax>
                    </div>
                </div>
            </MathJaxContext>
            <div className="w-full max-w-xl space-y-3 mt-1 px-10 py-10 bg-white-50 rounded-2xl shadow-md text-center">
                <label htmlFor="">เลือกสมการ</label>
                <select 
                className="shadow-md w-full px-4 py-2 rounded text-center"
                value={selectId}
                onChange={Select}>
                    <option value="">เลือกสมการ</option>
                    {equation.map((eq) => (
                        <option value={eq.ID} key={eq.ID}>{eq.Equation}</option>
                    ))}
                </select>
                <div className="flex justify-center">
                    <button className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded"
                    onClick={AddEquation}>
                        +
                    </button>
                </div>
                <div>
                    <label className="block mb-1">f(X)</label>
                    <input type="text"
                    placeholder="x^2-7" 
                    className="shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={fx}
                    onChange={(e) => setFx(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1">X Start</label>
                    <input type="number"
                    placeholder="1.5" 
                    className="shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={x0}
                    onChange={(e) => setX0(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1">X Next</label>
                    <input type="number"
                    placeholder="2" 
                    className="shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={x1}
                    onChange={(e) => setX1(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1">ERROR</label>
                    <input type="number" 
                    placeholder="0.000001"
                    className="shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={error}
                    onChange={(e) => setError(e.target.value)}/>
                </div>
            </div>
                
            <button onClick={Calculate} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-white">Calculate</button>
            <div className="mt-1 px-4 py-10 bg-white-50 shadow-md rounded-2xl w-full max-w-4xl text-center">
                <h2 className="text-xl font-bold mb-3">Solution</h2>
                {result!==null &&(
                    <div className="text-xl mb-3">Result is : {result.toFixed(6)}</div>
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
            </div>
            <div className="w-full max-w-4xl mt-1 bg-white-50 p-4 shadow-md rounded-2xl">
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
                        autosize: true,
                        responsive: true,
                        title: {text: "Graph Secant Method Error"},
                        xaxis: {title:{text:"X"}},
                        yaxis: {title:{text:"f(X)"}},
                    }}
                    style={{width:"100%",height:"500px"}}
                />
            </div>
                
        </div>
    )
}
export default Secant;