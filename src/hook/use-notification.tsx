import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/domain/api-response";

interface HandleApiResponseProps {
  res: ApiResponse;
  onSuccess: () => void;
  successMessage?: string;
  unauthorizedMessage?: string;
}

export const useNotification = () => {
  const router = useRouter();

  const handleApiResponse = ({
    res,
    onSuccess,
    successMessage,
    unauthorizedMessage,
  }: HandleApiResponseProps): void => {
    switch (res.type) {
      case "OK":
        successMessage && toast.success(successMessage);
        onSuccess();
        break;
      case "BAD_REQUEST":
        toast.error(
          typeof res.message === "string" ? res.message : res.message.join(", ")
        );
        break;
      case "UNAUTHORIZED":
        toast.error(unauthorizedMessage ?? "Unauthorized");
        router.push("/auth");
        break;
      default:
        toast.error("We have a problem. Please try again later.");
        break;
    }
  };

  return {
    handleApiResponse,
  };
};
