import { useState } from "react";
import { evaluate } from "mathjs";
function Linear(){
    const [x,setX] = useState([]);
    const [fx,setFx] = useState([]);
    const [arrayx,setArrayx] = useState(null);
    const [xfind,setXfind] = useState("");
    const [result,setResult] = useState(null);
    const [arrcal,setArraycal] = useState(null);
    const [resultarrx,setResultarrayx] = useState(null);
    // const [rows,setRows] = useState("");
    // const [column,setColumn] = useState("");
    // const rnum = parseFloat(rows);
    // const cnum = parseFloat(column);
    const A = 2;
    // const N = x.length;
    function guasseliminate(arr,resultarr){
        //arr = Array.from(Array(A),()=>Array(A+1));
        //resultarr = Array(A);
        for(let i=0;i<A;i++){
            let forward = arr[i][i];
            for(let j=0;j<=A;j++){
                arr[i][j] /= forward;
            }
            for(let k=i+1;k<A;k++){
                let down = arr[k][i];
                for(let j=i;j<=A;j++){
                    arr[k][j] -= down*arr[i][j];
                }
            }
        }
        for(let i=A-1;i>=0;i--){
            resultarr[i] = arr[i][A];
            for(let j=i+1;j<A;j++){
                resultarr[i] -= arr[i][j]*resultarr[j];
            }
        }
    }
    function Calculate(){
        try{
            const N = x.length;
            if (x.length !== fx.length) {
            alert("กรอกค่า X และ f(X) ให้จำนวนเท่ากัน");
            return;
            }
            const arrx = Array.from(Array(N),(_,i)=>[x[i],fx[i]]);
            setArrayx(arrx);
            const X = Array.from(Array(N),()=>Array(A));
            const Y = Array(N);
            for(let i=0;i<N;i++){
                X[i][0] = 1;
                X[i][1] = arrx[i][0];
                Y[i] = arrx[i][1];
            }
            let sumx = Array(A).fill(0);
            let sumy = 0;
            let sumxx = Array.from(Array(A),()=>Array(A).fill(0));
            let sumxy = Array(A).fill(0);
            for(let i=0;i<N;i++){
                sumy += Y[i];
                for(let j=0;j<A;j++){
                    sumx[j] += X[i][j];
                    sumxy[j] += X[i][j]*Y[i];
                    for(let k=0;k<A;k++){
                        sumxx[j][k] += X[i][j]*X[i][k];
                    }
                }
            }
            let arrcal = Array.from(Array(A),()=>Array(A+1).fill(0));
            for(let i=0;i<A;i++){
                for(let j=0;j<A;j++){
                    if(i==0&&j==0){
                        arrcal[i][j] = N;
                    }
                    else if(i==0&&j>0){
                        arrcal[i][j] = sumx[j];
                    }
                    else if(j>=i){
                        arrcal[i][j] = sumxx[i][j];
                    }
                    else{
                        arrcal[i][j] = arrcal[j][i];
                    }
                }
                if(i==0){
                    arrcal[i][A] = sumy;
                }
                else{
                    arrcal[i][A] = sumxy[i];
                }
            }
            setArraycal(arrcal);
            let arrcal2 = arrcal.map(row => [...row]); //copyค่า
            const result = Array(A);
            guasseliminate(arrcal2,result);
            setResultarrayx(result);
            const xcal = parseFloat(xfind);
            const fxcal = result[0] + result[1]*xcal;
            setResult(fxcal);
        }catch{
            alert("กรอกค่าผิด");
        }
        
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <h1 className="font-bold text-3xl">Linear Regression</h1>
            <div>
                <label className="block">Value</label>
                <input type="text"
                placeholder="Ex. 1,2,3"
                className="border px-2 py-1 rounded" 
                //value={x}
                onChange={(e) => setX(e.target.value.split(",").map(Number))}/>
            </div>
            <div>
                <label className="block">f(X)</label>
                <input type="text"
                placeholder="Ex. 1,2,3"
                className="border px-2 py-1 rounded" 
                //value={fx}
                onChange={(e) => setFx(e.target.value.split(",").map(Number))}/>
            </div>
            <div>
                <label className="block">ค่าที่ต้องการจะหา</label>
                <input type="text"
                placeholder="ใส่ค่า X ที่ต้องหารจะหา" 
                className="border px-2 py-1 rounded"
                value={xfind}
                onChange={(e) => setXfind(e.target.value)}/>
            </div>
            <button onClick={Calculate} className="bg-blue-500 px-4 py-2 rounded text-white">Calculate</button>
            {(arrayx!==null||arrcal!==null||resultarrx!==null||result!==null)&&(
                <div className="flex divide-x-2 divide-blue-500 border-3 border-blue-500 rounded bg-blue-50 p-4 space-x-4 overflow-auto">
                    {arrayx!==null &&(
                        
                        <div className="w-1/2 pl-2">
                            <h4 className="font-bold">Array Data</h4>
                            {arrayx.map((item, index) => (
                                <p key={index}>
                                    [{item[0]}, {item[1]}]
                                </p>
                            ))}
                        </div>
                    )}
                    {arrcal!==null &&(
                        <div className="w-1/2 pl-2 ">
                            <h4 className="font-bold">Array of a</h4>
                            {arrcal.map((item, index) => (
                                <p key={index}>
                                    [{item[0]}, {item[1]},{item[2]}]
                                </p>
                            ))}
                        </div>
                    )}
                    {resultarrx!==null&&(
                        <div className="w-1/2 pl-2 ">
                            <h4 className="font-bold">Value of a</h4>
                            {resultarrx.map((item,index)=>(
                                <p key={index}>
                                    a{index} = {item.toFixed(6)}
                                </p>
                            ))}
                        </div>
                    )}
                    {result!==null&&(
                        <div >
                            <h4 className="font-bold">Result</h4>
                            <p>f({xfind}) = {result.toFixed(6)}</p>
                        </div>
                    )}
            </div>
            )}
            
            
            
            
        </div>
    )
}
export default Linear;