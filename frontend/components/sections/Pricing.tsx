const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "For developers exploring AI-powered insights.",
    features: [
      "Basic code analysis",
      "Project overview",
      "AI suggestions",
    ],
  },
  {
    name: "Developer",
    price: "₹499",
    description: "For developers building serious projects.",
    features: [
      "Advanced analysis",
      "Architecture insights",
      "Documentation generation",
    ],
  },
  {
    name: "Team",
    price: "Custom",
    description: "For teams improving software quality.",
    features: [
      "Team collaboration",
      "Advanced reports",
      "Priority intelligence",
    ],
  },
];


export default function Pricing() {
  return (
    <section className="py-24 px-6">

      <div className="max-w-6xl mx-auto text-center">

        <p className="text-gray-400">
          Pricing
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mt-3">
          Simple Plans For Every Developer
        </h2>


        <div className="mt-14 grid md:grid-cols-3 gap-6">


          {plans.map((plan)=>(
            <div
              key={plan.name}
              className="
              rounded-2xl
              border
              border-gray-800
              bg-gray-950
              p-8
              text-left
              "
            >

              <h3 className="text-2xl font-semibold">
                {plan.name}
              </h3>


              <p className="text-4xl font-bold mt-5">
                {plan.price}
              </p>


              <p className="mt-4 text-gray-400">
                {plan.description}
              </p>


              <ul className="mt-6 space-y-3">

                {plan.features.map((item)=>(
                  <li
                    key={item}
                    className="text-gray-300"
                  >
                    ✓ {item}
                  </li>
                ))}

              </ul>


            </div>
          ))}


        </div>

      </div>

    </section>
  );
}