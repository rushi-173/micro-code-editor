import { FileNode } from "@/types/file-explorer";
import { sortNodes } from "./sort-nodes";

export function buildFileTree(files: any[]): FileNode[] {
  const root: FileNode[] = [];
  const map = new Map<string, FileNode>();

  const sortedFiles = [...files].sort((a, b) => a.depth - b.depth);

  for (const file of sortedFiles) {
    const node: FileNode = {
      name: file.name,
      relativePath: file.relativePath,
      pathType: file.pathType,
      gitStatus: file.gitStatus,
      gitIgnored: file.gitIgnored,
      children: file.pathType === "directory" ? [] : undefined,
    };

    const parentPath = file.relativePath.split("/").slice(0, -1).join("/");

    if (parentPath === "") {
      root.push(node);
    } else {
      const parent = map.get(parentPath);
      if (parent && parent.children) {
        parent.children.push(node);
      }
    }

    map.set(file.relativePath, node);
  }

  sortNodes(root);
  return root;
}
