import { useState } from "react";
import { evaluate, derivative} from "mathjs";
import { MathJax,MathJaxContext } from "better-react-mathjax";
function Diff(){
    const [fx,setFx] = useState("");
    const [x,setX] = useState();
    const [h,setH] = useState();
    const [order, setOrder] = useState("");
    const [error, setError] = useState("");
    const [direction, setDirection] = useState("");
    const [result,setResult] = useState(null);
    const [resulterror,setResulterror] = useState(null);
    const [Ireal,setIreal] = useState(null);
    function Calculate(){
        try{
            if(!fx||!x||!h){
                alert("กรุณากรอก f(x), x และ h ให้ครบก่อนคำนวณ");
                return;
            }
            if (!order || !error || !direction) {
                alert("กรุณาเลือก Order , Error และ Direction ก่อน");
                return;
            }
            let cal = 0;
            const variablematch = fx.match(/[a-zA-Z]+/g);
            const variable = variablematch ? variablematch[variablematch.length-1] : "x";
            const X = parseFloat(x);
            const H = parseFloat(h);
            let diff1 = derivative(fx,variable).toString();
            let diff2 = derivative(diff1,variable).toString();
            let diff3 = derivative(diff2,variable).toString();
            let diff4 = derivative(diff3,variable).toString(); 
            let diffcal = 0;
            let errorcal = 0;
            if(order=="1"){
                if(direction=="Forward"){
                    if(error=="O(h)"){
                        diffcal = evaluate(diff1,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X+1*H})-evaluate(fx,{[variable]:X}))/H;
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^2)"){
                        diffcal = evaluate(diff1,{[variable]:X});
                        cal = (-evaluate(fx,{[variable]:X+2*H})+4*evaluate(fx,{[variable]:X+1*H})-3*evaluate(fx,{[variable]:X}))/(2*H);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                }
                else if(direction=="Backward"){
                    if(error=="O(h)"){
                        diffcal = evaluate(diff1,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X})-evaluate(fx,{[variable]:X-1*H}))/H;
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^2)"){
                        diffcal = evaluate(diff1,{[variable]:X});
                        cal = (3*evaluate(fx,{[variable]:X})-4*evaluate(fx,{[variable]:X-1*H})+evaluate(fx,{[variable]:X-2*H}))/(2*H);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    } 
                }
                else if(direction=="Central"){
                    if(error=="O(h^2)"){
                        diffcal = evaluate(diff1,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X+1*H})-evaluate(fx,{[variable]:X-1*H}))/(2*H);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^4)"){
                        diffcal = evaluate(diff1,{[variable]:X});
                        cal = (-evaluate(fx,{[variable]:X+2*H})+8*evaluate(fx,{[variable]:X+1*H})-8*evaluate(fx,{[variable]:X-1*H})+evaluate(fx,{[variable]:X-2*H}))/(12*H);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                }
            }
            else if(order=="2"){
                if(direction=="Forward"){
                    if(error=="O(h)"){
                        diffcal = evaluate(diff2,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X+2*H})-2*evaluate(fx,{[variable]:X+1*H})+evaluate(fx,{[variable]:X}))/Math.pow(H,2);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^2)"){
                        diffcal = evaluate(diff2,{[variable]:X});
                        cal = (-evaluate(fx,{[variable]:X+3*H})+4*evaluate(fx,{[variable]:X+2*H})-5*evaluate(fx,{[variable]:X+1*H})+2*evaluate(fx,{[variable]:X}))/Math.pow(H,2);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                }
                else if(direction=="Backward"){
                    if(error=="O(h)"){
                        diffcal = evaluate(diff2,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X})-2*evaluate(fx,{[variable]:X-1*H})+evaluate(fx,{[variable]:X-2*H}))/Math.pow(H,2);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^2)"){
                        diffcal = evaluate(diff2,{[variable]:X});
                        cal = (2*evaluate(fx,{[variable]:X})-5*evaluate(fx,{[variable]:X-1*H})+4*evaluate(fx,{[variable]:X-2*H})-evaluate(fx,{[variable]:X-3*H}))/Math.pow(H,2);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                }
                else if(direction=="Central"){
                    if(error=="O(h^2)"){
                        diffcal = evaluate(diff2,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X+1*H})-2*evaluate(fx,{[variable]:X})+evaluate(fx,{[variable]:X-1*H}))/Math.pow(H,2);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^4)"){
                        diffcal = evaluate(diff2,{[variable]:X});
                        cal = (-evaluate(fx,{[variable]:X+2*H})+16*evaluate(fx,{[variable]:X+1*H})-30*evaluate(fx,{[variable]:X})+16*evaluate(fx,{[variable]:X-1*H})-evaluate(fx,{[variable]:X-2*H}))/(12*Math.pow(H,2));
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                }
            }
            else if(order=="3"){
                if(direction=="Forward"){
                    if(error=="O(h)"){
                        diffcal = evaluate(diff3,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X+3*H})-3*evaluate(fx,{[variable]:X+2*H})+3*evaluate(fx,{[variable]:X+1*H})-evaluate(fx,{[variable]:X}))/Math.pow(H,3);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^2)"){
                        diffcal = evaluate(diff3,{[variable]:X});
                        cal = (-3*evaluate(fx,{[variable]:X+4*H})+14*evaluate(fx,{[variable]:X+3*H})-24*evaluate(fx,{[variable]:X+2*H})+18*evaluate(fx,{[variable]:X+1*H})-5*evaluate(fx,{[variable]:X}))/(2*Math.pow(H,3));
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                }
                else if(direction=="Backward"){
                    if(error=="O(h)"){
                        diffcal = evaluate(diff3,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X})-3*evaluate(fx,{[variable]:X-1*H})+3*evaluate(fx,{[variable]:X-2*H})-evaluate(fx,{[variable]:X-3*H}))/Math.pow(H,3);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^2)"){
                        diffcal = evaluate(diff3,{[variable]:X});
                        cal = (5*evaluate(fx,{[variable]:X})-18*evaluate(fx,{[variable]:X-1*H})+24*evaluate(fx,{[variable]:X-2*H})-14*evaluate(fx,{[variable]:X-3*H})+3*evaluate(fx,{[variable]:X-4*H}))/(2*Math.pow(H,3));
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                }
                else if(direction=="Central"){
                    if(error=="O(h^2)"){
                        diffcal = evaluate(diff3,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X+2*H})-2*evaluate(fx,{[variable]:X+1*H})+2*evaluate(fx,{[variable]:X-1*H})-evaluate(fx,{[variable]:X-2*H}))/(2*Math.pow(H,3))
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^4)"){
                        diffcal = evaluate(diff3,{[variable]:X});
                        cal = (-evaluate(fx,{[variable]:X+3*H})+8*evaluate(fx,{[variable]:X+2*H})-13*evaluate(fx,{[variable]:X+1*H})+13*evaluate(fx,{[variable]:X-1*H})-8*evaluate(fx,{[variable]:X-2*H})+evaluate(fx,{[variable]:X-3*H}))/(8*Math.pow(H,3));
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                }
            }
            else if(order=="4"){
                if(direction=="Forward"){
                    if(error=="O(h)"){
                        diffcal = evaluate(diff4,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X+4*H})-4*evaluate(fx,{[variable]:X+3*H})+6*evaluate(fx,{[variable]:X+2*H})-4*evaluate(fx,{[variable]:X+1*H})+evaluate(fx,{[variable]:X}))/Math.pow(H,4);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^2)"){
                        diffcal = evaluate(diff4,{[variable]:X});
                        cal = (-2*evaluate(fx,{[variable]:X+5*H})+11*evaluate(fx,{[variable]:X+4*H})-24*evaluate(fx,{[variable]:X+3*H})+26*evaluate(fx,{[variable]:X+2*H})-14*evaluate(fx,{[variable]:X+1*H})+3*evaluate(fx,{[variable]:X}))/Math.pow(H,4);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                }
                else if(direction=="Backward"){
                    if(error=="O(h)"){
                        diffcal = evaluate(diff4,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X})-4*evaluate(fx,{[variable]:X-1*H})+6*evaluate(fx,{[variable]:X-2*H})-4*evaluate(fx,{[variable]:X-3*H})+evaluate(fx,{[variable]:X-4*H}))/Math.pow(H,4);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^2)"){
                        diffcal = evaluate(diff4,{[variable]:X});
                        cal = (3*evaluate(fx,{[variable]:X})-14*evaluate(fx,{[variable]:X-1*H})+26*evaluate(fx,{[variable]:X-2*H})-24*evaluate(fx,{[variable]:X-3*H})+11*evaluate(fx,{[variable]:X-4*H})-2*evaluate(fx,{[variable]:X-5*H}))/Math.pow(H,4);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                }
                else if(direction=="Central"){
                    if(error=="O(h^2)"){
                        diffcal = evaluate(diff4,{[variable]:X});
                        cal = (evaluate(fx,{[variable]:X+2*H})-4*evaluate(fx,{[variable]:X+1*H})+6*evaluate(fx,{[variable]:X})-4*evaluate(fx,{[variable]:X-1*H})+evaluate(fx,{[variable]:X-2*H}))/Math.pow(H,4);
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                    else if(error=="O(h^4)"){
                        diffcal = evaluate(diff4,{[variable]:X});
                        cal = (-evaluate(fx,{[variable]:X+3*H})+12*evaluate(fx,{[variable]:X+2*H})-39*evaluate(fx,{[variable]:X+1*H})+56*evaluate(fx,{[variable]:X})-39*evaluate(fx,{[variable]:X-1*H})+12*evaluate(fx,{[variable]:X-2*H})-evaluate(fx,{[variable]:X-3*H}))/(6*Math.pow(H,4));
                        errorcal = ((diffcal-cal)/diffcal)*100;
                    }
                }
            }
            setIreal(diffcal);
            setResult(cal);
            setResulterror(errorcal);
        }
        catch{
            alert("สมการผิด");
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
            <h1 className="font-bold text-3xl">Numerical Differentiation</h1>
            <MathJaxContext>
                <div className="w-full max-w-4xl px-4">
                    <div className="mt-1 p-4 bg-white-50 rounded-2xl shadow-md text-center ">
                        <MathJax className="text-3xl">{"\\[f(x)="+(fx || "\\;...\\;")+"\\]"}</MathJax>
                    </div>
                </div>
            </MathJaxContext>
            <div className="flex gap-4 mt-6">
                <div className="flex flex-col items-center">
                    <label >Order</label>
                    <select
                    className="shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-4 py-3" 
                    value={order}
                    onChange={(e)=>setOrder(e.target.value)}>
                        <option value="" className="hover:bg-blue-500">-</option>
                        <option value="1" className="hover:bg-blue-500">First</option>
                        <option value="2" className="hover:bg-blue-500">Second</option>
                        <option value="3" className="hover:bg-blue-500">Third</option>
                        <option value="4" className="hover:bg-blue-500">Fourth</option>
                    </select>
                </div>
                <div className="flex flex-col items-center">
                    <label >Error</label>
                    <select
                    className="shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-4 py-3"
                    value={error}
                    onChange={(e) => setError(e.target.value)} >
                        <option value="">-</option>
                        <option value="O(h)">O(h)</option>
                        <option value="O(h^2)">O(h^2)</option>
                        <option value="O(h^4)">O(h^4)</option>
                    </select>
                </div>
                <div className="flex flex-col items-center">
                    <label >Direction</label>
                    <select 
                    className="shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-4 py-3 "
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}>
                        <option value="">-</option>
                        <option value="Forward">Forward</option>
                        <option value="Backward">Backward</option>
                        <option value="Central">Central</option>
                    </select>
                </div>
            </div>
            <div className="w-full max-w-xl space-y-3 mt-1 px-10 py-10 bg-white-50 rounded-2xl shadow-md text-center">
                <div>
                    <label className="block mb-1">f(x)</label>
                    <input type="text"
                    placeholder="e^x" 
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={fx}
                    onChange={(e) => setFx(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1">x</label>
                    <input type="number"
                    placeholder="2" 
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={x}
                    onChange={(e) => setX(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1">h</label>
                    <input type="number"
                    placeholder="0.25" 
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={h}
                    onChange={(e) => setH(e.target.value)}/>
                </div>
            </div>
            <button onClick={Calculate} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-white">Calculate</button>
            <div className="mt-1 px-4 py-10 bg-white-50 rounded-2xl shadow-md w-full max-w-4xl text-center">
                <h2 className="text-xl mb-3 font-bold">Solution</h2>
                {Ireal!==null&&(
                    <div className="text-xl">I_real is : {Ireal.toFixed(6)}</div>
                )}
                {result!==null&&(
                    <div className="text-xl">Result is : {result.toFixed(6)}</div>
                )}
                {resulterror!==null&&(
                    <div className="text-xl">Error is : {resulterror.toFixed(6)}</div>
                )}
            </div>
        </div>
    )
}
export default Diff;