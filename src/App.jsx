import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button, TextInput, Paper, Flex, Box, Notification } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("No te conozco :(");
  const [name, setName] = useState("");
  const [opacity, setOpacity] = useState(0);

  async function greet() {

    
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name.toUpperCase() }));
    setOpacity(1)
  }

  function handleKeyDown(e){
    if(e.key === 'Enter'){
      greet()
    }
  }

  const isAuthed = greetMsg.startsWith("Hola ")

  return (
    <Box className="container" bg="blue">
      <Flex justify="center">
      <Notification ta="left" opacity={opacity} style={{transition:"200ms all"}} icon={isAuthed ? <IconCheck size="1.1rem" /> : <IconX size="1.1rem"/>} w="50vw" color={isAuthed ? "teal" : "red"} title="Autorización" mt={10} pos="absolute" withCloseButton={false}>{greetMsg}</Notification>
      <Flex justify="center" align="center" direction="column" h="100vh" w="100vw">
        <Paper p={20} shadow="xl" radius="md">
          <Flex gap={10}>
            <TextInput w="30vw" onKeyDown={handleKeyDown} value={name} onChange={(e)=>setName(e.target.value)} placeholder="Introduce tu apodo"/>
            <Button onClick={greet}>Enviar</Button>
          </Flex>
        </Paper>
        </Flex>
      </Flex>
    </Box>
  );
}

export default App;
