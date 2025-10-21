interface FetchParameters {
  action: string;
}

const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_TEST_BASE_URL
  : import.meta.env.VITE_BASE_URL || "/";

export const useFetch = <T>({ action }: FetchParameters) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (query?: string, fetchOptions?: RequestInit) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(
        `${BASE_URL}?action=${action}${query ? `&${query}` : ""}`,
        fetchOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (!result) {
        throw new Error("잘못된 정보입니다. 다시 입력해주세요.");
      }
      setError("");
      setData(result);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchData };
};
