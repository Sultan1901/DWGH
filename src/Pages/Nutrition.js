import React, { useRef, useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
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
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Patient already exists",
        status: "error",
        duration: 3000,
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
          toast({
            title: "Done !",
            description: "Patient Data Loaded successfuly",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
        });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Patient Not Found",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const toast = useToast();

  const [Click1, setClick1] = useState(false);
  const Click = () => {
    setClick1(true);
  };
  const refresh = () => {
    window.location.reload(false);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <ChakraProvider>
      <Box h="100%">
        <VStack>
          <Box w="100%" bg="black">
            <Text color="yellow" align="center" fontSize="40px">
              {" "}
              ICU Calculate
            </Text>
          </Box>
          <HStack>
            <HStack>
              <Button colorScheme="teal" variant="outline" onClick={refresh}>
                Refresh
              </Button>
            </HStack>{" "}
            <Input
              isInvalid
              errorBorderColor="black"
              w="170px"
              textAlign="center"
              onChange={(e) => setname(e.target.value)}
              placeholder="Name"
              _placeholder={{ color: "inherit" }}
              color="black"
            />{" "}
            <Input
              isInvalid
              errorBorderColor="black"
              w="170px"
              textAlign="center"
              onChange={(e) => setmrn(e.target.value)}
              placeholder="MRN"
              _placeholder={{ color: "inherit" }}
              color="black"
            />
            <Input
              isInvalid
              errorBorderColor="black"
              textAlign="center"
              onChange={(e) => setdiagnosis(e.target.value)}
              placeholder="Diagnosis"
              w="170px"
              _placeholder={{ color: "inherit" }}
              color="black"
            />
          </HStack>
          <HStack>
            <Input
              isInvalid
              errorBorderColor="black"
              w="100px"
              textAlign="center"
              onChange={(e) => setag(e.target.value)}
              placeholder="Age"
              _placeholder={{ color: "inherit" }}
              color="black"
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
              placeholder="Height"
              _placeholder={{ color: "inherit" }}
              color="black"
            />{" "}
            <Input
              isInvalid
              errorBorderColor="black"
              w="170px"
              textAlign="center"
              onChange={(e) => setww(e.target.value)}
              placeholder="Weight"
              _placeholder={{ color: "inherit" }}
              color="black"
            />
          </HStack>

          {!Click1 ? (
            <></>
          ) : (
            <SimpleGrid
              align="center"
              fontSize="15px"
              fontWeight="bold"
              columns={5}
              spacing={4}
              mb="100px"
              border="black solid 2px"
              borderRadius="9"
              p="3"
            >
              <Box borderRadius="3px" bg="silver">
                Name: {name}
              </Box>
              <Box borderRadius="3px" bg="silver">
                MRN: {mrn}
              </Box>
              <Box borderRadius="3px" bg="silver">
                Age: {ag}
              </Box>
              <Box borderRadius="3px" bg="silver">
                Gender: {gender}
              </Box>
              <Box borderRadius="3px" bg="silver">
                Diagnosis: {diagnosis}
              </Box>{" "}
              <Box borderRadius="3px" bg="silver">
                Fluid: {Math.round(res6)}
              </Box>{" "}
              <Box borderRadius="3px" bg="silver">
                IBW: {Math.round(res3)}
              </Box>
              <Box borderRadius="3px" bg="silver">
                ADW: {Math.round(res7)}
              </Box>
              <Box borderRadius="3px" bg="silver">
                KCAL: {res1.toFixed()} - {res2.toFixed()}
              </Box>
              <Box borderRadius="3px" bg="silver">
                Protien: {Math.round(res4)} - {Math.round(res5)}
              </Box>
            </SimpleGrid>
          )}
          <Button colorScheme="teal" variant="outline" onClick={Click}>
            Calculate
          </Button>
          <Button colorScheme="teal" variant="outline" onClick={addpatient}>
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
            color="black"
          />
          <Button colorScheme="teal" variant="outline" onClick={result}>
            Get Patient data
          </Button>
          <Box h="205px">
            {patt.map((e) => {
              return (
                <>
                  <Button
                    m="3"
                    colorScheme="teal"
                    variant="outline"
                    onClick={handlePrint}
                  >
                    Print !
                  </Button>{" "}
                  <SimpleGrid
                    align="center"
                    fontSize="15px"
                    fontWeight="bold"
                    columns={4}
                    spacing={4}
                    mb="100px"
                    ref={componentRef}
                  >
                    <Box borderRadius="3px" bg="silver">
                      Register date: {e.time.slice(0, 10)}
                    </Box>
                    <Box borderRadius="3px" bg="silver">
                      Name: {e.name}
                    </Box>
                    <Box borderRadius="3px" bg="silver">
                      MRN: {e.mrn}
                    </Box>
                    <Box borderRadius="3px" bg="silver">
                      Age: {e.age}
                    </Box>
                    <Box borderRadius="3px" bg="silver">
                      Gender: {e.gender}
                    </Box>
                    <Box borderRadius="3px" bg="silver">
                      Diagnosis: {e.diagnosis}
                    </Box>{" "}
                    <Box borderRadius="3px" bg="silver">
                      Fluid: {e.fluid}
                    </Box>{" "}
                    <Box borderRadius="3px" bg="silver">
                      IBW: {e.ibw}
                    </Box>
                    <Box borderRadius="3px" bg="silver">
                      ADW: {e.adw}
                    </Box>
                    <Box borderRadius="3px" bg="silver">
                      KCAL: {e.kcal[0]} - {e.kcal[1]}
                    </Box>
                    <Box borderRadius="3px" bg="silver">
                      Protien: {e.protein[0]} - {e.protein[1]}
                    </Box>
                  </SimpleGrid>
                </>
              );
            })}
          </Box>
        </VStack> {" "}
      </Box>
      <Box position="fixed" bottom="0" w="100%" p="1.5" bg="black">
        <Text fontSize="13px" color="yellow" align="center">
          All Results Tested And Confermed by Nutrition Team
        </Text>
        <Text fontWeight="bold" fontSize="20px" color="yellow" align="center">
          Coded by Sultan Alharbi - All rights reserved © 2022
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default Nutrition;
