"use client";

import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";


const nodes: Node[] = [

  {
    id:"1",
    position:{x:250,y:20},
    data:{
      label:"Application"
    },
    style:{
      background:"#18181b",
      color:"white",
      border:"1px solid #52525b",
      borderRadius:"12px",
      padding:"15px"
    }
  },


  {
    id:"2",
    position:{x:80,y:150},
    data:{
      label:"Routes"
    },
    style:{
      background:"#18181b",
      color:"white",
      border:"1px solid #52525b",
      borderRadius:"12px",
      padding:"15px"
    }
  },


  {
    id:"3",
    position:{x:250,y:150},
    data:{
      label:"Services"
    },
    style:{
      background:"#18181b",
      color:"white",
      border:"1px solid #52525b",
      borderRadius:"12px",
      padding:"15px"
    }
  },


  {
    id:"4",
    position:{x:420,y:150},
    data:{
      label:"Database"
    },
    style:{
      background:"#18181b",
      color:"white",
      border:"1px solid #52525b",
      borderRadius:"12px",
      padding:"15px"
    }
  },


  {
    id:"5",
    position:{x:250,y:280},
    data:{
      label:"Core Logic"
    },
    style:{
      background:"#18181b",
      color:"white",
      border:"1px solid #52525b",
      borderRadius:"12px",
      padding:"15px"
    }
  }

];


const edges: Edge[] = [

{
 id:"e1-2",
 source:"1",
 target:"2"
},

{
 id:"e1-3",
 source:"1",
 target:"3"
},

{
 id:"e1-4",
 source:"1",
 target:"4"
},

{
 id:"e3-5",
 source:"3",
 target:"5"
}

];



export default function ArchitectureGraph(){

return (

<div className="
h-[420px]
rounded-2xl
border
border-gray-800
bg-gray-950
overflow-hidden
">


<h3 className="
text-2xl
font-bold
p-6
">
Repository Architecture
</h3>


<div className="h-[330px]">

<ReactFlow

nodes={nodes}

edges={edges}

fitView

>

<Background/>

<Controls/>

</ReactFlow>

</div>


</div>

)

}