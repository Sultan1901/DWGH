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
  SimpleGrid,
  Spinner,
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

  // useEffect(() => {
  //   result();
  // }, [mrr]);

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
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Patient already exists",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // const myTimeout = () => {
  //   setTimeout(result, 2000);
  // };
  // const positions = [
  //       "top",
  //       "top-right",
  //       "top-left",
  //       "bottom",
  //       "bottom-right",
  //       "bottom-left",
  //     ];
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
    } catch (error) {
      
    }
  };
  const toast = useToast();

  return (
    <ChakraProvider>
      <Box>
        <VStack>
          <Box w="100%" bg="#383974">
            <Text color="yellow" align="center" fontSize="50px">
              {" "}
              ICU Calculate
            </Text>
          </Box>

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
              <Stack spacing={2} direction="row">
                <Radio isInvalid colorScheme="red" value="male">
                  Male
                </Radio>
                <Radio isInvalid colorScheme="red" value="female">
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
          {/* 
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
          {!res7 ? <></> : <Text>ADW : {Math.round(res7)}</Text>} */}
          <Button colorScheme="gold" variant="outline" onClick={addpatient}>
            save
          </Button>

          <hr />

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
                <SimpleGrid
                  align="center"
                  height="180px"
                  fontSize="20px"
                  fontWeight="bold"
                  columns={3}
                  spacing={2}
                >
                  <Box bg="silver">Register time: {e.time.slice(0, 10)}</Box>
                  <Box bg="silver">Name: {e.name}</Box>
                  <Box bg="silver">MRN: {e.mrn}</Box>
                  <Box bg="silver">Age: {e.age}</Box>
                  <Box bg="silver">Gender: {e.gender}</Box>
                  <Box bg="silver">Diagnosis: {e.diagnosis}</Box>{" "}
                  <Box bg="silver">Fluid: {e.fluid}</Box>{" "}
                  <Box bg="silver">IBW: {e.ibw}</Box>
                  <Box bg="silver">
                    <Text>
                      KCAL: {e.kcal[0]} - {e.kcal[1]}
                    </Text>
                  </Box>
                  <Box bg="silver">
                    <Text>
                      Protien: {e.protein[0]} - {e.protein[1]}
                    </Text>
                  </Box>
                </SimpleGrid>
              </>
            );
          })}
        </VStack>{" "}
      </Box>
      <Box position="end" mt="12" p="1.5" bg="#383974">
        <Text fontWeight="bold" fontSize="20px" color="yellow" align="center">
          Coded by Sultan Alharbi - All rights reserved © 2022
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default Nutrition;
