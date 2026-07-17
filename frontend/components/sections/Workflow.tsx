const steps = [
  {
    number: "01",
    title: "Connect Repository",
    description:
      "Connect your GitHub repository and let DevScope AI understand your complete project structure.",
  },
  {
    number: "02",
    title: "AI Analyzes Code",
    description:
      "Our intelligence engine analyzes code quality, architecture, security, and development patterns.",
  },
  {
    number: "03",
    title: "Generate Intelligence Report",
    description:
      "Receive detailed insights, improvement suggestions, and engineering recommendations.",
  },
  {
    number: "04",
    title: "Build Better Software",
    description:
      "Apply AI-powered recommendations and continuously improve your applications.",
  },
];


export default function Workflow() {
  return (
    <section
      id="workflow"
      className="py-24 px-6"
    >

      <div className="max-w-6xl mx-auto">


        {/* Heading */}

        <div className="text-center">

          <p className="text-gray-400">
            Workflow
          </p>


          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            How DevScope AI Works
          </h2>


          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            From your repository to actionable engineering insights,
            DevScope AI simplifies software understanding.
          </p>

        </div>



        {/* Steps */}

        <div className="mt-16 grid md:grid-cols-4 gap-6">


          {steps.map((step)=>(

            <div
              key={step.number}
              className="
              rounded-2xl
              border
              border-gray-800
              bg-gray-950
              p-6
              hover:border-gray-600
              transition
              "
            >

              <span className="text-gray-500 text-sm">
                {step.number}
              </span>


              <h3 className="mt-4 text-xl font-semibold">
                {step.title}
              </h3>


              <p className="mt-3 text-gray-400 text-sm">
                {step.description}
              </p>


            </div>

          ))}


        </div>


      </div>

    </section>
  );
}