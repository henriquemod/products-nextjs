import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/domain/api-reponse";

interface HandleApiResponseProps {
  res: ApiResponse;
  successMessage: string;
  onSuccess: () => void;
}

export const useNotification = () => {
  const router = useRouter();

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
        router.push("/auth");
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
