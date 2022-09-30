import { useQuery, useQueryClient } from "react-query";
import type { Treatment } from "../../../../../shared/types";
import { axiosInstance } from "axiosInstance";
import { queryKeys } from "react-query/constants";
// import { useCustomToast } from "components/app/hooks/useCustomToast";
import { AxiosError } from "axios";

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get("/treatments");
  return data;
}

export function useTreatments(): Treatment[] {
  // const toast = useCustomToast();
  const { data = [] } = useQuery<Treatment[], AxiosError>(
    queryKeys.treatments,
    getTreatments,
    // {
    //   onError: (error) => {
    //     toast({ title: error.message, status: "error" });
    //   },
    // }
    {
      onError: console.log,
    }
  );
  return data;
}

export function usePrefetchTreatments(): void {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery(queryKeys.treatments, getTreatments);
}
