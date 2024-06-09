import { ApiResponse } from "@/domain/api-response";

export const handleErrorResponse = async (
  res: Response
): Promise<ApiResponse> => {
  if (res.status === 400) {
    const message = await res.json();
    return { type: "BAD_REQUEST", message };
  }
  if (res.status === 401) {
    return { type: "UNAUTHORIZED" };
  }
  if (res.status === 404) {
    return { type: "NOT_FOUND" };
  }
  return { type: "INTERNAL_SERVER_ERROR" };
};
