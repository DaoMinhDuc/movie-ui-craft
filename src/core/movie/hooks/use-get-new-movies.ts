
import { useMemo } from 'react';
import { ObjectKey, useAxiosSWR } from '@/shared/hooks/use-axios-swr';
import { FETCH_NEW_MOVIES } from '@/constants/swr-keys';
import { movieApi } from '@/services/rest-api/app-api/movie/movie';
import { PaginationParams } from '@/services/rest-api/app-api/types';

type TFetchingKey = ObjectKey<PaginationParams<{ version?: 'v1' | 'v2' | 'v3' }>>;

const fetcher = ({ key, ...params }: TFetchingKey) => movieApi.fetchNewMovies(params);

export const useGetNewMovies = (page: number = 1, version: 'v1' | 'v2' | 'v3' = 'v1') => {
  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useAxiosSWR(
    {
      key: FETCH_NEW_MOVIES,
      page,
      version,
    } as TFetchingKey,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  const movieList = useMemo(() => data?.data?.items ?? [], [data]);

  return {
    data,
    movieList,
    error,
    isLoading,
    refetch,
  };
};
