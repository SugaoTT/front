import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Grid, GridItem, chakra, Box, Center, Show, Hide, Container} from '@chakra-ui/react'
import LeftBar from '../components/left-bar'
import { NetworkCanvas } from "../components/network-canvas";
import RightBar from '@/components/right-bar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  var a = 'red.300'
  var b = true

  return (
    <>
    <Head>
      <title>TEST</title>
    </Head>


    <Grid
      templateAreas={`"header header header"
                      "tool-bar tool-bar tool-bar"
                       "left-bar main right-bar"`}
      gridTemplateRows={'100px 50px 1fr'}
      gridTemplateColumns={'150px 1fr 350px'}
      h='1080px'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' bg={a} area={'header'}>
        Header
      </GridItem>
      <GridItem pl='2' bg='blue.300' area={'tool-bar'}>
        Tool-Bar
      </GridItem>
      <GridItem pl='2' bg='gray.100' area={'left-bar'}>
        Left-Bar
        <LeftBar></LeftBar>
      </GridItem>
      <GridItem pl='2' bg='gray.100' area={'right-bar'}>
        Right-Bar
        <RightBar></RightBar>
      </GridItem>
      <GridItem overflow='scroll' pl='2' area={'main'}>
        Main
        <Box marginLeft='8%'>
          <NetworkCanvas></NetworkCanvas>
        </Box>

          {!b && <Box>This text appears only on screens 400px and smaller.</Box>}
      </GridItem>
      
    </Grid>
    </>
  )
}
