import { LoadingIndicator } from "../LoadingIndicator";
import { NoStudent } from "../NoStudent";
import { Result } from "./Result";

interface RenderResultControllerProps {
  isLoading: boolean;
  error: string;
  result: any;
}

export const RenderResultController = ({
  isLoading,
  error,
  result,
}: RenderResultControllerProps) => {
  if (isLoading) {
    return <LoadingIndicator />;
  } else if (error) {
    return <NoStudent />;
  } else if (result) {
    return <Result {...result} />;
  } else {
    return <></>;
  }
};
