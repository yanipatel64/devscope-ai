"use client";

import { useState } from "react";
import { useAnalysis } from "@/context/AnalysisContext";


interface RepositoryInfo {

  name:string;
  owner:string;
  language:string;
  stars:number;
  forks:number;
  description:string;
  updated:string;

}


interface AIReport {

  project_score?:number;
  security_score?:string;

  maintainability_score?:number;
  documentation_score?:number;
  architecture_score?:number;

  risk_level?:string;
  repository_health?:string;

  strengths?:string[];
  possible_improvements?:string[];
  security_recommendations?:string[];
  documentation_suggestions?:string[];

  architecture_flow?:string[];

}


interface Analysis {

  project_score:number;
  security_score:string;
  architecture:string;

  risk_level?:string;

  repository_info:RepositoryInfo;

  ai_report?:AIReport;

}




export default function RepositoryAnalyzer(){


const {setAnalysis}=useAnalysis();


const [repoUrl,setRepoUrl]=useState("");

const [loading,setLoading]=useState(false);

const [step,setStep]=useState("");

const [result,setResult]=useState<Analysis|null>(null);



const downloadReport=()=>{

if(!result) return;


const blob=new Blob(
[
JSON.stringify(result,null,2)
],
{
type:"application/json"
}
);


const url=URL.createObjectURL(blob);


const link=document.createElement("a");


link.href=url;


link.download=
`${result.repository_info.name}-DevScope-AI-Report.json`;


document.body.appendChild(link);


link.click();


document.body.removeChild(link);


URL.revokeObjectURL(url);

};





const analyzeRepository=async()=>{


if(!repoUrl){

alert("Please enter GitHub repository URL");

return;

}



setLoading(true);

setResult(null);



const steps=[

"Scanning repository files...",

"Understanding project architecture...",

"Evaluating engineering quality...",

"Generating AI insights..."

];


let i=0;


const timer=setInterval(()=>{

setStep(
steps[i]
);

i++;

if(i>=steps.length)
i=0;


},1200);




try{


const response=await fetch(

"http://127.0.0.1:8000/analyze",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

url:repoUrl

})

}

);




if(!response.ok){

throw new Error("API Error");

}



const data=await response.json();



console.log(
"DevScope Result:",
data
);



const analysis=data.analysis;



setResult(analysis);


setAnalysis(analysis);



}


catch(error){


console.error(error);


alert(
"Unable to connect with DevScope AI Engine"
);


}


finally{


clearInterval(timer);


setLoading(false);


setStep("");


}



};






return (

<section className="min-h-screen py-24 px-6">


<div className="max-w-6xl mx-auto">


<div className="text-center">


<p className="text-violet-400 uppercase tracking-widest">

AI Repository Intelligence

</p>


<h1 className="text-5xl font-bold mt-4">

Analyze Any GitHub Project

</h1>


<p className="text-gray-400 mt-5">

Understand software projects with AI-powered engineering intelligence.

</p>


</div>





<div className="mt-12 flex flex-col md:flex-row gap-4">


<input

value={repoUrl}

onChange={
(e)=>setRepoUrl(e.target.value)
}

placeholder="https://github.com/user/project"


className="
flex-1
rounded-xl
border
border-gray-700
bg-gray-950
px-5
py-4
text-white
"

/>



<button

onClick={analyzeRepository}

disabled={loading}

className="
rounded-xl
bg-violet-600
px-8
py-4
font-semibold
disabled:opacity-50
"

>


{
loading
?
"Analyzing..."
:
"Analyze"
}


</button>


</div>





{
loading &&

<p className="text-center mt-6 text-violet-400">

{step}

</p>

}





{
result &&

<div className="mt-16 space-y-8">





<Section title="Repository Intelligence">


<div className="grid md:grid-cols-3 gap-8">


<Info
title="Name"
value={result.repository_info.name}
/>


<Info
title="Owner"
value={result.repository_info.owner}
/>


<Info
title="Language"
value={result.repository_info.language}
/>


<Info
title="Stars"
value={String(result.repository_info.stars)}
/>


<Info
title="Forks"
value={String(result.repository_info.forks)}
/>


<Info
title="Updated"
value={result.repository_info.updated}
/>



</div>


</Section>






<div className="grid md:grid-cols-4 gap-6">


<Card
title="Project Score"
value={`${result.project_score}%`}
/>


<Card
title="Security"
value={result.security_score}
/>


<Card
title="Architecture"
value={result.architecture}
/>


<Card

title="Risk"

value={
result.risk_level ||
result.ai_report?.risk_level ||
"Medium"
}

/>


</div>





<button

onClick={downloadReport}

className="
rounded-xl
bg-gray-800
px-6
py-3
hover:bg-gray-700
"

>

Download AI Report

</button>







<Section title="AI Recommendations">

<List

items={
result.ai_report?.possible_improvements || []
}

/>

</Section>





<Section title="AI Strengths">

<List

items={
result.ai_report?.strengths || []
}

/>

</Section>






<Section title="Security Recommendations">

<List

items={
result.ai_report?.security_recommendations || []
}

/>

</Section>







<Section title="Documentation Suggestions">


<List

items={
result.ai_report?.documentation_suggestions || []
}

/>


</Section>





</div>

}



</div>

</section>


);

}






function Section(
{
title,
children
}:
{
title:string;
children:React.ReactNode;
}
){

return (

<div

className="
rounded-3xl
border
border-gray-800
bg-gray-950
p-8
"

>


<h2 className="text-3xl font-bold">

{title}

</h2>


<div className="mt-6">

{children}

</div>


</div>

);

}







function List(
{
items
}:
{
items:string[];
}
){

return (

<ul className="space-y-4">


{
items.map(
(item,index)=>(


<li

key={index}

className="text-gray-300"

>

<span className="text-green-400">

✓

</span>

{" "}

{item}


</li>


)

)

}


</ul>

);

}







function Info(
{
title,
value
}:
{
title:string;
value:string;
}
){

return (

<div>


<p className="text-gray-400">

{title}

</p>


<p className="mt-2 font-semibold">

{value || "N/A"}

</p>


</div>

);

}








function Card(
{
title,
value
}:
{
title:string;
value:string;
}
){

return (

<div

className="
rounded-3xl
border
border-gray-800
bg-gray-950
p-7
"

>


<p className="text-gray-400">

{title}

</p>


<h3 className="text-4xl font-bold mt-4">

{value}

</h3>


<p className="text-green-400 mt-4">

✓ AI Evaluated

</p>


</div>

);

}