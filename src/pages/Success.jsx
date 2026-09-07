import { useState } from "react";
import { CheckCircle2, Download, ArrowRight, ShieldCheck } from "lucide-react";

export default function Success() {
  const [downloading, setDownloading] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const downloadKit = async () => {
    if (!token) {
      alert("Invalid or expired download link.");
      return;
    }

    setDownloading(true);

    try {
      const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const response = await fetch(
  `${API_URL}/api/download?token=${encodeURIComponent(token)}`
);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        alert(data.message || "Download link expired. Please contact support.");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "IT-Fresher-Job-Launch-Kit.zip";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Unable to download the kit. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070d] px-5 text-white">
      <div className="flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-2xl text-center">

          {/* Success icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
            <CheckCircle2 size={42} className="text-cyan-400" />
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Payment successful
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            You're ready to launch.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400">
            Your IT Fresher Job Launch Kit is ready. Download all 6 resources
            and start your 30-day job search system.
          </p>

          {/* Download card */}
          <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-white/[0.08] bg-white/[0.035] p-7 text-left backdrop-blur-xl">

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Download size={22} />
              </div>

              <div>
                <h2 className="font-semibold">
                  IT Fresher Job Launch Kit
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  6 practical resources • One ZIP file
                </p>
              </div>
            </div>

            <button
              onClick={downloadKit}
              disabled={downloading}
              className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-[#070b16] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {downloading ? "Preparing your download..." : "Download Your Kit"}

              {!downloading && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={14} className="text-cyan-400" />
              Secure access • Your download link is temporary
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-8 text-sm text-slate-500 transition hover:text-white"
          >
            ← Back to JobLaunch
          </button>

        </div>
      </div>
    </div>
  );
}