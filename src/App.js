import React from "react";

import Nutrition from "./Pages/Nutrition";
import { ChakraProvider, Box } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box  bg="#ebeaea">
        <>
          <Nutrition />
        </>
      </Box>
    </ChakraProvider>
  );
}

export default App;
