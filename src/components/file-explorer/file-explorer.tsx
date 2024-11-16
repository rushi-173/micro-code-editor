"use client";

import { fetchFiles } from "@/apis/editor";
import { FileNode } from "@/types/file-explorer";
import { buildFileTree } from "@/utils/file-explorer/build-file-tree";
import { useEffect, useState } from "react";
import FileExplorerItem from "./file-explorer-item";
import useTraverseFileTree from "@/hooks/use-traverse-file-tree";

export default function FileExplorer() {
  const [filesdata, setFilesData] = useState<FileNode[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetchFiles();
      const tranformedFileTree = buildFileTree(response?.data?.files || []);
      setFilesData(tranformedFileTree);
    })();
  }, []);

  const { insertNode, deleteNode } = useTraverseFileTree();

  const handleInsertNode = (
    parentPath: string,
    name: string,
    isDirectory: boolean
  ) => {
    if (!name) return;
    const updatedFilesData = insertNode(
      filesdata,
      parentPath,
      {
        name,
        relativePath: `${parentPath}/${name}`,
        pathType: isDirectory ? "directory" : "file",
        gitStatus: "new",
        gitIgnored: false,
      },
      isDirectory
    );
    setFilesData(updatedFilesData);
  };

  const handleDeleteNode = (pathToDelete: string) => {
    const updatedFilesData = deleteNode(filesdata, pathToDelete);
    setFilesData(updatedFilesData);
  };

  const handleFileClick = (fileNode: FileNode) => {
    console.log(fileNode);
  };

  return (
    <div className="w-full h-full relative pt-12">
      <div className="px-4 py-1 h-8 w-full absolute top-0 left-0 flex items-center border-b border-slate-950/10">
        <p className="text-xs font-semibold">{"File Explorer"}</p>
      </div>
      <div className="w-full h-full overflow-auto flex flex-col">
        {filesdata?.map((fileNodeData, index) => {
          return (
            <FileExplorerItem
              fileNode={fileNodeData}
              key={fileNodeData.relativePath + index}
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              onFileClick={handleFileClick}
            />
          );
        })}
      </div>
    </div>
  );
}
