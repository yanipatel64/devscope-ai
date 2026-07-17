"use client";

import {
  GitBranch,
  Cpu,
  Boxes,
  Sparkles,
  LayoutDashboard,
  Workflow,
} from "lucide-react";


interface Props {
  architecture?: string[];
}



export default function ArchitectureGraph({
  architecture = []
}: Props) {



  const defaultFlow = [
    "GitHub Repository",
    "Repository Scanner",
    "Technology Scanner",
    "Dependency Scanner",
    "Gemini AI Engine",
    "Engineering Dashboard"
  ];



  const cleanArchitecture =
    architecture
      ?.filter(
        (item) =>
          item &&
          item.trim() !== ""
      )
      .filter(
        (item, index, array) =>
          array.indexOf(item) === index
      );



  const flow =
    cleanArchitecture.length > 0
      ? cleanArchitecture
      : defaultFlow;



  return (

<section
className="
rounded-3xl
border
border-gray-800
bg-gray-950
p-8
"
>


<h2 className="text-3xl font-bold">
Repository Architecture
</h2>


<p className="text-gray-400 mt-2 mb-12">
AI-generated architecture understanding of the repository.
</p>





<div
className="
flex
flex-col
items-center
gap-0
"
>


{
flow.map(
(node,index)=>(


<div
key={`${node}-${index}`}
className="flex flex-col items-center"
>


<ArchitectureNode
title={node}
index={index}
/>





{
index !== flow.length - 1 &&
(

<div
className="
flex
flex-col
items-center
my-4
"
>


<div
className="
w-[2px]
h-10
bg-gradient-to-b
from-violet-500
to-cyan-500
animate-pulse
"
/>


<span
className="
text-violet-400
text-lg
"
>
▼
</span>


</div>

)

}



</div>


)

)

}



</div>



</section>


  );

}









function ArchitectureNode(
{
title,
index
}:{
title:string;
index:number;
}){



const icons=[
GitBranch,
Cpu,
Boxes,
Workflow,
Sparkles,
LayoutDashboard
];



const Icon =
icons[index % icons.length];




const gradients=[
"from-violet-600 to-purple-500",
"from-blue-600 to-cyan-500",
"from-emerald-600 to-green-500",
"from-orange-500 to-yellow-500",
"from-pink-600 to-violet-600",
"from-indigo-600 to-purple-600"
];



const color =
gradients[index % gradients.length];




return (


<div
className="
group
relative
w-80
rounded-2xl
border
border-gray-700
bg-gray-900
px-6
py-6
transition-all
duration-300
hover:scale-105
hover:border-violet-500
hover:shadow-[0_0_40px_rgba(139,92,246,0.35)]
"
>



<div
className={`
absolute
inset-0
rounded-2xl
bg-gradient-to-r
${color}
opacity-10
group-hover:opacity-20
transition
`}
/>




<div
className="
relative
flex
items-center
gap-5
"
>



<div
className={`
h-14
w-14
rounded-xl
bg-gradient-to-r
${color}
flex
items-center
justify-center
text-white
shadow-lg
`}
>


<Icon size={28}/>


</div>






<div>


<p
className="
text-lg
font-semibold
text-white
"
>

{title}

</p>



<p
className="
text-sm
text-green-400
mt-1
"
>

✓ AI Analyzed

</p>



</div>



</div>



</div>


);


}