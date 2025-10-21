import type { StudentInfo } from "@/apis/types";
import { LoadingIndicator } from "../LoadingIndicator";
import { NoStudent } from "../NoStudent";
import { Result } from "./Result";
export type ResultProps = Omit<StudentInfo, "itemMeal" | "itemMentor" | "itemBook">;

interface RenderResultControllerProps {
    isLoading: boolean;
    error: string;
    result: ResultProps | null;
}

export const RenderResultController = ({ isLoading, error, result }: RenderResultControllerProps) => {
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
