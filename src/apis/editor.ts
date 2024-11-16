import branchesData from "@/lib/data/branches.json";
import filesData from "@/lib/data/list-files.json";
import openWorksheetsData from "@/lib/data/open-worksheets.json";
import mockApiCall from "@/utils/mock-api-call";

export async function fetchBranches() {
  return mockApiCall(branchesData);
}

export async function fetchFiles() {
  return mockApiCall(filesData);
}

export async function fetchOpenWorksheets() {
  return mockApiCall(openWorksheetsData);
}
