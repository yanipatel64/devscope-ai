import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">

      {/* Badge */}
      <div className="mb-6 px-4 py-2 rounded-full border border-gray-700 bg-gray-900 text-sm text-gray-300">
        ✨ AI-Powered Developer Intelligence Platform
      </div>


      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
        Understand.
        <span className="text-gray-400"> Analyze.</span>
        <br />
        Improve Your Code With AI.
      </h1>


      {/* Description */}
      <p className="mt-6 max-w-2xl text-lg text-gray-400">
        DevScope AI transforms your software projects into intelligent
        insights by analyzing code quality, architecture, performance,
        and development patterns.
      </p>


      {/* Buttons */}
      <div className="mt-8 flex gap-4">

        <Link
          href="/dashboard"
          className="
          px-7 py-3
          rounded-xl
          bg-white
          text-black
          font-medium
          hover:scale-105
          transition
          "
        >
          Analyze Project
        </Link>


        <button
          className="
          px-7 py-3
          rounded-xl
          border
          border-gray-700
          hover:bg-gray-900
          transition
          "
        >
          Explore Demo
        </button>

      </div>


      {/* Dashboard Preview */}
      <div
        id="dashboard"
        className="
        mt-16
        w-full
        max-w-5xl
        rounded-2xl
        border
        border-gray-800
        bg-gray-950
        p-6
        shadow-2xl
        "
      >

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-lg font-semibold">
            Project Intelligence Dashboard
          </h2>


          <span className="text-green-400 text-sm">
            ● AI Active
          </span>

        </div>


        <div className="grid md:grid-cols-3 gap-5">


          <div className="rounded-xl bg-gray-900 p-5">

            <p className="text-gray-400 text-sm">
              Code Quality
            </p>

            <h3 className="text-3xl font-bold mt-2">
              94%
            </h3>

          </div>



          <div className="rounded-xl bg-gray-900 p-5">

            <p className="text-gray-400 text-sm">
              Issues Detected
            </p>

            <h3 className="text-3xl font-bold mt-2">
              12
            </h3>

          </div>



          <div className="rounded-xl bg-gray-900 p-5">

            <p className="text-gray-400 text-sm">
              Architecture Score
            </p>

            <h3 className="text-3xl font-bold mt-2">
              A+
            </h3>

          </div>


        </div>

      </div>


    </section>
  );
}