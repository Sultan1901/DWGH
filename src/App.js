import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [ww, setww] = useState(0);
  const [hh, sethh] = useState(0);
  const [ag, setag] = useState(0);
  const [gender, setgender] = useState("");
  const [name, setname] = useState("");
  const [diagnosis, setdiagnosis] = useState("");
  const [mrn, setmrn] = useState(0);
  const [res, setres] = useState(0);
  const [res1, setres1] = useState(0);
  const [res2, setres2] = useState(0);
  const [res3, setres3] = useState(0);
  const [res4, setres4] = useState(0);
  const [res5, setres5] = useState(0);
  const [res6, setres6] = useState(0);
  const [res7, setres7] = useState(0);

  useEffect(() => {
    CUL();
  });

  const CUL = () => {
    const BMI = (w, h) => {
      w = ww;
      h = hh;
      let Num = 0;
      Num = w / h / h;
      setres(Number(Num));

      const IBW = (g) => {
        g = gender;

        if (gender === "male") {
          setres3(hh * hh * 24);
        } else if (gender === "female") {
          setres3(hh * hh * 22.5);
        }
      };
      IBW();
      const KCAL = (g) => {
        g = gender;
        if (res < 30) {
         return setres1(ww * 25)+ setres2(ww * 30);
        } else if (res > 30 && res < 50) {
         return setres1(ww * 11)+ setres2(ww * 14);
        } else if (res > 50 && gender === "male") {
         return setres1(hh * hh * 24 * 22)+ setres2(hh * hh * 24 * 25);
        } else if (res > 50 && gender === "female") {
        return setres1(hh * hh * 22.5 * 22)+ setres2(hh * hh * 22.5 * 25);
        }
      };
      KCAL();

      const FLUID = (age) => {
        age = ag;
        if (age > 18 && res > 30 && gender === "male")
          return setres6(hh * hh * 24 * 25);
        else if (age > 18 && res > 30 && gender === "female")
          return setres6(hh * hh * 25 * 22.5);
        else if (age > 18 && res < 30) return setres6(ww * 30);
      };
      FLUID();

      const PROTEIN = () => {
        if (res < 30) {
         return setres4(ww * 1.2)+ setres5(ww * 2);
        } else if (res > 30) {
         return setres4(res3 * 2)+ setres5(res3 * 2.5);
        }
      };
      PROTEIN();
      const ADW = () => {
        setres7(0.25 * (ww - res3) + res3);
      };
      ADW();
    };
    BMI();
  };
  return (
    <div>
      <h3> ICU Calculate</h3>
      <input
        onChange={(e) => setname(e.target.value)}
        placeholder="Name"
      ></input>{" "}
      <input onChange={(e) => setmrn(e.target.value)} placeholder="MRN"></input>
  
      <input
        onChange={(e) => setww(e.target.value)}
        placeholder="width"
      ></input>{" "}
      <input
        onChange={(e) => sethh(e.target.value)}
        placeholder="height"
      ></input>
      <input
        onChange={(e) => setdiagnosis(e.target.value)}
        placeholder="Diagnosis"
      ></input>{" "}
      <input onChange={(e) => setag(e.target.value)} placeholder="age"></input>{" "}
      <label for="male"> Male </label>
      <input
        onChange={(e) => setgender(e.target.value)}
        type="radio"
        name="gender"
        id="male"
        value="male"
      ></input>
     <br/>
      <label for="female"> Female </label>
      <input
        onChange={(e) => setgender(e.target.value)}
        type="radio"
        name="gender"
        id="female"
        value="female"
      ></input>
      {/* <button onClick={CUL}>Calculate</button> */}
      <hr/>
      <h5>Name = {name}</h5>
      <h6>MRN = {mrn}</h6>
      <h6>BMI = {res.toFixed(1)}</h6>
      <h6>KCAL = {res1.toFixed(1) + " - " + res2.toFixed(1)}</h6>
      <h6>IBW = {Math.round(res3)}</h6>
      <h6>PROTEIN = {Math.round(res4) + " - " + Math.round(res5)}</h6>
      <h6>FLUID = {Math.round(res6)}</h6>
      <h6>ADW = {Math.round(res7)}</h6>
      <h6>Diagnosis = {diagnosis}</h6>
    </div>
  );
}

export default App;
