import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

const Nutrition = () => {
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
  const [patt, setpatt] = useState([]);
  const [mrr, setmrr] = useState(0);

  useEffect(() => {
    CUL();
  });

  useEffect(() => {
    result();
  }, []);

  const CUL = () => {
    const BMI = (w, h) => {
      w = ww;
      h = hh;

      setres(ww / hh / hh);

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
          return setres1(ww * 25) + setres2(ww * 30);
        } else if (res > 30 && res < 50) {
          return setres1(ww * 11) + setres2(ww * 14);
        } else if (res > 50 && gender === "male") {
          return setres1(hh * hh * 24 * 22) + setres2(hh * hh * 24 * 25);
        } else if (res > 50 && gender === "female") {
          return setres1(hh * hh * 22.5 * 22) + setres2(hh * hh * 22.5 * 25);
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
          return setres4(ww * 1.2) + setres5(ww * 2);
        } else if (res > 30) {
          return setres4(res3 * 2) + setres5(res3 * 2.5);
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

  const addpatient = async () => {
    try {
      const insert = await axios.post(`https://dwgh.herokuapp.com/addPatient`, {
        name: name,
        mrn: mrn,
        age: ag,
        diagnosis: diagnosis,
        gender: gender,
        bmi: res.toFixed(1),
        kcal: [res1.toFixed(1), res2.toFixed(1)],
        ibw: Math.round(res3),
        protein: [Math.round(res4), Math.round(res5)],
        fluid: Math.round(res6),
        adw: Math.round(res7),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const result = async () => {
    const data = await axios
      .get(`https://dwgh.herokuapp.com/getPatient/:${mrr}`, {
        mrn: mrr,
      })
      .then((result) => {
        setpatt(result.data);
        console.log(patt);
      });
  };
  return (
    <div id="bd">
      <Nav>
        <Nav.Item>
          <Nav.Link href="/Print">Refresh</Nav.Link>
        </Nav.Item>
      </Nav>
      <Stack gap={2} className="col-md-6 mx-auto">
        <Stack className="row-ml-6 mx-auto" gap={2}>
          <h3 className="mb-2"> ICU Calculate</h3>
        </Stack>

        <InputGroup>
          <Form.Control
            onChange={(e) => setname(e.target.value)}
            placeholder="Name"
          />
          <Form.Control
            onChange={(e) => setmrn(e.target.value)}
            placeholder="MRN"
          />
          <Form.Control
            onChange={(e) => setww(e.target.value)}
            placeholder="width"
          />
          <Form.Control
            onChange={(e) => sethh(e.target.value)}
            placeholder="height"
          />
          <Form.Control
            onChange={(e) => setdiagnosis(e.target.value)}
            placeholder="Diagnosis"
          />
          <Form.Control
            onChange={(e) => setag(e.target.value)}
            placeholder="age"
          />{" "}
          <p> Male </p>
          <input
            onChange={(e) => setgender(e.target.value)}
            type="radio"
            name="gender"
            id="male"
            value="male"
          ></input>
          <br />
          <p>Female</p>
          <input
            className="row-ml-6"
            onChange={(e) => setgender(e.target.value)}
            type="radio"
            name="gender"
            id="female"
            value="female"
          ></input>{" "}
        </InputGroup>
      </Stack>{" "}
      <Stack className="col-md-6 mx-auto" gap={0}>
        <hr />
        {!name ? <></> : <h6>Name : {name}</h6>}
        {!name ? <></> : <h6>Name : {ag}</h6>}
        {!mrn ? <></> : <h6>MRN : {mrn}</h6>}
        {!diagnosis ? <></> : <h6>Diagnosis : {diagnosis}</h6>}
        {!res ? <></> : <h6>BMI : {res.toFixed(1)}</h6>}
        {!res1 && !res2 ? (
          <></>
        ) : (
          <h6>KCAL : {res1.toFixed(1) + " - " + res2.toFixed(1)}</h6>
        )}
        {!res3 ? <></> : <h6>IBW : {Math.round(res3)}</h6>}
        {!res4 && !res5 ? (
          <></>
        ) : (
          <h6>PROTEIN : {Math.round(res4) + " - " + Math.round(res5)}</h6>
        )}
        {!res6 ? <></> : <h6>FLUID : {Math.round(res6)}</h6>}
        {!res7 ? <></> : <h6>ADW : {Math.round(res7)}</h6>}
        {/* <Text color="black" fontSize="12px">
          on {e.time.slice(0, 10)} {e.time.slice(11, 16)}
        </Text> */}
        {/* <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> */}
        <button onClick={addpatient}>save</button>
        <hr />
        <input
          onChange={(e) => setmrr(e.target.value)}
          placeholder="Enter MRN"
        ></input>
        <hr />
        <button onClick={result}>Get Patient data</button>
        {patt.map((e) => {
          return (
            <>
              <p>Register time: {e.time.slice(0, 10)}</p>
              <p>Name: {e.name}</p>
              <p>MRN: {e.mrn}</p>
              <p>Age: {e.age}</p>
              <p>Gender: {e.gender}</p>
              <p>Diagnosis: {e.diagnosis}</p>
              <p>Fluid: {e.fluid}</p>
              <p>IBW: {e.ibw}</p>
              <p>
                KCAL Min: {e.kcal[0]}
                <p>KCAL Max: {e.kcal[1]}</p>
              </p>

              <p>
                Protien Min: {e.protein[0]}
                <p>Protien Max: {e.protein[1]}</p>
              </p>
            </>
          );
        })}
      </Stack>
      <Card className="text-center">
        <Card.Header>Only for noncommercial use</Card.Header>
        <Card.Body>
          <Card.Title>using this App only for personal purpose </Card.Title>
          <Card.Text>
            all results checked and tested by Nutrition Team
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          Coded by Sultan Alharbi <br />
          All Rights Reserved © 2022
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Nutrition;
