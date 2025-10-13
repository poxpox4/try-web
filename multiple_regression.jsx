import { useState } from "react";

function MultipleRegression() {
    const [x, setX] = useState([[]]);
    const [fx, setFx] = useState([]);
    const [xfind, setXfind] = useState([]);
    const [result, setResult] = useState(null);
    const [resultarrx, setResultarrayx] = useState(null);
    const [points, setPoints] = useState(7);
    const [k, setK] = useState(3);

    // ✅ data แถวละ (k ตัวแปร + 1 ช่อง f(X))
    const [data, setData] = useState(
        Array.from({ length: 7 }, () => Array(3 + 1).fill(""))
    );

    // ✅ เมื่อเปลี่ยนจำนวนจุด
    const handlePointsChange = (e) => {
        const newPoints = parseInt(e.target.value) || 0;
        setPoints(newPoints);
        setData(Array.from({ length: newPoints }, () => Array(k + 1).fill("")));
    };

    // ✅ เมื่อเปลี่ยนจำนวนตัวแปร (k)
    const handleKChange = (e) => {
        const newK = parseInt(e.target.value) || 0;
        setK(newK);
        setData(Array.from({ length: points }, () => Array(newK + 1).fill("")));
    };

    // ✅ เมื่อกรอกค่าในตาราง
    const handleChange = (row, col, value) => {
        const newData = data.map((r, i) =>
        i === row
            ? (() => {
                const newRow = [...r];
                newRow[col] = value;
                return newRow;
            })()
            : r
        );
        setData(newData);

        // แยกค่า X และ f(X)
        const X = newData.map((r) => r.slice(0, k).map(Number));
        const FX = newData.map((r) => Number(r[k]));
        setX(X);
        setFx(FX);
    };

    // ✅ ฟังก์ชันคำนวณแบบ Gauss-Jordan
    function Gaussjordan(arr, resultarr) {
        const K = parseFloat(k) + 1;
        for (let i = 0; i < K; i++) {
        let forward = arr[i][i];
        if (forward === 0) {
            for (let k = i + 1; k < K; k++) {
            if (arr[k][i] !== 0) {
                [arr[i], arr[k]] = [arr[k], arr[i]];
                forward = arr[i][i];
                break;
            }
            }
        }
        for (let j = 0; j <= K; j++) {
            arr[i][j] /= forward;
        }
        for (let k = 0; k < K; k++) {
            if (k !== i) {
            let down = arr[k][i];
            for (let j = i; j <= K; j++) {
                arr[k][j] -= down * arr[i][j];
            }
            }
        }
        }
        for (let i = 0; i < K; i++) {
        resultarr[i] = arr[i][K];
        }
    }

    // ✅ ฟังก์ชันคำนวณ Regression
    function Calculate() {
        try {
        const K = parseFloat(k) + 1;
        const N = x.length;
        if (!K || !x || !fx || !xfind) {
            alert("กรุณากรอก k, x, f(x) , และ X Value ให้ครบก่อนคำนวณ");
            return;
        }
        if (fx.length !== N) {
            alert("จำนวนตัวอย่างใน X และ f(X) ต้องเท่ากัน");
            return;
        }

        let X = x.map((row) => [1, ...row]);
        let Y = [...fx];
        let sumx = Array(K).fill(0);
        let sumy = 0;
        let sumxx = Array.from(Array(K), () => Array(K).fill(0));
        let sumxy = Array(K).fill(0);

        for (let i = 0; i < N; i++) {
            sumy += Y[i];
            for (let j = 0; j < K; j++) {
            sumx[j] += X[i][j];
            sumxy[j] += X[i][j] * Y[i];
            for (let k = 0; k < K; k++) {
                sumxx[j][k] += X[i][j] * X[i][k];
            }
            }
        }

        let arrcal = Array.from(Array(K), () => Array(K + 1).fill(0));
        for (let i = 0; i < K; i++) {
            for (let j = 0; j < K; j++) {
            if (i === 0 && j === 0) arrcal[i][j] = N;
            else if (i === 0 && j > 0) arrcal[i][j] = sumx[j];
            else if (j >= i) arrcal[i][j] = sumxx[i][j];
            else arrcal[i][j] = arrcal[j][i];
            }
            arrcal[i][K] = i === 0 ? sumy : sumxy[i];
        }

        let result = Array(K);
        Gaussjordan(arrcal, result);
        setResultarrayx(result);

        // คำนวณค่า f(xfind)
        let fxcal = result[0];
        for (let i = 0; i < K - 1; i++) {
            fxcal += result[i + 1] * xfind[i];
        }
        setResult(fxcal);
        } catch {
        alert("สมการผิด");
        }
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen space-y-6 p-6">
        <h1 className="font-bold text-3xl mb-4">Multiple Linear Regression</h1>

        {/* ✅ Input Section */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 space-y-4">
            <div className="flex flex-wrap gap-4 items-center justify-center">
            <label className="font-semibold">Number of points:</label>
            <input
                type="number"
                value={points}
                min={1}
                className="shadow-md shadow-sm rounded-md p-2 text-center w-20"
                onChange={handlePointsChange}
            />

            <label className="font-semibold">k:</label>
            <input
                type="number"
                value={k}
                min={1}
                className="shadow-md shadow-sm rounded-md p-2 text-center w-20"
                onChange={handleKChange}
            />
            </div>

            {/* ✅ Table */}
            <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                <tr>
                    {Array.from({ length: k }, (_, i) => (
                    <th key={i} className="p-2 text-center">
                        X{i + 1}
                    </th>
                    ))}
                    <th className="p-2 text-center">f(X)</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                    {row.map((val, j) => (
                        <td key={j} className="p-1">
                        <input
                            type="number"
                            value={val}
                            className="w-full text-center shadow-md rounded-md px-1 py-1"
                            onChange={(e) => handleChange(i, j, e.target.value)}
                        />
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {/* ✅ X Value */}
            <div className="text-center mt-4">
            <label className="block mb-2 font-semibold">X Value</label>
            <input
                type="text"
                placeholder="Ex. 4,5,7"
                className="rounded shadow-md w-full px-3 py-2 text-center"
                onChange={(e) => setXfind(e.target.value.split(",").map(Number))}
            />
            </div>
        </div>

        {/* ✅ Calculate Button */}
        <button
            onClick={Calculate}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-white sm:w-auto"
        >
            Calculate
        </button>

        {/* ✅ Result Section */}
        <div className="mt-1 px-4 py-10 bg-white shadow-md rounded-2xl w-full max-w-4xl text-center">
            <h2 className="font-bold text-xl mb-4">Solution</h2>
            {resultarrx !== null && (
            <div className="text-center mb-2">
                f(x) ={" "}
                {resultarrx
                .map((val, i) =>
                    i === 0
                    ? `${val.toFixed(4)}`
                    : ` + (${val.toFixed(4)})X${i}`
                )
                .join("")}
            </div>
            )}
            {result !== null && (
            <div className="text-center text-lg">
                f(xfind) = {result.toFixed(6)}
            </div>
            )}
        </div>
        </div>
    );
}

export default MultipleRegression;
