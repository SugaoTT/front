import cytoscape, { ElementDefinition, ElementsDefinition } from "cytoscape";
import { Anybody } from "next/font/google";
import { useEffect, useRef } from "react";
import cyStyle from "./cy-style.json";
import data from "./data.json";
import { Box } from "@chakra-ui/react";
import { GUIManager } from "@/script/GUIManager";
import { AbstractNode } from "@/script/AbstractNode";
import nodeTest from "node:test";
import { useState } from "react";
import { useContext } from "react";
//import { StateContext } from "@/pages";
import { StateContext } from "@/components/StateContext";

//type Props = {
//  changeConnectMode: (connectMode: boolean) => void;
//  isConnectMode: boolean;
//  changeConnectStatus: (status: string) => void;
//  connectStatus: string;
//};

const cy = cytoscape({
  //container: container,
  style: cyStyle as unknown as cytoscape.Stylesheet[],

  elements: data as unknown as cytoscape.ElementsDefinition,
  layout: {
    name: "preset",
    fit: false,
  },
  zoom: 0.7,
  wheelSensitivity: 0.1,
});

export function NetworkCanvas() {
  const { changeConnectMode, connectMode, changeConnectStatus, connectStatus } =
    useContext(StateContext);

  const el = useRef(null);

  //const [cyState, setCy] = useState(false);

  //let cy: cytoscape.Core;
  console.log("cy", cy);

  let srcNode: string = "";
  let dstNode: string = "";

  let tmpConnectMode = false;
  let tmpConnectStatus = "";

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("on drop", e);

    let nodeType = e.dataTransfer!.getData("text/plain");
    var node = GUIManager.guimanager.addNode(new AbstractNode(nodeType));
    let mouse_x_position: number = (event as MouseEvent).offsetX;
    let mouse_y_position: number = (event as MouseEvent).offsetY;
    let canvas_position = cy.pan();
    let zoom = cy.zoom();
    let x_position: number = (mouse_x_position - canvas_position.x) / zoom;
    let y_position: number = (mouse_y_position - canvas_position.y) / zoom;

    if (nodeType == "Router") {
      cy.add({
        data: { id: node.nodeName },
        position: { x: x_position, y: y_position },
        classes: "Router",
      });
    } else if (nodeType == "Switch") {
      cy.add({
        data: { id: node.nodeName },
        position: { x: x_position, y: y_position },
        classes: "Switch",
      });
    } else if (nodeType == "Host") {
      cy.add({
        data: { id: node.nodeName },
        position: { x: x_position, y: y_position },
        classes: "Host",
      });
    }
  };
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e.dataTransfer!.getData("text/plain"));
    console.log("on drag enter", e);
  };

  //console.log("props.isConnectMode on render:", props.isConnectMode);
  //console.log("tmpConnectMode on render:", tmpConnectMode);

  const clickedNode = (nodeName: string) => {
    console.log("clickedNode connectMode", connectMode);
    //console.log("clickNode tmpConnectMode", tmpConnectMode);
    if (connectMode) {
      console.log("clickedNode", connectMode);
      if (tmpConnectStatus == "srcNodeを選択") {
        srcNode = nodeName;
        //props.changeConnectStatus("dstNodeを選択");
        tmpConnectStatus = "dstNodeを選択";
      } else if (tmpConnectStatus == "dstNodeを選択") {
        dstNode = nodeName;
        //props.changeConnectStatus("接続完了");
        tmpConnectStatus = "接続完了";
      }
      if (tmpConnectStatus == "接続完了") {
        console.log("接続元ノード: " + srcNode + " 接続先ノード: " + dstNode);
        connect();
        //props.changeConnectMode(false);
        //props.changeConnectStatus("デフォルト");
        srcNode = "";
        dstNode = "";
      }
    }

    //props.changeConnectMode();
  };

  const connect = () => {
    let cableNumber = GUIManager.guimanager.updateCables();
    cy.add({
      data: {
        id: srcNode + "To" + dstNode + cableNumber,
        source: srcNode,
        target: dstNode,
      },
    });
  };

  //useEffect(() => {
  //  console.log("コネクトモードが変更されました" + props.isConnectMode); // これならちゃんと最新のcount*2の値が表示される
  //  tmpConnectMode = props.isConnectMode;
  //}, [props.isConnectMode]);

  //useEffect(() => {
  //  console.log("useEffect tmpConnectMode", tmpConnectMode);
  //}, [tmpConnectMode]);

  //useEffect(() => {
  //  console.log("コネクトステータスが変更されました" + props.connectStatus); // これならちゃんと最新のcount*2の値が表示される
  //  tmpConnectStatus = props.connectStatus;
  //}, [props.connectStatus]);

  useEffect(() => {
    const container = el.current! as HTMLDivElement;
    cy.mount(container);
    // cy.ready(function(){

    //     console.log(cy.$('#Host').position())
    //     console.log(cy.$('#Router').position())

    //   });
    //   return(() => {
    //     cy.destroy();
    //   })
    cy.on("tap", "node", function (event: any) {
      console.log(connectMode);
      console.log(event.target._private.data.id);
      clickedNode(event.target._private.data.id);
    });
    //  console.log(props.isConnectMode);
  }, []);

  return (
    <Box
      ref={el}
      onDragEnter={onDragEnter}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={onDrop}
      width="1000px"
      height="750px"
      border="1px"
    ></Box>
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
