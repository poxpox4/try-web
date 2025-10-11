import { useState } from "react";
function PolynomialRegression(){
    const [x,setX] = useState([]);
    const [fx,setFx] = useState([]);
    const [xfind,setXfind] = useState();
    const [m,setM] = useState();
    const [result,setResult] = useState(null);
    const [arrayx,setArrayx] = useState(null);
    const [arrcal,setArraycal] = useState(null);
    const [resultarrx,setResultarrayx] = useState(null);
    function Gaussjordan(arr,resultarr){
        const M = parseFloat(m)+1;
        for(let i=0;i<M;i++){
            let forward = arr[i][i];
            if(forward==0){
                for(let k=i+1;k<M;k++){
                    if(arr[k][i]!=0){
                        [arr[i],arr[k]] = [arr[k],arr[i]];
                        forward = arr[i][i];
                        break;
                    }
                }
            }
            for(let j=0;j<=M;j++){
                arr[i][j] /= forward;
            }
            for(let k=0;k<M;k++){
                if(k!=i){
                    let down = arr[k][i];
                    for(let j=i;j<=M;j++){
                        arr[k][j] -= down*arr[i][j];
                    }
                }
            }
        }
        for(let i=0;i<M;i++){
            resultarr[i] = arr[i][M];
        }
    }
    function Calculate(){
        try{
            const M = parseFloat(m)+1;
            if(!x||!fx||!xfind||!m){
                alert("กรุณากรอก Value, f(x), X value และ m ให้ครบก่อนคำนวณ");
                return;
            }
            if (x.length !== fx.length) {
                alert("กรอกค่า X และ f(X) ให้จำนวนเท่ากัน");
                return;
            }
            const N = x.length;
            const arrx = Array.from(Array(N),(_,i)=>[x[i],fx[i]]);
            setArrayx(arrx);
            const X = Array.from(Array(N),()=>Array(M));
            const Y = Array(N);
            for(let i=0;i<N;i++){
                //X[i][0] = 1;
                for(let j=0;j<M;j++){
                     X[i][j] = Math.pow(arrx[i][0], j);
                }
                Y[i] = arrx[i][1];
            }
            let sumx = Array(M).fill(0);
            let sumy = 0;
            let sumxx = Array.from(Array(M),()=>Array(M).fill(0));
            let sumxy = Array(M).fill(0);
            for(let i=0;i<N;i++){
                sumy += Y[i];
                for(let j=1;j<M;j++){
                    sumx[j] += X[i][j];
                    sumxy[j] += X[i][j]*Y[i];
                    for(let k=0;k<M;k++){
                        sumxx[j][k] += X[i][j]*X[i][k];
                    }
                }
            }
            let arrcal = Array.from(Array(M),()=>Array(M+1).fill(0));
            for(let i=0;i<M;i++){
                for(let j=0;j<M;j++){
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
                    arrcal[i][M] = sumy;
                }
                else{
                    arrcal[i][M] = sumxy[i];
                }
            }
            setArraycal(arrcal);
            let arrcal2 = arrcal.map(row=>[...row]);
            const result = Array(M);
            Gaussjordan(arrcal2,result);
            setResultarrayx(result);
            const Xcal = parseFloat(xfind);
            let fxcal = 0;
            for(let i=0;i<M;i++){
                fxcal += result[i]*Math.pow(Xcal,i);
            }
            setResult(fxcal);
        }
        catch{
            alert("สมการผิด");
        }
    }
    return(
        <div className="flex flex-col p-4 items-center justify-center space-y-4 min-h-screen">
            <h1 className="font-bold text-3xl">Polynomial Regression</h1>
            <div className="w-full max-w-xl space-y-3 mt-1 px-10 py-10 bg-white-50 rounded-2xl shadow-md text-center">
                <div>
                    <label className="block mb-1">Value</label>
                    <input type="text"
                    placeholder="Ex. 1,2,3"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center" 
                    onChange={(e) => setX(e.target.value.split(",").map(Number))}/>
                </div>
                <div>
                    <label className="block mb-1">f(x)</label>
                    <input type="text" 
                    placeholder="Ex. 1,2,3"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    onChange={(e) => setFx(e.target.value.split(",").map(Number))}/>
                </div>
                <div>
                    <label className="block mb-1">X value</label>
                    <input type="number" 
                    placeholder="ใส่ค่า X ที่ต้องการจะหา"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={xfind}
                    onChange={(e) => setXfind(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1">m</label>
                    <input type="number" 
                    placeholder="2"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={m}
                    onChange={(e) => setM(e.target.value)}/>
                </div>
            </div>
            <button onClick={Calculate} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-white">Calculate</button>
            <div className="mt-1 px-4 py-10 bg-white-50 shadow-md rounded-2xl w-full max-w-4xl text-center">
                <h2 className="font-bold text-xl">Solution</h2>
                <div>
                {resultarrx !== null && (
                    <div className="text-center mb-2">
                        f(x) = {""}
                        {resultarrx.map((_,i) => i==0 ? `a${i}` : i==1 ? `+ a${i}x` :`+ a${i}x^${i}`)}
                    </div>
                )}
                {(arrayx!==null||arrcal!==null||resultarrx!==null||result!==null)&&(
                    <div className="flex space-x-4 overflow-auto">
                        {arrayx!==null &&(
                            <div className="w-1/4 p-4 border-2 border-blue-300 rounded bg-blue-50 shadow">
                                <h4 className="font-bold mb-2">Array Data</h4>
                                {arrayx.map((item, index) => (
                                    <p key={index}>
                                        [{item[0]}, {item[1]}]
                                    </p>
                                ))}
                            </div>
                        )}
                        {arrcal!==null &&(
                            <div className="w-1/4 p-4 border-2 border-green-300 rounded bg-green-50 shadow">
                                <h4 className="font-bold mb-2">Array of a</h4>
                                {arrcal.map((item, index) => (
                                    <p key={index}>
                                        [{item[0]}, {item[1]},{item[2]}]
                                    </p>
                                ))}
                            </div>
                        )}
                        {resultarrx!==null&&(
                            <div className="w-1/4 p-4 border-2 border-yellow-300 rounded bg-yellow-50 shadow">
                                <h4 className="font-bold mb-2">Value of a</h4>
                                {resultarrx.map((item,index)=>(
                                    <p key={index}>
                                        a{index} = {item.toFixed(6)}
                                    </p>
                                ))}
                            </div>
                        )}
                        {result!==null&&(
                            <div className="w-1/4 p-4 border-2 border-cyan-300 rounded bg-cyan-50 shadow">
                                <h4 className="font-bold mb-2">Result</h4>
                                <p>f({xfind}) = {result.toFixed(6)}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            </div>
        </div>
    )
}
export default PolynomialRegression;