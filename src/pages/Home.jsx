import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  Briefcase,
  MessageSquare,
  Sparkles,
  Target,
  BarChart3,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";


const products = [
  {
    icon: Target,
    number: "01",
    title: "30-Day Job Plan",
    description:
      "Know exactly what to do every day instead of randomly applying to jobs.",
  },
  {
    icon: FileText,
    number: "02",
    title: "ATS Resume Pack",
    description:
      "Professional resume templates built to help you present your skills clearly.",
  },
  {
    icon: Briefcase,
    number: "03",
    title: "Interview Guide",
    description:
      "50 common questions with practical frameworks to prepare with confidence.",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "AI Prompt Pack",
    description:
      "Useful prompts for resumes, applications, interviews and your job search.",
  },
  {
    icon: MessageSquare,
    number: "05",
    title: "Recruiter Messages",
    description:
      "Ready-to-customize messages for recruiters, referrals and LinkedIn outreach.",
  },
  {
    icon: BarChart3,
    number: "06",
    title: "Application Tracker",
    description:
      "Keep every company, application, interview and follow-up organized.",
  },
];

 function BuyButton({ children = "Get the Kit — ₹99" }) {
  const buy = async () => {
    try {
      // Create Razorpay order
      const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const response = await fetch(`${API_URL}/api/create-order`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

      const data = await response.json();

      if (!data.success) {
        alert("Unable to start payment. Please try again.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "JobLaunch",
        description: "IT Fresher Job Launch Kit",
        order_id: data.order.id,

        handler: async function (paymentResponse) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch(
  `${API_URL}/api/verify-payment`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentResponse),
  }
);
            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Send customer to protected download page
              window.location.href = `/success?token=${verifyData.token}`;
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert(
              "Payment was completed, but verification failed. Please contact support."
            );
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed.");
          },
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed. Please try again.");
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        "Unable to connect to the payment server. Make sure your backend is running."
      );
    }
  };

  return (
    <button
      onClick={buy}
      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#070b16] shadow-[0_10px_40px_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_50px_rgba(255,255,255,0.14)]"
    >
      {children}

      <ArrowRight
        size={17}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </button>
  );
}
export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#05070d] text-white">

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/[0.10] blur-[140px]" />
        <div className="absolute right-[-300px] top-[500px] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.06] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070d]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
              <Sparkles size={18} />
            </div>

            <div>
              <div className="text-sm font-bold tracking-tight">
                JobLaunch
              </div>
              <div className="text-[10px] text-slate-500">
                IT Fresher Kit
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a href="#inside" className="transition hover:text-white">
              What's inside
            </a>
            <a href="#process" className="transition hover:text-white">
              How it works
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
          </div>

          <BuyButton />
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-5 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">

            {/* LEFT */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/15 bg-blue-400/[0.06] px-3.5 py-2 text-xs font-medium text-blue-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
                Built for Indian IT Freshers
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="max-w-3xl text-[46px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl md:text-7xl"
              >
                Stop guessing.
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                  Start getting ready.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-7 max-w-xl text-base leading-7 text-slate-400 md:text-lg"
              >
                A complete job-search toolkit for IT freshers — resume,
                applications, interview preparation, recruiter outreach and a
                30-day action plan.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              >
                <BuyButton />
                <a
                  href="#inside"
                  className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-slate-400 transition hover:text-white"
                >
                  Explore the kit
                  <ArrowRight size={15} />
                </a>
              </motion.div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <Check size={14} className="text-cyan-400" />
                  One-time payment
                </span>
                <span className="flex items-center gap-2">
                  <Check size={14} className="text-cyan-400" />
                  Instant digital access
                </span>
              </div>
            </div>

            {/* PRODUCT PREVIEW */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-10 rounded-full bg-blue-500/[0.08] blur-[80px]" />

              <div className="relative rounded-3xl border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">

                {/* browser */}
                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0e18]">

                  <div className="flex h-11 items-center gap-1.5 border-b border-white/[0.06] px-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>

                  <div className="p-6 md:p-8">

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400">
                          Job Launch Kit
                        </p>
                        <h3 className="mt-2 text-xl font-semibold">
                          Your 30-Day Plan
                        </h3>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <Target size={19} />
                      </div>
                    </div>

                    <div className="mt-7 space-y-3">
                      {[
                        ["Week 1", "Resume & profile"],
                        ["Week 2", "Applications"],
                        ["Week 3", "Interview preparation"],
                        ["Week 4", "Follow-ups & improvement"],
                      ].map(([week, title], i) => (
                        <div
                          key={week}
                          className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-xs font-semibold text-slate-400">
                            0{i + 1}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-slate-500">
                              {week}
                            </div>
                            <div className="mt-0.5 text-sm font-medium">
                              {title}
                            </div>
                          </div>

                          <Check size={16} className="text-cyan-400" />
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-400/10 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                          Complete toolkit
                        </span>
                        <span className="text-sm font-semibold text-cyan-300">
                          6 resources
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* TRUST / POSITIONING */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/[0.06] md:grid-cols-4">
          {[
            ["6", "Practical resources"],
            ["30", "Days of structure"],
            ["50+", "Interview questions"],
            ["₹99", "Launch price"],
          ].map(([value, label]) => (
            <div key={label} className="px-4 py-7 text-center md:py-9">
              <div className="text-xl font-semibold tracking-tight md:text-2xl">
                {value}
              </div>
              <div className="mt-1 text-[11px] text-slate-500 md:text-xs">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSIDE */}
      <section id="inside" className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">

          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              What's inside
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Six tools.
              <br />
              One job-search system.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
              Everything is designed to help you move from “I don't know where
              to start” to a clear, repeatable job-search routine.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => {
              const Icon = product.icon;

              return (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-blue-400">
                      <Icon size={20} />
                    </div>

                    <span className="text-xs text-slate-600">
                      {product.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-semibold">
                    {product.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {product.description}
                  </p>

                  <div className="mt-7 h-px w-10 bg-blue-400/30 transition-all duration-300 group-hover:w-20" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] px-5 py-24 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">

          <div className="rounded-3xl border border-white/[0.07] bg-[#080b13] p-8 md:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Before
            </div>

            <h3 className="mt-4 text-2xl font-semibold">
              Random job searching
            </h3>

            <div className="mt-8 space-y-4">
              {[
                "Applying without a clear plan",
                "Generic resume for every role",
                "Losing track of applications",
                "Unsure what to prepare",
                "Forgetting follow-ups",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-500"
                >
                  <span className="text-slate-700">×</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-blue-400/15 bg-blue-500/[0.04] p-8 md:p-10">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-[70px]" />

            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                After
              </div>

              <h3 className="mt-4 text-2xl font-semibold">
                A clear job-search system
              </h3>

              <div className="mt-8 space-y-4">
                {[
                  "Follow a 30-day action plan",
                  "Improve your resume",
                  "Track every application",
                  "Prepare systematically",
                  "Follow up professionally",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/10">
                      <Check size={12} className="text-cyan-300" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Simple process
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Buy. Access. Start.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Get the kit", "Pay once and get access to the resources."],
              ["02", "Organize your search", "Set up your resume, tracker and plan."],
              ["03", "Execute for 30 days", "Follow the system and keep improving."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7"
              >
                <div className="text-xs font-semibold text-blue-400">
                  {number}
                </div>

                <h3 className="mt-6 text-lg font-semibold">{title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-5 pb-28 md:px-8 md:pb-36">
        <div className="mx-auto max-w-2xl">

          <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-[#090d18] p-8 text-center shadow-2xl shadow-blue-950/20 md:p-12">

            <div className="absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[80px]" />

            <div className="relative">

              <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400">
                <ShieldCheck size={14} className="text-cyan-400" />
                One-time purchase
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Launch price
              </p>

              <div className="mt-3">
                <span className="text-6xl font-semibold tracking-[-0.05em]">
                  ₹99
                </span>
              </div>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
                Get the complete IT Fresher Job Launch Kit and start following
                a structured job-search process.
              </p>

              <div className="mx-auto mt-8 max-w-sm space-y-3 text-left">
                {products.map((product) => (
                  <div
                    key={product.title}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <Check size={16} className="shrink-0 text-cyan-400" />
                    {product.title}
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <BuyButton>Get the Complete Kit — ₹99</BuyButton>
              </div>

              <p className="mt-4 text-[11px] text-slate-600">
                Digital product • No subscription
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-3xl">

          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              FAQ
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Questions, answered.
            </h2>
          </div>

          <div className="mt-12 divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6">

            {[
              [
                "Who is this for?",
                "It is primarily designed for Indian IT and software freshers who are starting or improving their job search.",
              ],
              [
                "Does this guarantee a job?",
                "No. This is a toolkit and action system. Your outcome depends on your skills, applications, preparation and execution.",
              ],
              [
                "How will I receive the resources?",
                "After payment, you will be directed to the access page where the resources can be provided.",
              ],
              [
                "Is this a subscription?",
                "No. It is a one-time digital purchase.",
              ],
            ].map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-medium">
                  {question}
                  <ChevronDown
                    size={17}
                    className="shrink-0 text-slate-500 transition group-open:rotate-180"
                  />
                </summary>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
                  {answer}
                </p>
              </details>
            ))}

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.10] to-cyan-400/[0.03] px-7 py-16 text-center md:px-12 md:py-20">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Start today
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Your first IT job needs a system.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
            Stop collecting random advice. Start with a practical toolkit you
            can actually use.
          </p>

          <div className="mt-8">
            <BuyButton>Get the Kit — ₹99</BuyButton>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center text-xs text-slate-600 md:flex-row md:items-center md:justify-between md:text-left">
          <div>© 2026 JobLaunch. All rights reserved.</div>
          <div>IT Fresher Job Launch Kit</div>
        </div>
      </footer>

    </div>
  );
}