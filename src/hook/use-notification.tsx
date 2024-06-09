import { ApiResponse } from "@/store/products-store";
import { toast } from "react-toastify";

interface HandleApiResponseProps {
  res: ApiResponse;
  successMessage: string;
  onSuccess: () => void;
}

export const useNotification = () => {
  const handleApiResponse = ({
    res,
    onSuccess,
    successMessage,
  }: HandleApiResponseProps): void => {
    switch (res.type) {
      case "OK":
        toast.success(successMessage);
        onSuccess();
        break;
      case "BAD_REQUEST":
        toast.error(
          typeof res.message === "string" ? res.message : res.message.join(", ")
        );
        break;
      case "UNAUTHORIZED":
        toast.error("Unauthorized");
        break;
      default:
        toast.error("Internal server error");
        break;
    }
  };

  return {
    handleApiResponse,
  };
};
