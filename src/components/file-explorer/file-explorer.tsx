"use client";

import { fetchFiles } from "@/apis/editor";
import { useEffect, useState } from "react";

export default function FileExplorer() {
  const [filesdata, setFilesData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchFiles();
      setFilesData(response?.data || []);
    })();
  }, []);

  console.log(filesdata);

  return (
    <div className="w-full h-full relative pt-16 overflow-auto">
      <div className="px-4 py-1 h-12 w-full absolute top-0 left-0 flex items-center border-b border-slate-950/10">
        <p>{"File Explorer"}</p>
      </div>
      <div className="flex flex-col"></div>
    </div>
  );
}
