import Link from "next/link";


export default function CTA() {

  return (

    <section className="py-24 px-6">


      <div
        className="
        max-w-5xl
        mx-auto
        rounded-3xl
        border
        border-gray-800
        bg-gray-950
        p-12
        text-center
        "
      >

        <h2 className="text-4xl md:text-5xl font-bold">
          Build Better Software With AI
        </h2>


        <p className="mt-5 text-gray-400">
          Analyze your projects, understand your code,
          and improve development decisions.
        </p>


        <Link
          href="/dashboard"
          className="
          inline-block
          mt-8
          rounded-xl
          bg-violet-600
          px-8
          py-4
          font-semibold
          hover:bg-violet-500
          transition
          "
        >
          Start Analyzing
        </Link>


      </div>


    </section>

  );
}