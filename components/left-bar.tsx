import { Input, Stack, VStack, InputGroup, InputLeftElement, InputRightElement, Box } from '@chakra-ui/react'
import { SearchIcon, CheckIcon} from '@chakra-ui/icons'

export default function LeftBar(){
    return(
        <>
            <Stack spacing={4}>
                <InputGroup marginBottom='30px'>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                    />
                    <Input type='tel' placeholder='機器検索' />
                </InputGroup>
            </Stack>

            <VStack spacing='24px'>
                <Box draggable w='80px' h='80px' bg='yellow.200'>
                    1
                </Box>
                <Box draggable w='80px' h='80px' bg='tomato'>
                    2
                </Box>
                <Box draggable w='80px' h='80px' bg='pink.100'>
                    3
                </Box>
            </VStack>
        </>
    )
}