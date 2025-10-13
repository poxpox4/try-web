import { useState } from "react";
import { evaluate } from "mathjs";
import { MathJax,MathJaxContext } from "better-react-mathjax";
import Plot from "react-plotly.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
function Onepoint(){
    const [fx,setFx] = useState("");
    const [x0,setX0] = useState();
    //const [x1,setXl] = useState("");
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
        const found = equation.find((eq) => eq.ID === parseFloat(id));
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
                queryClient.invalidateQueries({queryKey:["equation"]});
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
            alert("มีสมการนี้อยู่แล้ว");
            return;
        }
        addEquationMutation.mutate(trimfx);
    }
    function Calculate(){
        try{
            if(!fx||!x0||!error){
                alert("กรุณากรอก f(x), X Start และ ERROR ให้ครบก่อนคำนวณ");
                return;
            }
            const variablematch = fx.match(/[a-zA-Z]+/g);
            const variable = variablematch ? variablematch[variablematch.length-1] : "x";
            let x0cal = parseFloat(x0);
            let xold = 0;
            let x1 = 0;
            const agree = parseFloat(error);
            const resultarr = [];
            let errorcal = 0;
            do{
                xold = x0cal;
                x1 = evaluate(fx,{[variable]:x0cal});
                if(x1==0){
                    alert("X Start ต้องไม่เท่ากับ 0 ใส่ X Start ใหม่");
                    return;
                }
                errorcal = Math.abs((x1-xold)/x1);
                resultarr.push({
                    x0:x0cal,
                    x1,error:errorcal,
                })
                
                x0cal = x1;
                if (resultarr.length > 100) {
                    alert("ทำงานเยอะเกิน ใส่ X start หรือ f(x) ใหม่");
                    return;
                }
            }while(Math.abs((x1-xold)/x1)>agree);
            setResult(x1);
            setIteration(resultarr);
        }
        catch{
            alert("สมการผิด");
        }
    }
    if(isLoading) return <div>Loading...</div>
    if(fetchError) return <div>Error fetch</div>
    return(
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
            <h1 className="font-bold text-3xl">One-point iteration</h1>
            <MathJaxContext>
                <div className="w-full max-w-4xl px-4">
                    <div className="bg-white-50 rounded-2xl shadow-md mt-1 p-4 text-center">
                        <MathJax className="text-3xl">{"\\[x_{n+1}=" +((fx && fx.replaceAll("x", "x_n")) || "\\;...\\;")+ "\\]"}</MathJax>
                    </div>
                </div>
            </MathJaxContext>
            <div className="w-full max-w-xl space-y-3 mt-1 px-10 py-10 bg-white-50 rounded-2xl shadow-md text-center">
                <label htmlFor="">เลือกสมการ</label>
                <div className="flex justify-center">
                    <select 
                    className="shadow-md w-full rounded px-4 py-2 text-center"
                    value={selectId}
                    onChange={Select}>
                        <option value="">เลือกสมการ</option>
                        {equation.map((eq) => (
                            <option key={eq.ID} value={eq.ID}>{eq.Equation}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center">
                        <button className="bg-green-500 hover:bg-green-600 rounded px-4 py-2 text-white"
                        onClick={AddEquation}>
                            +
                        </button>
                </div>
                
                <div>
                    <label className="block mb-1">f(X)</label>
                    <input type="text" 
                    placeholder="(1+43x)/86"
                    className="shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={fx}
                    onChange={(e) => setFx(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1">X Start</label>
                    <input type="number" 
                    placeholder="1"
                    className="shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={x0}
                    onChange={(e) => setX0(e.target.value)}/>
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
            <button onClick={Calculate} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-white rounded">Calculate</button>
            <div className="mt-1 px-4 py-10 bg-white-50 shadow-md rounded-2xl w-full max-w-4xl text-center">
                <h2 className="font-bold text-xl mb-3">Solution</h2>
                {result!==null && (
                    <div className="text-xl mb-3">Result is : {result.toFixed(6)}</div>
                )}
                {iteration.length>0 && (
                    <table className="border border-collapse border-gray-400 w-full">
                        <thead>
                            <tr>
                                <MathJaxContext>
                                    <th className="border px-2 py-1"><MathJax>{"\\[Iteration\\]"}</MathJax></th>
                                    <th className="border px-2 py-1 text-xl"><MathJax>{"\\[x_i\\]"}</MathJax></th>
                                    <th className="border px-2 py-1"><MathJax>{"\\[Error_i\\]"}</MathJax></th>
                                </MathJaxContext>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {iteration.map((item,index) => (
                                <tr key={index}>
                                    <td className="border px-2 py-1">{index}</td>
                                    <td className="border px-2 py-1">{item.x0.toFixed(6)}</td>
                                    <td className="border px-2 py-1">{item.error.toFixed(6)}</td>
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
                            x: iteration.map((item,index) => index),
                            y: iteration.map((item) => item.error),
                            type: "scatter",
                            mode: "lines+markers",
                            marker: {color:"black"},
                            line: {color:"gray"},
                        }
                    ]}
                    layout={{
                        autosize: true,
                        responsive: true,
                        title: {text:"Graph One-point iteration Error"},
                        xaxis: {title:{text:"x"}},
                        yaxis: {title:{text:"f(x)"}}
                    }}
                    style={{width:"100%",height:"500px"}}
                />
            </div>
                
        </div>
    )
}
export default Onepoint;