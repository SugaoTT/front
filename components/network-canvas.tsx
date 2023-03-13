import cytoscape, { ElementDefinition, ElementsDefinition} from 'cytoscape'
import { Anybody } from 'next/font/google'
import { useEffect, useRef } from 'react'
import cyStyle from './cy-style.json';
import data from './data.json';
import { Box } from '@chakra-ui/react'

export function NetworkCanvas(){
    const el =  useRef(null);


  useEffect(() => {
    const container = el.current! as HTMLDivElement;
    var cy = cytoscape({
      container: container,
      style: cyStyle as unknown as cytoscape.Stylesheet[],
      elements: data as unknown as cytoscape.ElementsDefinition,
      layout: {
        name: 'preset',
        fit: false
    },
      zoom: 0.7,
      wheelSensitivity: 0.1,
    });
    cy.ready(function(){

        console.log(cy.$('#Host').position())
        console.log(cy.$('#Router').position())

      });
      return(() => {
        cy.destroy();
      })
  })

  return (
    <Box ref={el} width='1000px' height='750px' border='1px'>
    </Box>
    
  );
    /*const el = useRef(null);

    var cy: cytoscape.Core;
    var cyop: cytoscape.CytoscapeOptions;
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('mounted')
        const a = el.current
        cyop = {
            container: a,
            elements: {
                nodes:[
                    {
                        data: {id: 'Host'}, position: {x: 0, y: 0}
                    },
                    {
                        data: {id: 'Router'}, position: {x: 100, y: 100}
                    }
                ]
            } as unknown as cytoscape.ElementsDefinition,
            style: [
                {
                    selector: 'node',
                    style: {
                        'shape': 'rectangle'
                    }

                }
            ] as unknown as cytoscape.Stylesheet[]
        }
    })
    return(
        <div ref={container}>
        </div>
    )*/
}