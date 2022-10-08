import React from "react";
import {
   Container,
   Flex,
   Divider,
   Text,
   Heading,
   Button,
   Stack,
   VStack,
   HStack,
   Tabs,
   Progress,
   IconButton,
   Box,
   Center,
   SimpleGrid,
   GridItem,
} from "@chakra-ui/react";

const HomeComponent = ({
   pomodoroMode,
   pomodoroStep,
   countdown,
   progress,
   onClick,
   pomodoroState,
}) => {
   const renderPomodoroProgressBar = (pomodoroStep) => {
      let bars = [];
      for (let i = 1; i <= 4; i++) {
         bars.push(
            <GridItem
               key={i}
               bg={pomodoroStep >= i ? "purple.500" : ""}
               borderColor={pomodoroStep >= i ? "purple.500" : ""}
               borderRadius={3}
               borderWidth={2}
            ></GridItem>
         );
      }

      return (
         <SimpleGrid columns={1} h={"full"} w={4} rowGap={1}>
            {bars.reverse()}
         </SimpleGrid>
      );
   };

   return (
      <Container maxW={"container.xl"} p={0}>
         <Flex
            h={"100vh"}
            w={"full"}
            alignItems={"center"}
            direction={"column"}
         >
            {/** Heading Start */}
            <HStack
               h={"max"}
               w={"full"}
               py={3}
               alignItems={"center"}
               justifyContent={"center"}
            >
               <Heading size={"xl"} fontWeight={"thin"}>
                  Simple Pomodoro
               </Heading>
            </HStack>
            <Divider />
            {/** Heading End */}
            <VStack h={"full"} w={"xl"} p={6} spacing={4}>
               <HStack w={"full"} justifyItems={"space-between"}>
                  <Button
                     onClick={() =>
                        onClick({ type: "pomodoroMode", mode: "focus" })
                     }
                     w={"full"}
                     colorScheme={pomodoroMode === "focus" ? "purple" : "gray"}
                  >
                     Focus
                  </Button>
                  <Button
                     onClick={() =>
                        onClick({ type: "pomodoroMode", mode: "short_break" })
                     }
                     w={"full"}
                     colorScheme={
                        pomodoroMode === "short_break" ? "purple" : "gray"
                     }
                  >
                     Short Break
                  </Button>
                  <Button
                     onClick={() =>
                        onClick({ type: "pomodoroMode", mode: "long_break" })
                     }
                     w={"full"}
                     colorScheme={
                        pomodoroMode === "long_break" ? "purple" : "gray"
                     }
                  >
                     Long Break
                  </Button>
               </HStack>
               <HStack w={"full"}>
                  <VStack w={"full"} bg={"gray.100"} p={3} borderRadius={"md"}>
                     <Center h={"full"} w={"full"}>
                        <Text
                           textStyle={"countdown"}
                           fontSize={"9xl"}
                           fontWeight={"medium"}
                        >
                           {countdown}
                        </Text>
                     </Center>
                     <Progress
                        value={progress}
                        w={"full"}
                        colorScheme={"purple"}
                        bg={"gray.300"}
                        borderRadius={"md"}
                        h={4}
                     />
                  </VStack>
                  {renderPomodoroProgressBar(pomodoroStep)};
               </HStack>
               <Center w={"full"} justifyItems={"space-between"}>
                  {/* <Button onClick={() => onClick("settings")} w={"full"}>
                     Settings
                  </Button> */}
                  <Button
                     onClick={() =>
                        onClick(
                           pomodoroState === "stop" || pomodoroState === "pause"
                              ? { type: "pomodoroState", state: "start" }
                              : { type: "pomodoroState", state: "pause" }
                        )
                     }
                     colorScheme={
                        pomodoroState === "stop" || pomodoroState === "pause"
                           ? "purple"
                           : "red"
                     }
                     w={"full"}
                  >
                     {pomodoroState === "stop" || pomodoroState === "pause"
                        ? "Start"
                        : "Pause"}
                  </Button>
                  {/* <Button onClick={() => onClick("skip")} w={"full"}>
                     Skip
                  </Button> */}
               </Center>
            </VStack>
         </Flex>
      </Container>
   );
};

export { HomeComponent };
