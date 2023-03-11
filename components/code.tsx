import React, { useRef, useEffect } from 'react';
import cytoscape, { GridLayoutOptions } from 'cytoscape';
import cyStyle from './cy-style.json';
import data from './data.json';


export default function Code() {
  const el =  useRef(null);

  useEffect(() => {
    const container = el.current! as HTMLDivElement;
    var cy = cytoscape({
      container: container,
      layout: {
        name: 'grid',
        columns: 4
      } as GridLayoutOptions,
      style: cyStyle as unknown as cytoscape.Stylesheet[],
      elements: data as unknown as cytoscape.ElementsDefinition
    });

    cy.ready(function(){
      var n13 = cy.$('#n13');
      var n11 = cy.$('#n11');
      var n12 = cy.$('#n12');
      var p11 = n11.position();
      var p12 = n12.position();
      var d = (p12.x - p11.x)/4;

      n13.position({
        x: (p11.x + p12.x)/2,
        y: p11.y - d
      });

      n11.add(n12).position({ x: p11.x, y: p11.y + d });
    });
    return(() => {
      cy.destroy();
    })
  }, [])

  return (
    <div ref={el} style={{ width: "100vw", height: "100vh" }} />
  );
}