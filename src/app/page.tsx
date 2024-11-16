"use client";

export default function Home() {
  return (
    <div className="w-full h-dvh flex flex-col divide-y-2 divide-slate-950/10">
      <div className="w-full h-12 px-4 py-2 flex items-center">
        <p>JS Code</p>
      </div>
      <div className="w-full h-12"></div>
      <div className="w-full flex-1">
        <div className="w-full h-full flex flex-row items-center divide-x-2 divide-slate-950/10">
          <div className="w-full h-full max-w-md overflow-y-auto"></div>
          <div className="w-full h-full overflow-y-auto"></div>
        </div>
      </div>
      <div className="w-full h-12"></div>
    </div>
  );
}
