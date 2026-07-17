"use client";

import { useState } from "react";
import { useAnalysis } from "@/context/AnalysisContext";


interface RepositoryInfo {

  name: string;

  owner: string;

  language: string;

  stars: number;

  forks: number;

  description: string;

  updated: string;

}



interface Analysis {

  project_score: number;

  security_score: string;

  architecture: string;

  repository_info: RepositoryInfo;

  recommendations: string[];

}



export default function RepositoryAnalyzer() {


  const { setAnalysis } = useAnalysis();


  const [repoUrl, setRepoUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<Analysis | null>(null);



  const analyzeRepository = async () => {


    if (!repoUrl) {

      alert("Please enter a GitHub repository URL");

      return;

    }



    setLoading(true);

    setResult(null);



    try {


      const response = await fetch(

        "http://127.0.0.1:8000/analyze",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },


          body: JSON.stringify({

            url: repoUrl,

          }),

        }

      );



      const data = await response.json();



      if (data.error) {

        alert(data.error);

        return;

      }



      setResult(data.analysis);



      // Send data to Dashboard

      setAnalysis(data.analysis);



    }

    catch(error) {


      console.error(error);


      alert(
        "Unable to connect with DevScope AI Engine"
      );


    }


    finally {

      setLoading(false);

    }


  };




  return (


    <section className="min-h-screen py-24 px-6">


      <div className="max-w-6xl mx-auto">



        {/* Header */}


        <div className="text-center">


          <p className="text-gray-400">

            AI Repository Intelligence

          </p>



          <h1 className="text-5xl font-bold mt-3">

            Analyze Any GitHub Project

          </h1>



          <p className="mt-5 text-gray-400">

            Understand your software projects with AI-powered
            engineering insights.

          </p>


        </div>






        {/* Input */}


        <div className="mt-10 flex flex-col md:flex-row gap-4">


          <input


            value={repoUrl}


            onChange={(e)=>setRepoUrl(e.target.value)}


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
            outline-none
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
            hover:bg-violet-500
            transition
            disabled:opacity-50
            "


          >


            {loading ? "Analyzing..." : "Analyze"}


          </button>



        </div>








        {result && (


          <div className="mt-14 space-y-8">





            {/* Repository Information */}


            <div

              className="
              rounded-2xl
              border
              border-gray-800
              bg-gray-950
              p-8
              "

            >


              <h2 className="text-2xl font-bold">

                Repository Intelligence

              </h2>




              <div className="mt-6 grid md:grid-cols-3 gap-6">



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

                  title="⭐ Stars"

                  value={result.repository_info.stars.toLocaleString()}

                />



                <Info

                  title="Forks"

                  value={result.repository_info.forks.toLocaleString()}

                />



              </div>



            </div>









            {/* Scores */}


            <div className="grid md:grid-cols-3 gap-6">



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



            </div>









            {/* Recommendations */}



            <div

              className="
              rounded-2xl
              border
              border-gray-800
              bg-gray-950
              p-8
              "

            >



              <h2 className="text-2xl font-bold">

                AI Recommendations

              </h2>




              <ul className="mt-5 space-y-3">


                {result.recommendations.map((item)=>(


                  <li

                    key={item}

                    className="text-gray-300"

                  >

                    <span className="text-green-400">

                      ✓

                    </span>

                    {" "}

                    {item}


                  </li>


                ))}



              </ul>



            </div>





          </div>


        )}



      </div>


    </section>


  );


}





function Info({

  title,

  value,

}:{

  title:string;

  value:string;

}) {


  return (

    <div>

      <p className="text-gray-400">

        {title}

      </p>


      <p className="mt-2 font-semibold">

        {value}

      </p>


    </div>

  );

}





function Card({

  title,

  value,

}:{

  title:string;

  value:string;

}) {


  return (

    <div

      className="
      bg-gray-950
      border
      border-gray-800
      rounded-xl
      p-6
      "

    >


      <p className="text-gray-400">

        {title}

      </p>



      <h2 className="text-4xl font-bold mt-3">

        {value}

      </h2>


    </div>

  );

}