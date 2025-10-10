import { useState } from "react";
function MatrixInvert(){
    const [fx,setFx] = useState("");
    const [n,setN] = useState(3);
    const [matrixA,setMatrixA] = useState(Array(3).fill().map(()=>Array(3).fill("")));
    const [matrixB,setMatrixB] = useState(Array(3).fill(""));
    const [result,setResult] = useState([]);
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
    function Changesize(value){
        const size = parseFloat(value) || 0;
        setN(size);
        setMatrixA(Array(size).fill().map(()=>Array(size).fill("")));
        setMatrixB(Array(size).fill(""));
        setResult([]);
    }
    function Gauss_invert(arr){
        const size = n;
        let aug = arr.map((row,i)=>[
            ...row.map(value=>parseFloat(value)),
            ...Array.from({length:size},(_,j)=>(i==j ? 1 :0))
        ]);

        for(let i=0;i<size;i++){
            let forward = aug[i][i];
            if(forward==0){
                for(let k=i+1;k<size;k++){
                    if(aug[k][i]!=0){
                        [aug[i],aug[k]] = [aug[k],aug[i]];
                        forward = aug[i][i];
                        break;
                    }
                }
            }
            for(let j=0;j<2*size;j++){
                aug[i][j] /= forward; 
            }
            for(let k=0;k<size;k++){
                if(k!=i){
                    let down = aug[k][i];
                    for(let j=i;j<2*size;j++){
                        aug[k][j] -= down*aug[i][j];
                    }
                }
            } 
        }
        const inverse = aug.map(row => row.slice(size, 2 * size));
        return inverse;
    }
    function Calculate(){
        try{
            if(matrixA.every(row=>row.every(value=>value==""))){
                alert("Matrix A ยังไม่ได้ใส่ค่า");
                return;
            }
            if(matrixB.every(value=>value=="")){
                alert("Matrix B ยังไม่ได้ใส่ค่า");
                return;
            }
            const size = n;
            const A = matrixA.map(row => row.map(value => parseFloat(value)));
            const B = matrixB.map(value => parseFloat(value));
            const matrixAcal = Gauss_invert(A);
            let resultarr = matrixAcal.map(row => row.reduce((sum,value,j) => sum+value*B[j],0));
            setResult(resultarr);
        }
        catch{
            ("ใส่ค่าให้ครบ");
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
            <h1 className="font-bold text-3xl">Matrix Inversion</h1>
            <div className="flex items-center gap-3 p-5 rounded-2xl shadow-md">
                <label className="text-lg">Matrix size (NxN)</label>
                <input type="number" 
                min={1}
                className="shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 w-20 text-center rounded-lg" 
                value={n}
                onChange={(e) => Changesize(e.target.value)}/>
                <button onClick={Calculate} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-white sm:w-auto">Calculate</button>
            </div>
            <div className="flex md:flex-row gap-6 w-full justify-center items-center">
                <div className="flex flex-col items-center">
                    <h2 className="mb-2 ">[A]</h2>
                    {matrixA.map((row,i)=>(
                        <div key={i} className="flex gap-2 mb-1">
                            {row.map((value,j)=>(
                                <input type="text"
                                key={j}
                                placeholder={`a${i+1}${j+1}`}
                                className="shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 p-7 w-20 text-center mb-1 rounded-lg"
                                value={value}
                                onChange={(e)=> ChangematrixA(i,j,e.target.value)}/>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="mb-2">{"{x}"}</h2>
                    {Array.from({length:n},(_,i)=>(
                        <div key={i} className="flex gap-2 mb-1">
                            <div className="shadow-md p-7 w-20 text-center mb-1 rounded-lg bg-gray-100 text-gray-400">
                                x{i+1}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center justify-center mt-6">
                    <h2 className="text-3xl">=</h2>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="mb-2">{"{B}"}</h2>
                    {matrixB.map((value,i)=>(
                        <div className="flex gap-2 mb-1">
                            <input type="text"
                            key={i}
                            placeholder={`b${i+1}`} 
                            className="shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 p-7 w-20 text-center mb-1 rounded-lg"
                            value={value}
                            onChange={(e) => ChangematrixB(i,e.target.value)}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 px-4 py-6 sm:py-10 bg-white shadow-md rounded-2xl w-full max-w-4xl text-center">
                <h2 className="font-bold text-xl mb-2">Solution</h2>
                {result.length>0&&result.map((r,i)=>(
                    <p className="text-lg" key={i}>x{i+1} = {r.toFixed(6)}</p>
                ))}
            </div>
        </div>
    )
}
export default MatrixInvert;