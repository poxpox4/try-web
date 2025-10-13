import { useState } from "react";
import { evaluate } from "mathjs";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Plot from "react-plotly.js";
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import axios from "axios";
function Graphical() {
  const [fx, setFx] = useState("");
  const [range, setRange] = useState(10);
  const [xstart, setXStart] = useState(0);
  const [result, setResult] = useState(null);
  const [iteration, setIteration] = useState([]);
  //backend
  const [selectId,setSelectId] = useState("");
  const queryClient = useQueryClient();
  //get DB
  const {data: equation = [] ,isLoading, error: fetchError } = useQuery({
    queryKey: ["equation"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/root");
      return res.data.results || [];
    }
  })
  //select
  const Select = (e) => {
    const id = e.target.value;
    setSelectId(id);
    const found = equation.find((eq) => eq.ID === parseInt(id));
    if(found) setFx(found.equation);
  }
  //Add
  const addEquationMutation = useMutation({
    mutationFn: async (newEquation) => {
      const res = await axios.post("http://localhost:5000/root",{equation:newEquation});
      return res.data;
    },
    onSuccess: (data) => {
      if(data.success){
        alert("บันทึกสมการสำเร็จ");
        queryClient.invalidateQueries({queryKey:["equation"]});
      }
    }
  })
  const AddEquation = () =>{
    const trimfx = fx.trim();
    const isSameequation = equation.some(eq => eq.Equation.trim().toLowerCase() === trimfx.toLowerCase());
    if(isSameequation){
      alert("มีสมการนี้อยู่แล้ว");
      return;
    }
    addEquationMutation.mutate(trimfx);
  }
  function Calculate() {
      try {
        const variableMatch = fx.match(/[a-zA-Z]+/g);
        const variable = variableMatch
          ? variableMatch[variableMatch.length - 1]
          : "x";

        let start = parseFloat(xstart);
        let end = parseFloat(range);
        let step = 1;

        const resultarr = [];
        let prevY = evaluate(fx, { [variable]: start });
        resultarr.push({ x: start, y: prevY });

        // หา sign-change
        let rootStart = start;
        let rootEnd = end;
        for (let i = start + step; i <= end; i += step) {
          const y = evaluate(fx, { [variable]: i });
          resultarr.push({ x: i, y: y });
          if (prevY * y < 0) {
            rootStart = i - step;
            rootEnd = i;
            break;
          }
          prevY = y;
        }

        // refine ทีละ 0.1 แล้ว 0.01 ... 
        let stepRefine = 0.1;
        let root = rootStart;

        const usedX = new Set(); // ❗ เก็บค่า x ที่เคยใช้แล้ว

        while (stepRefine >= 0.0000001) {
          let found = false;
          for (let i = rootStart + stepRefine; i <= rootEnd; i += stepRefine) {
            if (usedX.has(i.toFixed(7))) continue; // ❗ ข้ามค่าที่เคยเจอ

            const y = evaluate(fx, { [variable]: i });
            resultarr.push({ x: i, y: y });
            usedX.add(i.toFixed(7)); // ✅ บันทึกค่า x ที่ใช้ไปแล้ว
            
            // ✅ เงื่อนไขหยุดเมื่อ |f(x)| <= 0.000001
            if (Math.abs(y) <= 0.000001) {
              root = i;
              found = true;
              stepRefine = 0; // หยุด refinement ทั้งหมด
              break;
            }

            // ถ้ายังไม่เข้าเงื่อนไข ให้เช็กทิศทาง
            if (y > 0) {
              rootEnd = i;
              root = i - stepRefine;
              found = true;
              break;
            } else {
              root = i;
            }
          }

          if (stepRefine === 0) break; // ✅ หยุดจริงถ้าเจอ root แล้ว

          // จำกัดช่วงให้แคบลงรอบ root
          rootStart = root;
          rootEnd = root + stepRefine * 2;
          stepRefine /= 10;

          if (!found) break;
    }


        setResult(root);
        setIteration(resultarr);
      } catch {
        alert("สมการผิด");
      }
  }
  if(isLoading) return <div>Loading...</div>
  if(fetchError) return <div>Error fetch</div>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
      <h1 className="font-bold text-3xl">Graphical Method</h1>

      <MathJaxContext>
        <div className="w-full max-w-4xl px-4">
          <div className="bg-white-50 rounded-2xl shadow-md mt-1 p-4 text-center">
            <MathJax className="text-3xl">
              {"\\[f(x)=" + (fx || "\\;...\\;") + "\\]"}
            </MathJax>
          </div>
        </div>
      </MathJaxContext>

      <div className="w-full max-w-xl space-y-3 mt-1 px-10 py-10 bg-white-50 rounded-2xl shadow-md text-center">
        <label htmlFor="">เลือกสมการ</label>
        <select 
        className="shadow-md w-full rounded px-4 py-2 text-center"
        value={selectId}
        onChange={Select}>
          <option value="">เลือกสมการ</option>
          {equation.map((eq) => (
            <option key={eq.ID} value={eq.ID}>{eq.Equation}</option>
          ))}
        </select>
        <div className="flex justify-center">
          <button
          className="bg-green-500 hover:bg-green-600 rounded px-4 py-2 text-white"
          onClick={AddEquation}>
            +
          </button>
        </div>
        <div>
          <label className="block mb-1">f(X)</label>
          <input
            type="text"
            placeholder="x^3-7x^2+14x-6"
            className="shadow-md px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
            value={fx}
            onChange={(e) => setFx(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">X Start</label>
          <input
            type="number"
            placeholder="0"
            className="shadow-md px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
            value={xstart}
            onChange={(e) => setXStart(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">X End</label>
          <input
            type="number"
            placeholder="10"
            className="shadow-md px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={Calculate}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-white rounded"
      >
        Calculate
      </button>

      <div className="mt-1 px-4 py-10 bg-white-50 shadow-md rounded-2xl w-full max-w-4xl text-center">
        <h2 className="font-bold text-xl mb-3">Solution</h2>
        {result !== null && (
          <div className="text-xl mb-3">Result is : {result.toFixed(6)}</div>
        )}
        {iteration.length > 0 && (
          <table className="border border-collapse border-gray-400 w-full">
            <thead>
              <tr>
                <MathJaxContext>
                    <th className="border px-2 py-1"><MathJax>{"\\[Iteration\\]"}</MathJax></th>
                    <th className="border px-2 py-1 text-xl"><MathJax>{"\\[x_i\\]"}</MathJax></th>
                    <th className="border px-2 py-1 text-xl"><MathJax>{"\\[y_i\\]"}</MathJax></th>
                </MathJaxContext>
              </tr>
            </thead>
            <tbody>
              {iteration.map((item, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{index}</td>
                  <td className="border px-2 py-1">{item.x.toFixed(6)}</td>
                  <td className="border px-2 py-1">{item.y.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="w-full max-w-4xl mt-1 bg-white-50 p-4 shadow-md rounded-2xl">
        <Plot
          useResizeHandler={true}
          data={[
            {
              x: iteration.map((item) => item.x),
              y: iteration.map((item) => item.y),
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "black" },
              line: { color: "gray" },
            },
          ]}
          layout={{
            autosize: true,
            responsive: true,
            title: { text: "Graph Graphical Method" },
            xaxis: { title: { text: "x" } },
            yaxis: { title: { text: "f(x)" } },
          }}
          style={{ width: "100%", height: "500px" }}
        />
      </div>
    </div>
  );
}

export default Graphical;
