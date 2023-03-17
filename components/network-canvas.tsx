import cytoscape, { ElementDefinition, ElementsDefinition} from 'cytoscape'
import { Anybody } from 'next/font/google'
import { useEffect, useRef } from 'react'
import cyStyle from './cy-style.json';
import data from './data.json';
import { Box } from '@chakra-ui/react'
import { GUIManager } from '@/script/GUIManager';
import { AbstractNode } from '@/script/AbstractNode';

export function NetworkCanvas(){
    const el =  useRef(null);
    let cy: any

    const onDrop = (e: React.DragEvent<HTMLDivElement>) =>{
        console.log('on drop', e);

        let nodeType = e.dataTransfer!.getData("text/plain");
        let node = GUIManager.guimanager.addNode(new AbstractNode(nodeType));

        let nodeName: string = "Router2";
        let mouse_x_position: number = (event as MouseEvent).offsetX;
        let mouse_y_position: number = (event as MouseEvent).offsetY;
        let canvas_position = cy.pan();
        let zoom = cy.zoom();
        let x_position: number = (mouse_x_position - canvas_position.x)/zoom;
        let y_position: number = (mouse_y_position - canvas_position.y)/zoom;

        if(nodeType == 'Router'){
            cy.add({
                data: {id: node.nodeName},
              position: { x: x_position, y: y_position },
              classes: 'Router'
            });
        }else if(nodeType == 'Switch'){
            cy.add({
                data: {id: node.nodeName},
              position: { x: x_position, y: y_position },
              classes: 'Switch'
            });
        } else if(nodeType == 'Host'){
            cy.add({
                data: {id: node.nodeName},
              position: { x: x_position, y: y_position },
              classes: 'Host'
            });
        }

    }
    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        console.log(e.dataTransfer!.getData("text/plain"))
        console.log('on drag enter', e);
    }


  useEffect(() => {
    const container = el.current! as HTMLDivElement;
    cy = cytoscape({
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
    // cy.ready(function(){

    //     console.log(cy.$('#Host').position())
    //     console.log(cy.$('#Router').position())

    //   });
    //   return(() => {
    //     cy.destroy();
    //   })
  })

  return (
    <Box ref={el} onDragEnter={onDragEnter} onDragOver={(e) => {e.preventDefault();}} onDrop={onDrop} width='1000px' height='750px' border='1px'>
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