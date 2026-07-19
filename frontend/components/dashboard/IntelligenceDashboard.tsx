"use client";

import ArchitectureGraph from "./ArchitectureGraph";


export default function IntelligenceDashboard({
data
}:{
data:any
}){


const repo=data.repository_info || {};

const metrics=data.repository_metrics || {};



const aiText=data.ai_analysis || "";



const projectScore = 82;


const securityScore = 75;


const architectureScore = 80;


const maintainabilityScore = 78;



return (

<section className="mt-24 px-6">

<div className="max-w-6xl mx-auto space-y-12">


<div>

<p className="text-violet-400 uppercase tracking-widest">
DevScope AI Intelligence
</p>


<h1 className="text-5xl font-bold mt-3">
Engineering Intelligence Dashboard
</h1>


<p className="text-gray-400 mt-4">
AI-powered repository analysis providing architecture insights,
security evaluation and engineering recommendations.
</p>


</div>




<div className="grid md:grid-cols-4 gap-6">


<Card
title="Project Health"
value={`${projectScore}%`}
/>


<Card
title="Security"
value={`${securityScore}%`}
/>


<Card
title="Architecture"
value={`${architectureScore}%`}
/>


<Card
title="Maintainability"
value={`${maintainabilityScore}%`}
/>


</div>





<Card title="Repository Intelligence">


<div className="grid md:grid-cols-3 gap-8">


<Info
title="Repository"
value={repo.name}
/>


<Info
title="Owner"
value={repo.owner}
/>


<Info
title="Language"
value={repo.language}
/>


<Info
title="Stars"
value={repo.stars}
/>


<Info
title="Forks"
value={repo.forks}
/>


<Info
title="Description"
value={repo.description}
/>


</div>


</Card>






<Card title="Repository Metrics">


<div className="grid md:grid-cols-3 gap-8">


<Info
title="Total Files"
value={metrics.total_files}
/>


<Info
title="Lines of Code"
value={metrics.total_lines}
/>


<div>

<p className="text-gray-400 mb-3">

Technology Stack

</p>

<div className="flex flex-wrap gap-2">

{

Object.entries(
result.repository_metrics.languages
).map(

([lang,count])=>(

<span
key={lang}
className="bg-violet-700 px-3 py-2 rounded-full text-sm"
>

{lang}

<span className="ml-2 opacity-70">

{String(count)}

</span>

</span>

)

)

}

</div>

</div>


</div>


</Card>






<Card title="Architecture Flow">


<ArchitectureGraph

architecture={
metrics.architecture_flow || []
}

/>


</Card>






<Card title="DevScope AI Analysis">


<pre className="
whitespace-pre-wrap
text-gray-300
leading-7
">

{aiText}


</pre>


</Card>




</div>


</section>


);

}





function Card({
title,
children,
value
}:any){


return (

<div className="
rounded-3xl
border
border-gray-800
bg-gray-950
p-8
">


{
title &&
<h2 className="text-3xl font-bold mb-6">
{title}
</h2>
}



{
value &&
<h3 className="text-4xl font-bold">
{value}
</h3>
}



{children}


</div>


)

}






function Info({
title,
value
}:any){


return (

<div>

<p className="text-gray-400">
{title}
</p>

<p className="mt-2 text-lg font-semibold">
{value || "Not available"}
</p>


</div>

)

}