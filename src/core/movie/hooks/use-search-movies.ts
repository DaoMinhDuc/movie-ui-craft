
import { useMemo } from 'react';
import { ObjectKey, useAxiosSWR } from '@/shared/hooks/use-axios-swr';
import { SEARCH_MOVIES } from '@/constants/swr-keys';
import { movieApi } from '@/services/rest-api/app-api/movie/movie';
import { SearchParams } from '@/services/rest-api/app-api/types';

type TFetchingKey = ObjectKey<SearchParams>;

const fetcher = ({ key, ...params }: TFetchingKey) => movieApi.searchMovies(params);

export const useSearchMovies = (params: SearchParams) => {
  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useAxiosSWR(
    params.keyword
      ? {
          key: SEARCH_MOVIES,
          ...params,
        }
      : null,
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
