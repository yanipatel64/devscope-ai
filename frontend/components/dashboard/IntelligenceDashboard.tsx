"use client";

import ArchitectureGraph from "./ArchitectureGraph";


interface Props {
  data:any;
}



export default function IntelligenceDashboard({
  data
}:Props){


const repo = data?.repository_info || {};

const ai = data?.ai_report || data || {};



const technologies = [
  repo.language
].filter(Boolean);



const healthMetrics = [

{
name:"Code Maintainability",
score: ai.maintainability_score || 0
},


{
name:"Security Readiness",
score:
ai.security_score==="A"
?95
:
ai.security_score==="B"
?85
:
ai.security_score==="C"
?70
:
50
},


{
name:"Documentation Quality",
score: ai.documentation_score || 0
},


{
name:"Architecture Quality",
score: ai.architecture_score || 0
}

];




const repositoryHealth =
ai.repository_health
||
(
(ai.project_score || 0) >= 80
?
"Excellent"
:
(ai.project_score || 0) >= 70
?
"Good"
:
"Needs Attention"
);





return (

<section className="mt-24 px-6">


<div className="max-w-6xl mx-auto space-y-12">





<div>

<p className="text-violet-400 text-sm uppercase tracking-widest">

DevScope AI Intelligence

</p>



<h2 className="text-5xl font-bold mt-3">

Engineering Intelligence Dashboard

</h2>



<p className="text-gray-400 mt-4 max-w-3xl">

AI-powered repository analysis providing architecture insights,
security evaluation, engineering recommendations and improvement strategies.

</p>


</div>







<div className="grid md:grid-cols-5 gap-6">



<ScoreCard

title="Project Score"

value={`${ai.project_score || 0}%`}

status="AI Evaluated"

/>



<ScoreCard

title="Security"

value={ai.security_score || "N/A"}

status="AI Evaluated"

/>



<ScoreCard

title="Architecture"

value={`${ai.architecture_score || 0}%`}

status="AI Reviewed"

/>



<ScoreCard

title="Risk Level"

value={ai.risk_level || "Medium"}

status="AI Evaluated"

/>



<ScoreCard

title="Repository Health"

value={repositoryHealth}

status="AI Assessment"

/>



</div>









<Card>


<h3 className="text-3xl font-bold">

Repository Overview

</h3>



<div className="grid md:grid-cols-3 gap-8 mt-8">



<div>

<p className="text-gray-400">

Repository

</p>



<a

href={repo.url || "#"}

target="_blank"

className="text-violet-400 hover:underline"

>

{repo.name || "Unknown"}

</a>


</div>





<InfoItem

title="Owner"

value={repo.owner}

/>




<InfoItem

title="Primary Language"

value={repo.language}

/>




<InfoItem

title="Stars"

value={
repo.stars?.toLocaleString()
}

/>




<InfoItem

title="Forks"

value={
repo.forks?.toLocaleString()
}

/>




<InfoItem

title="Description"

value={repo.description}

/>



</div>


</Card>









<ArchitectureGraph

architecture={
ai.architecture_flow || []
}

/>










<Card>


<h3 className="text-3xl font-bold">

Technology Intelligence

</h3>



<div className="flex flex-wrap gap-4 mt-6">


{
technologies.map((tech:string)=>(


<span

key={tech}

className="
px-5
py-3
rounded-xl
bg-gray-900
border
border-gray-700
"

>

{tech}

</span>


))

}


</div>


</Card>









<Card>


<h3 className="text-3xl font-bold">

Project Health

</h3>



<div className="mt-8 space-y-7">


{

healthMetrics.map(item=>(


<div key={item.name}>


<div className="flex justify-between mb-3">


<span>

{item.name}

</span>


<span className="text-gray-400">

{item.score}%

</span>


</div>




<div className="h-3 bg-gray-800 rounded-full overflow-hidden">


<div

className="
h-full
bg-violet-600
rounded-full
"

style={{

width:`${item.score}%`

}}

/>


</div>



</div>


))


}


</div>


</Card>









<InsightSection

title="AI Identified Strengths"

items={ai.strengths || []}

/>





<InsightSection

title="Possible Engineering Improvements"

items={ai.possible_improvements || []}

/>






<InsightSection

title="Security Recommendations"

items={ai.security_recommendations || []}

/>






<InsightSection

title="Documentation Suggestions"

items={ai.documentation_suggestions || []}

/>







</div>


</section>


);


}








function Card({

children

}:{

children:React.ReactNode

}){


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

{children}

</div>

);


}








function InsightSection({

title,

items

}:{

title:string;

items:string[];

}){


return (

<Card>


<h3 className="text-3xl font-bold">

{title}

</h3>



<div className="mt-6 space-y-4">


{

items.map((item,index)=>(


<div

key={index}

className="
flex
gap-3
text-gray-300
"

>


<span className="text-violet-400">

✦

</span>



<p>

{item}

</p>


</div>


))


}



</div>


</Card>


);


}









function ScoreCard({

title,

value,

status

}:{

title:string;

value:string;

status:string;

}){


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


<p className="text-gray-400">

{title}

</p>



<h3 className="text-4xl font-bold mt-4">

{value}

</h3>



<p className="text-green-400 mt-4">

✓ {status}

</p>



</div>


);


}









function InfoItem({

title,

value

}:{

title:string;

value:any;

}){


return (

<div>


<p className="text-gray-400">

{title}

</p>



<p className="mt-2 text-lg">

{value || "Not available"}

</p>


</div>


);


}