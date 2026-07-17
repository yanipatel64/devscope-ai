"use client";

import { useAnalysis } from "@/context/AnalysisContext";


export default function Dashboard() {

  const { analysis } = useAnalysis();



  const metrics = [
    {
      title: "Project Score",
      value: analysis?.project_score
        ? `${analysis.project_score}%`
        : "--",
      status: "Analyzed",
    },

    {
      title: "Security Score",
      value: analysis?.security_score || "--",
      status: "Protected",
    },

    {
      title: "Architecture",
      value: analysis?.architecture || "--",
      status: "Optimized",
    },
  ];



  const recommendations =
    analysis?.recommendations || [
      "Analyze a repository to generate AI insights",
      "Connect your GitHub project",
      "Receive engineering recommendations",
    ];



  return (

    <section className="py-24 px-6">


      <div className="max-w-6xl mx-auto">



        {/* Header */}

        <div className="text-center mb-12">


          <p className="text-gray-400">
            DevScope Intelligence
          </p>


          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Engineering Dashboard
          </h2>


          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            AI-powered insights to understand,
            analyze and improve software systems.
          </p>


        </div>





        {/* Metrics Cards */}

        <div className="grid md:grid-cols-3 gap-6">


          {metrics.map((metric)=>(

            <div
              key={metric.title}
              className="
              rounded-2xl
              border
              border-gray-800
              bg-gray-950
              p-7
              "
            >

              <p className="text-gray-400">
                {metric.title}
              </p>


              <h3 className="text-4xl font-bold mt-4">

                {metric.value}

              </h3>


              <p className="mt-3 text-green-400">

                {metric.status}

              </p>


            </div>

          ))}


        </div>






        {/* Repository Overview */}

        {analysis?.repository_info && (

          <div
            className="
            mt-10
            rounded-2xl
            border
            border-gray-800
            bg-gray-950
            p-8
            "
          >

            <h3 className="text-2xl font-bold">
              Repository Overview
            </h3>


            <div className="grid md:grid-cols-3 gap-6 mt-6">


              <div>

                <p className="text-gray-400">
                  Name
                </p>

                <p className="mt-2 font-semibold">
                  {analysis.repository_info.name}
                </p>

              </div>



              <div>

                <p className="text-gray-400">
                  Owner
                </p>

                <p className="mt-2 font-semibold">
                  {analysis.repository_info.owner}
                </p>

              </div>




              <div>

                <p className="text-gray-400">
                  Language
                </p>

                <p className="mt-2 font-semibold">
                  {analysis.repository_info.language}
                </p>

              </div>




              <div>

                <p className="text-gray-400">
                  Stars
                </p>

                <p className="mt-2 font-semibold">
                  ⭐ {analysis.repository_info.stars.toLocaleString()}
                </p>

              </div>



              <div>

                <p className="text-gray-400">
                  Forks
                </p>

                <p className="mt-2 font-semibold">
                  {analysis.repository_info.forks.toLocaleString()}
                </p>

              </div>



            </div>


          </div>

        )}







        {/* Project Health */}

        <div
          className="
          mt-10
          rounded-2xl
          border
          border-gray-800
          bg-gray-950
          p-8
          "
        >


          <h3 className="text-2xl font-bold">
            Project Health
          </h3>



          <div className="mt-6 space-y-6">



            <div>

              <div className="flex justify-between text-sm">

                <span>
                  Code Maintainability
                </span>

                <span>
                  92%
                </span>

              </div>


              <div className="h-2 bg-gray-800 rounded-full mt-2">

                <div
                  className="h-2 bg-white rounded-full"
                  style={{
                    width:"92%"
                  }}
                />

              </div>


            </div>





            <div>


              <div className="flex justify-between text-sm">

                <span>
                  Security Readiness
                </span>

                <span>
                  88%
                </span>

              </div>


              <div className="h-2 bg-gray-800 rounded-full mt-2">


                <div
                  className="h-2 bg-white rounded-full"
                  style={{
                    width:"88%"
                  }}
                />


              </div>


            </div>



          </div>


        </div>







        {/* AI Recommendations */}

        <div
          className="
          mt-10
          rounded-2xl
          border
          border-gray-800
          bg-gray-950
          p-8
          "
        >


          <h3 className="text-2xl font-bold">
            AI Engineering Insights
          </h3>



          <div className="mt-5 space-y-4">


            {recommendations.map(
              (item:string)=>(
              
              <div
                key={item}
                className="flex gap-3 text-gray-300"
              >

                <span className="text-green-400">
                  ✓
                </span>


                {item}


              </div>

            ))}



          </div>


        </div>



      </div>


    </section>

  );

}