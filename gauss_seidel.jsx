import { use, useState } from "react";
function Gauss_seidal(){
    const [n,setN] = useState(3);
    const [matrixA,setMatrixA] = useState(Array(3).fill().map(()=>Array(3).fill("")));
    const [matrixB,setMatrixB] = useState(Array(3).fill(""));
    const [xt,setXt] = useState(Array(3).fill(""));
    const [result,setResult] = useState(null);
    const [error,setError] = useState();
    function Changesize(value){
        const size = parseFloat(value) || 0;
        setN(size);
        setMatrixA(Array(size).fill().map(()=>Array(size).fill("")));
        setMatrixB(Array(size).fill(""));
        setXt(Array(size).fill(""));
        setResult([]);
    }
    function ChangematrixA(i,j,value){
        const newA = [...matrixA];
        newA[i][j] = value;
        setMatrixA(newA);
    }
    function ChangematrixB(i,value){
        const newB = [...matrixB];
        newB[i] = value;
        setMatrixB(newB);
    }
    function ChangeXt(i,value){
        const newXt = [...xt];
        newXt[i] = value;
        setXt(newXt);
    }
    function Calculate(){
        try{
            const A = matrixA.map(row=>row.map(value=>parseFloat(value)));
            const B = matrixB.map(value=>parseFloat(value));
            let xk0 = xt.map(value=>parseFloat(value) || 0);
            let xk1 = Array(n).fill(0);
            const agree = parseFloat(error);
            let errorcal = Array(n);
            let errorarr = Array(n);
            let iter = 0;
            do{
                for(let i=0;i<n;i++){
                    let sum = 0;
                    for(let j=0;j<n;j++){
                        if(j!=i){
                            sum += A[i][j]*xk0[j]
                        }
                    }
                    xk1[i] = (B[i]-sum)/A[i][i];
                }
                for(let i=0;i<n;i++){
                    errorcal[i] = Math.abs((xk1[i]-xk0[i])/xk1[i]);
                }
                for(let i=0;i<n;i++){
                    xk0[i] = xk1[i];
                }
                errorarr = [...errorcal];
                iter++;
            }while(Math.max(...errorarr)>agree&&iter<100);
            setResult(xk1);

        }
        catch{
            alert("สมการผิด");
        }
    }
    return(
        <div className="flex flex-col items-center justify-center p-4 space-y-4 min-h-screen">
            <h1 className="text-3xl font-bold">Gauss-Seidel</h1>
            <div className="flex items-center gap-3 p-5 rounded-2xl shadow-md">
                <label >Matrix size(NxN)</label>
                <input type="number" 
                placeholder="2"
                className="shadow-md rounded-lg p-4 w-20 text-center"
                min={1}
                value={n}
                onChange={(e) => Changesize(e.target.value)}/>
                <label >Error</label>
                <input type="number" 
                placeholder="0.00001"
                className="shadow-md rounded-lg p-4  w-20 text-center"
                value={error}
                onChange={(e) => setError(e.target.value)}/>
                <button onClick={Calculate} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white">Calculate</button>
            </div>
            <h2>X start</h2>
            <div className="flex items-center">
                {xt.map((value,i)=>(
                    <div className="flex gap-2">
                        <input type="text" 
                        placeholder={`x${i+1}`}
                        className="shadow-md rounded-lg p-7 w-20 text-center"
                        value={value}
                        onChange={(e) => ChangeXt(i,e.target.value)}/>
                    </div>
                ))}
            </div>
            <div className="flex  items-center gap-6 w-full justify-center">
                <div className="flex flex-col items-center">
                    <h2>[A]</h2>
                    {matrixA.map((row,i)=>(
                        <div key={i} className="flex gap-1">
                            {row.map((value,j)=>(
                                <input type="text"
                                placeholder={`a${i+1}${i+1}`}
                                className="shadow-md rounded-lg p-7 w-20 text-center"
                                value={value}
                                onChange={(e) => ChangematrixA(i,j,e.target.value)}/>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center">
                    <h2>{"{x}"}</h2>
                    {Array.from({length:n},(_,i)=>(
                        <div key={i} className="flex gap-2">
                            <div className="shadow-md rounded-lg p-7 w-20 text-center ">
                                x{i+1}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl">=</h2>
                </div>
                <div className="flex flex-col items-center">
                    <h2>{"{B}"}</h2>
                    {matrixB.map((value,i)=>(
                        <div className="flex gap-2 ">
                            <input type="text"
                            key={i}
                            placeholder={`b${i+1}`} 
                            className="shadow-md rounded-lg p-7 w-20 text-center"
                            value={value}
                            onChange={(e) => ChangematrixB(i,e.target.value)}/>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="font-bold text-xl">Solution</h2>
                {result!==null&&result.length>0&&result.map((r,i)=>(
                    <p key={i}>x{i+1} = {r.toFixed(6)}</p>
                ))}
            </div>
        </div>
    )
}
export default Gauss_seidal;