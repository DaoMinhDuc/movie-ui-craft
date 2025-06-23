
import { useMemo } from 'react';
import { ObjectKey, useAxiosSWR } from '@/shared/hooks/use-axios-swr';
import { FETCH_CATEGORIES } from '@/constants/swr-keys';
import { movieApi } from '@/services/rest-api/app-api/movie/movie';

type TFetchingKey = ObjectKey<{}>;

const fetcher = ({ key }: TFetchingKey) => movieApi.fetchCategories();

export const useGetCategories = () => {
  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useAxiosSWR(
    {
      key: FETCH_CATEGORIES,
    } as TFetchingKey,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  const categories = useMemo(() => data?.data ?? [], [data]);

  return {
    data,
    categories,
    error,
    isLoading,
    refetch,
  };
};
