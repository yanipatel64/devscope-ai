const features = [
  {
    title: "AI Code Review",
    description:
      "Automatically analyze your codebase and receive intelligent suggestions for better quality and maintainability.",
    icon: "🧠",
  },
  {
    title: "Project Intelligence",
    description:
      "Understand your entire project structure with AI-generated insights and summaries.",
    icon: "📊",
  },
  {
    title: "Architecture Analysis",
    description:
      "Visualize software architecture and discover improvement opportunities.",
    icon: "🏗️",
  },
  {
    title: "Security Insights",
    description:
      "Identify potential vulnerabilities and improve your application's security.",
    icon: "🔒",
  },
  {
    title: "Smart Documentation",
    description:
      "Generate professional documentation, API explanations, and project summaries.",
    icon: "📄",
  },
  {
    title: "Performance Intelligence",
    description:
      "Find optimization opportunities and improve application performance.",
    icon: "⚡",
  },
];


export default function Features() {

  return (

    <section
      id="features"
      className="py-24 px-6"
    >

      <div className="max-w-6xl mx-auto text-center">


        <p className="text-gray-400 mb-3">
          Capabilities
        </p>


        <h2 className="text-4xl md:text-5xl font-bold">
          Everything Your Code Needs
        </h2>


        <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
          DevScope AI combines artificial intelligence with software
          engineering practices to help developers build better systems.
        </p>



        <div className="mt-14 grid md:grid-cols-3 gap-6">


          {features.map((feature)=>(
            
            <div
              key={feature.title}
              className="
              rounded-2xl
              border
              border-gray-800
              bg-gray-950
              p-6
              text-left
              hover:border-gray-600
              transition
              "
            >

              <div className="text-3xl mb-5">
                {feature.icon}
              </div>


              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>


              <p className="mt-3 text-gray-400">
                {feature.description}
              </p>


            </div>

          ))}


        </div>


      </div>


    </section>

  );
}