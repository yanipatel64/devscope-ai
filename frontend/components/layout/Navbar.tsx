import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="
      fixed
      top-0
      left-0
      w-full
      z-50
      border-b
      border-white/10
      bg-black/70
      backdrop-blur-xl
      "
    >
      <div
        className="
        mx-auto
        flex
        h-16
        max-w-7xl
        items-center
        justify-between
        px-6
        "
      >

        {/* Logo */}
        <Link
          href="/"
          className="
          text-2xl
          font-bold
          tracking-tight
          text-white
          "
        >
          DevScope
          <span className="text-violet-500">
            {" "}AI
          </span>
        </Link>


        {/* Navigation */}
        <nav
          className="
          hidden
          gap-8
          text-sm
          text-gray-300
          md:flex
          "
        >

          <a
            href="#features"
            className="hover:text-white transition"
          >
            Features
          </a>


          <a
            href="#workflow"
            className="hover:text-white transition"
          >
            Workflow
          </a>


          <Link
            href="/dashboard"
            className="hover:text-white transition"
          >
            Dashboard
          </Link>

        </nav>


        {/* CTA Button */}
        <Link
          href="/dashboard"
          className="
          rounded-lg
          bg-violet-600
          px-5
          py-2
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-violet-500
          "
        >
          Get Started
        </Link>


      </div>
    </header>
  );
}