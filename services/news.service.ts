import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import request from '../hooks/https-request';
import { ApiResponse, INews } from '@/types';

const service = {
  getList: (params?: Record<string, unknown>) => request.get('/news', { params }),
  getById: (id: string) => request.get(`/news/${id}`),
};

interface InnerPage {
  data: INews
}

export const useNewsGet = () => {
  return useQuery<ApiResponse, Error>({
    queryKey: ['news'],
    queryFn: () => service.getList().then(res => res.data)
  });
};

export const useNewsByIdGet = (id: string) => {
  return useQuery<INews, Error>({
    queryKey: ['news', id],
    queryFn: () => service.getById(id).then(res => res?.data)
  });
};
