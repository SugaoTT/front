import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import { Box } from '@chakra-ui/react'

export default function TerminalWindow(){
    const el =  useRef(null);

    let term!: Terminal;
    let fitAddon!: FitAddon;

    useEffect(() => {
        //netConsole.start("console")
       term = new Terminal({
            fontSize: 14,
            rows: 30,
            cursorBlink: true,
            cursorStyle: 'underline',
            theme: {
                foreground: "#ffffff", //Font
                background: "#000000", //Background color
                cursor: "#ffffff" //Set cursor
            }
        });
        fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.open(el.current!);
        term.writeln('Welcome to the terminal by xterm.js');
        term.write('\r\n$ ');
        term.clear();
        fitAddon.fit();
    })

    return (
        <Box ref={el}>
        </Box>
        
      );
}

