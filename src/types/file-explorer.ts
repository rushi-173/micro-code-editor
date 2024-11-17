export interface FileNode {
  name: string;
  relativePath: string;
  pathType: "file" | "directory";
  children?: FileNode[];
  gitStatus: string | null;
  gitIgnored: boolean;
  isOpened?: boolean;
}
