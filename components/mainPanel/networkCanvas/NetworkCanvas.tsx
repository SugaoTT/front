import cytoscape, { ElementDefinition, ElementsDefinition } from "cytoscape";
import { Anybody } from "next/font/google";
import { useEffect, useRef } from "react";
import cyStyle from "./cyStyle.json";
import data from "./data.json";
import { Box } from "@chakra-ui/react";
import { GUIManager } from "@/script/GUIManager";
import { AbstractNode } from "@/script/AbstractNode";
import nodeTest from "node:test";
import { useState } from "react";
import { useContext } from "react";
//import { StateContext } from "@/pages";
import { StateContext } from "@/components/context/StateContext";
import { stringify } from "querystring";

//type Props = {
//  changeConnectMode: (connectMode: boolean) => void;
//  isConnectMode: boolean;
//  changeConnectStatus: (status: string) => void;
//  connectStatus: string;
//};

const cy = cytoscape({
  //container: container,
  style: cyStyle,
  elements: data,
  layout: {
    name: "preset",
    fit: false,
  },
  zoom: 0.7,
  wheelSensitivity: 0.1,
  minZoom: 0.5,
});

let srcNode: string = "";
let dstNode: string = "";

export const NetworkCanvas = () => {
  const {
    changeConnectMode,
    connectMode,
    changeConnectStatus,
    connectStatus,
    changeOperatingNode,
  } = useContext(StateContext);

  const containerRef = useRef<HTMLDivElement>(null);

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
    } else if (nodeType == "Test") {
      var node1 = GUIManager.guimanager.addNode(new AbstractNode("Router"));
      var node2 = GUIManager.guimanager.addNode(new AbstractNode("Host"));
      var node3 = GUIManager.guimanager.addNode(new AbstractNode("Host"));
      cy.add({
        data: { id: node1.nodeName },
        position: { x: x_position, y: y_position - 100 },
        classes: "Router",
      });
      cy.add({
        data: { id: node2.nodeName },
        position: { x: x_position - 150, y: y_position + 100 },
        classes: "Host",
      });
      cy.add({
        data: { id: node3.nodeName },
        position: { x: x_position + 150, y: y_position + 100 },
        classes: "Host",
      });

      cy.add({
        data: {
          id: "Test1",
          source: "Router0",
          target: "Host0",
          sourceLabel: "net1",
          targetLabel: "net1",
        },
      });

      cy.add({
        data: {
          id: "Test2",
          source: "Router0",
          target: "Host1",
          sourceLabel: "net2",
          targetLabel: "net1",
        },
      });
    }
  };
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e.dataTransfer!.getData("text/plain"));
    console.log("on drag enter", e);
  };

  const clickedNode = (nodeName: string) => {
    console.log("clickedNode connectMode", connectMode);
    console.log("clickedNode connectStatus", connectStatus);

    if (connectMode) {
      console.log("clickedNode", connectMode);
      if (connectStatus == "srcNodeを選択") {
        srcNode = nodeName;
        console.log("clickedNode srcNode", srcNode);
        //a.current = nodeName;
        //props.changeConnectStatus("dstNodeを選択");
        changeConnectStatus("dstNodeを選択");
        //tmpConnectStatus = "dstNodeを選択";
      } else if (connectStatus == "dstNodeを選択") {
        dstNode = nodeName;
        //props.changeConnectStatus("接続完了");
        changeConnectStatus("接続完了");
        //tmpConnectStatus = "接続完了";
        console.log("接続元ノード: " + srcNode + " 接続先ノード: " + dstNode);

        //ケーブル名を作成
        let cableName =
          srcNode + "-" + dstNode + "-" + GUIManager.guimanager.updateCables();

        //Nodeインスタンスに結線情報を登録
        let srcUUID = GUIManager.guimanager.getUUIDByNodeName(srcNode);
        let dstUUID = GUIManager.guimanager.getUUIDByNodeName(dstNode);

        let srcEthName = GUIManager.guimanager
          .selectedByUUID(srcUUID)
          .addInterface(cableName);
        let dstEthName = GUIManager.guimanager
          .selectedByUUID(dstUUID)
          .addInterface(cableName);

        /** 結線先機器の情報をインタフェースに設定 */
        GUIManager.guimanager
          .selectedByUUID(srcUUID)
          ?.getInterfaceByEthName(srcEthName)
          ?.setTargetPodName(dstUUID);
        GUIManager.guimanager
          .selectedByUUID(srcUUID)
          ?.getInterfaceByEthName(srcEthName)
          ?.setTargetPodEth(dstEthName);

        GUIManager.guimanager
          .selectedByUUID(dstUUID)
          ?.getInterfaceByEthName(dstEthName)
          ?.setTargetPodName(srcUUID);
        GUIManager.guimanager
          .selectedByUUID(dstUUID)
          ?.getInterfaceByEthName(dstEthName)
          ?.setTargetPodEth(srcEthName);

        console.log(
          GUIManager.guimanager
            .selectedByUUID(srcUUID)
            ?.getInterfaceByEthName(srcEthName)
        );

        console.log(
          GUIManager.guimanager
            .selectedByUUID(dstUUID)
            ?.getInterfaceByEthName(dstEthName)
        );

        /** L2TPに必要な情報をインタフェースに設定 */
        let sessionID = GUIManager.guimanager.getL2TPInfo(
          srcUUID!,
          srcEthName,
          dstUUID!,
          dstEthName
        ); //srcUUID, srcEthName，dstUUID, dstEthNameを引数としてjsonで投げる
        // let srcTunnelID = GUIManager.guimanager.getNextTunnelID();
        // let remoteTunnelID = srcTunnelID + 1;

        // GUIManager.guimanager
        //   .selectedByUUID(srcUUID)
        //   ?.getInterfaceByEthName(srcEthName)
        //   ?.setL2TP(sessionID, srcTunnelID, remoteTunnelID);

        // GUIManager.guimanager
        //   .selectedByUUID(dstUUID)
        //   ?.getInterfaceByEthName(srcEthName)
        //   ?.setL2TP(sessionID, remoteTunnelID, srcTunnelID);

        // console.log(
        //   "接続元のインタフェース情報",
        //   GUIManager.guimanager
        //     .selectedByUUID(srcUUID)
        //     ?.getInterfaceByEthName(srcEthName)
        // );

        // console.log(
        //   "接続先のインタフェース情報",
        //   GUIManager.guimanager
        //     .selectedByUUID(dstUUID)
        //     ?.getInterfaceByEthName(srcEthName)
        // );

        connect(cableName, srcEthName, dstEthName);

        console.log(GUIManager.guimanager.selectedByUUID(srcUUID));

        srcNode = "";
        dstNode = "";
        changeConnectMode(false);
        changeConnectStatus("");
      }
    } else {
      changeOperatingNode(nodeName);
    }

    //props.changeConnectMode();
  };

  const connect = (
    cableName: string,
    srcEthName: string,
    dstEthName: string
  ) => {
    console.log("結線処理をします。");
    cy.add({
      data: {
        id: cableName,
        source: srcNode,
        target: dstNode,
        sourceLabel: srcEthName,
        targetLabel: dstEthName,
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
    if (containerRef.current) {
      cy.mount(containerRef.current);
    }

    //  console.log(props.isConnectMode);
    return () => {
      cy.unmount();
    };
  }, [changeConnectMode, changeConnectStatus]);

  useEffect(() => {
    cy.on("tap", "node", function (event: any) {
      // changeConnectMode(true); //適用される
      // changeConnectStatus("TANAKA"); //適用される
      console.log(connectMode); //値が反映されない

      console.log(event.target._private.data.id);
      clickedNode(event.target._private.data.id);
    });
    return () => {
      cy.removeListener("tap");
    };
  }, [connectMode, connectStatus]);

  //);

  //const output = () => {
  //  console.log("DisplayState: コネクトモードを表示", connectMode);
  //};

  return (
    <Box
      ref={containerRef}
      onDragEnter={onDragEnter}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={onDrop}
      width="930px"
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
};
