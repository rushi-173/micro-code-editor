// Helper function to simulate API delay
export function mockApiCall<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1500);
  });
}

export default mockApiCall;
