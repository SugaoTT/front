
import { Input, Stack, VStack, InputGroup, InputLeftElement, InputRightElement, Box, Container, Button } from '@chakra-ui/react'
import { SearchIcon, CheckIcon} from '@chakra-ui/icons'
import { useState } from 'react'
import TerminalWindow from "../components/terminal-window";
import dynamic from 'next/dynamic'

const TerminalComponent = dynamic(() => import('../components/terminal-window'), {
    ssr: false
})

export default function RightBar(){

    //let isConsoleVisiable: boolean=true

    const [isConsoleVisiable, setConsoleVisiable] = useState(false)
    const [isIPSettingVisiable, setIPSettingVisiable] = useState(false)
    const [isMemoVisiable, setMemoVisiable] = useState(false)

    const changeConsoleVisiable = () => {
        
        if(isConsoleVisiable){
            setConsoleVisiable(false);
        } else {
            setConsoleVisiable(true);
        }
    }

    const changeIPSettingVisiable = () => {
        if(isIPSettingVisiable){
            setIPSettingVisiable(false);
        } else {
            setIPSettingVisiable(true);
        }
    }

    const changeMemoVisiable = () => {
        if(isMemoVisiable){
            setMemoVisiable(false);
        } else {
            setMemoVisiable(true);
        }
    }



    return(
        <>
            <VStack>
                <Box w='100%'>
                    <Button border='1px' color='black' onClick={() => changeConsoleVisiable()}>
                        {isConsoleVisiable && <Box> * Console</Box>}
                        {!isConsoleVisiable && <Box> + Console</Box>}
                    </Button>
                    
                </Box>
                <Box w='100%'>
                    {isConsoleVisiable && <TerminalComponent></TerminalComponent>}
                </Box>

                <Box w='100%'>
                    <Button border='1px' color='black' onClick={() => changeIPSettingVisiable()}>
                        {isIPSettingVisiable && <Box> * IPネットワーク設定</Box>}
                        {!isIPSettingVisiable && <Box> + IPネットワーク設定</Box>}
                    </Button>
                </Box>

                <Box w='100%'>
                    <Button border='1px' color='black' onClick={() => changeMemoVisiable()}>
                        {isMemoVisiable && <Box> * メモ</Box>}
                        {!isMemoVisiable && <Box> + メモ</Box>}
                    </Button>
                </Box>

            </VStack>
        </>
    )





}