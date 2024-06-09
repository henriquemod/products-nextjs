export type ApiResponse =
  | { type: "OK" }
  | { type: "BAD_REQUEST"; message: string | string[] }
  | { type: "UNAUTHORIZED" }
  | { type: "NOT_FOUND" }
  | { type: "INTERNAL_SERVER_ERROR" };
