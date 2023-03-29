import {
  Input,
  Stack,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { SearchIcon, CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default function IPSetting() {
  return (
    <>
      <VStack spacing="24px">
        <Menu placement="left">
          <MenuButton border="1px" as={Button} rightIcon={<ChevronDownIcon />}>
            インタフェース名を選択
          </MenuButton>
          <MenuList>
            <MenuItem>eth0</MenuItem>
            <MenuItem>eth1</MenuItem>
            <MenuItem>eth2</MenuItem>
            <MenuItem>eth3</MenuItem>
            <MenuItem>eth4</MenuItem>
          </MenuList>
        </Menu>

        <Text fontSize="xl">IP Address: </Text>
        <Textarea border="1px" placeholder="IPアドレスを入力" />

        <Text fontSize="xl">Default Gateway: </Text>
        <Textarea border="1px" placeholder="デフォルトゲートウェイを入力" />
      </VStack>
    </>
  );
}
