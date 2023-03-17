import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Header() {
  let [projectName, setName] = useState("プロジェクト名未設定");
  let inputValue: string = "";

  const { isOpen, onOpen, onClose } = useDisclosure();

  let handleInputChange = (e: any) => {
    inputValue = e.target.value;
    //setName(inputValue);
  };

  const setProjectName = () => {
    setName(inputValue);
    onClose();
  };

  return (
    <>
      <Box fontSize="4xl" onClick={onOpen}>
        {projectName}
      </Box>
      <Button
        fontSize="smaller"
        border="1px"
        onClick={onOpen}
        w="150px"
        h="20px"
      >
        プロジェクト名変更
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>プロジェクト名を設定</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              onChange={handleInputChange}
              placeholder="プロジェクト名を入力"
              size="sm"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={setProjectName}>
              適用
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
