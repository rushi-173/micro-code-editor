export interface OpenWorksheet {
  relativePath: string;
  name: string;
  pathType: "file";
  depth: number;
  index: number;
  gitStatus: string | null;
  editorContent: string;
  modifiedContent: string;
  gitIgnored: boolean;
  worksheetType: "git";
  repositoryId: string;
  branch: string;
  role: string;
  warehouse: string;
  content: string;
}

export interface FileListItem {
  relativePath: string;
  name: string;
  pathType: "file" | "directory";
  depth: number;
  index: number;
  gitStatus: string | null;
  gitIgnored: boolean;
}
