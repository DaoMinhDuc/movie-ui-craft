
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { AxiosResponse } from 'axios';
import { handleApiError } from '@/services/rest-api/app-api/error-handler';

export type ObjectKey<T = any> = {
  key: string;
} & T;

type AxiosFetcher<T> = (params: ObjectKey<T>) => Promise<AxiosResponse<any>>;

export function useAxiosSWR<T = any, R = any>(
  key: ObjectKey<T> | null,
  fetcher: AxiosFetcher<T>,
  options?: SWRConfiguration
): SWRResponse<R, any> {
  return useSWR(
    key,
    async (params) => {
      try {
        const response = await fetcher(params);
        return response.data;
      } catch (error: any) {
        const apiError = handleApiError(error);
        throw new Error(apiError.message);
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      ...options,
    }
  );
}
