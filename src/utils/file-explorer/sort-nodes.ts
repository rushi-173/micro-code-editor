import { FileNode } from "@/types/file-explorer";

export const sortNodes = (nodes: FileNode[]) => {
  nodes.sort((a, b) => {
    if (a.pathType !== b.pathType) {
      return a.pathType === "directory" ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
  nodes.forEach((node) => {
    if (node.children) {
      sortNodes(node.children);
    }
  });
};
