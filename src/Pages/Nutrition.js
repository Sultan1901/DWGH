import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Input,
  Button,
  HStack,
  useToast,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

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
      // eslint-disable-next-line
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
      toast({
        title: "Done !",
        description: "Patient added successfuly",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Patient already exists",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const result = async () => {
    try {
      // eslint-disable-next-line
      const data = await axios
        .get(`https://dwgh.herokuapp.com/getPatient/${mrr}`, {
          mrn: mrr,
        })
        .then((result) => {
          setpatt(result.data);
        });
    } catch (error) {}
  };
  const toast = useToast();
  return (
    <ChakraProvider>
      <Box bg="#ebeaea" w="100%" p="4px" pb="9%">
        <VStack>
          <Text textColor="#d2791a" fontSize="70px">
            {" "}
            ICU Calculate
          </Text>
          <HStack>
            {" "}
            <Input
              isInvalid
              errorBorderColor="black"
              w="170px"
              textAlign="center"
              onChange={(e) => setname(e.target.value)}
              placeholder="Name"
              _placeholder={{ color: "inherit" }}
              color="#0f13f1"
            />{" "}
            <Input
              isInvalid
              errorBorderColor="black"
              w="170px"
              textAlign="center"
              onChange={(e) => setmrn(e.target.value)}
              placeholder="MRN"
              _placeholder={{ color: "inherit" }}
              color="#0f13f1"
            />
          </HStack>
          <HStack>
            <Input
              isInvalid
              errorBorderColor="black"
              w="100px"
              textAlign="center"
              onChange={(e) => setag(e.target.value)}
              placeholder="age"
              _placeholder={{ color: "inherit" }}
              color="#0f13f1"
            />{" "}
            <RadioGroup defaultValue="2" onChange={setgender} value={gender}>
              <Stack spacing={1} direction="row">
                <Radio isInvalid colorScheme="blue" value="male">
                  Male
                </Radio>
                <Radio isInvalid colorScheme="blue" value="female">
                  Female
                </Radio>
              </Stack>
            </RadioGroup>
          </HStack>
          <HStack>
            {" "}
            <Input
              isInvalid
              errorBorderColor="black"
              w="170px"
              textAlign="center"
              onChange={(e) => sethh(e.target.value)}
              placeholder="height"
              _placeholder={{ color: "inherit" }}
              color="#0f13f1"
            />{" "}
            <Input
              isInvalid
              errorBorderColor="black"
              w="170px"
              textAlign="center"
              onChange={(e) => setww(e.target.value)}
              placeholder="width"
              _placeholder={{ color: "inherit" }}
              color="#0f13f1"
            />
          </HStack>
          <Input
            isInvalid
            errorBorderColor="black"
            textAlign="center"
            onChange={(e) => setdiagnosis(e.target.value)}
            placeholder="Diagnosis"
            w="270px"
            h="100px"
            _placeholder={{ color: "inherit" }}
            color="#0f13f1"
          />

          {!name ? <></> : <Text>Name : {name}</Text>}
          {!ag ? <></> : <Text>Age : {ag}</Text>}
          {!mrn ? <></> : <Text>MRN : {mrn}</Text>}
          {!diagnosis ? <></> : <Text>Diagnosis : {diagnosis}</Text>}
          {!res ? <></> : <Text>BMI : {res.toFixed(1)}</Text>}
          {!res1 && !res2 ? (
            <></>
          ) : (
            <Text>KCAL : {res1.toFixed(1) + " - " + res2.toFixed(1)}</Text>
          )}
          {!res3 ? <></> : <Text>IBW : {Math.round(res3)}</Text>}
          {!res4 && !res5 ? (
            <></>
          ) : (
            <Text>PROTEIN : {Math.round(res4) + " - " + Math.round(res5)}</Text>
          )}
          {!res6 ? <></> : <Text>FLUID : {Math.round(res6)}</Text>}
          {!res7 ? <></> : <Text>ADW : {Math.round(res7)}</Text>}
          <Button colorScheme="gold" variant="outline" onClick={addpatient}>
            save
          </Button>
          <Input
            isInvalid
            errorBorderColor="black"
            w="170px"
            textAlign="center"
            onChange={(e) => setmrr(e.target.value)}
            placeholder="Enter MRN"
            _placeholder={{ color: "inherit" }}
            color="#0f13f1"
          />
          <Button colorScheme="gold" variant="outline" onClick={result}>
            Get Patient data
          </Button>

          {patt.map((e) => {
            return (
              <>
                <Text>Register time: {e.time.slice(0, 10)}</Text>
                <Text>Name: {e.name}</Text>
                <Text>MRN: {e.mrn}</Text>
                <Text>Age: {e.age}</Text>
                <Text>Gender: {e.gender}</Text>
                <Text>Diagnosis: {e.diagnosis}</Text>
                <Text>Fluid: {e.fluid}</Text>
                <Text>IBW: {e.ibw}</Text>
                <HStack>
                  <Text>KCAL: {e.kcal[0]}</Text>
                  <Text>- {e.kcal[1]}</Text>
                </HStack>
                <HStack>
                  <Text>Protien: {e.protein[0]}</Text>
                  <Text>- {e.protein[1]}</Text>
                  {e.protein[1]}
                </HStack>
              </>
            );
          })}
        </VStack>{" "}
      </Box>
    </ChakraProvider>
  );
};

export default Nutrition;
