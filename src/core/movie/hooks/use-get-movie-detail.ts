
import { ObjectKey, useAxiosSWR } from '@/shared/hooks/use-axios-swr';
import { FETCH_MOVIE_DETAIL } from '@/constants/swr-keys';
import { movieApi } from '@/services/rest-api/app-api/movie/movie';
import { ExtendingParams } from '@/services/rest-api/app-api/types';

type TFetchingKey = ObjectKey<ExtendingParams<{ slug: string }>>;

const fetcher = ({ key, ...params }: TFetchingKey) => movieApi.fetchMovieDetail(params);

export const useGetMovieDetail = (slug: string) => {
  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useAxiosSWR(
    slug
      ? {
          key: FETCH_MOVIE_DETAIL,
          slug,
        }
      : null,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  return {
    movie: data?.data?.item,
    error,
    isLoading,
    refetch,
  };
};
