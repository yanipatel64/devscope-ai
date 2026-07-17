export default function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="py-24 px-6"
    >

      <div className="max-w-6xl mx-auto">

        <div className="text-center">

          <p className="text-gray-400">
            Product Preview
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Intelligent Project Dashboard
          </h2>

          <p className="mt-5 text-gray-400">
            Get complete visibility into your software projects
            with AI-powered insights.
          </p>

        </div>


        <div className="
          mt-14
          rounded-2xl
          border
          border-gray-800
          bg-gray-950
          p-8
        ">


          <div className="grid md:grid-cols-3 gap-6">


            <div className="bg-gray-900 rounded-xl p-6">
              <p className="text-gray-400">
                Code Quality
              </p>

              <h3 className="text-4xl font-bold mt-3">
                94%
              </h3>
            </div>


            <div className="bg-gray-900 rounded-xl p-6">
              <p className="text-gray-400">
                Security
              </p>

              <h3 className="text-4xl font-bold mt-3">
                A+
              </h3>
            </div>


            <div className="bg-gray-900 rounded-xl p-6">
              <p className="text-gray-400">
                Architecture
              </p>

              <h3 className="text-4xl font-bold mt-3">
                Clean
              </h3>
            </div>


          </div>


        </div>


      </div>


    </section>
  );
}