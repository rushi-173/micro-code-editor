import branchesData from "@/lib/data-v2/branches.json";
import filesData from "@/lib/data-v2/list-files.json";
import openWorksheetsData from "@/lib/data-v2/open-worksheets.json";
import mockApiCall from "@/utils/mock-api-call";

export async function fetchBranches() {
  return mockApiCall(branchesData);
}

export async function fetchFiles() {
  return mockApiCall(filesData);
}

export async function fetchOpenWorksheets(branch?: string) {
  const activeWorksheets = !branch
    ? openWorksheetsData?.activeWorksheets
    : openWorksheetsData?.activeWorksheets?.filter(
        (item) => item?.branch === branch
      );
  return mockApiCall({ activeWorksheets });
}
