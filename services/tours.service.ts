import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import request from '../hooks/https-request';
import { ApiResponse, ITour } from '@/types';

const service = {
  getList: (params?: Record<string, unknown>) => request.get('/tours', { params }),
  getById: (id: string) => request.get(`/tours/${id}`),
};

interface Params {
  [key: string]: unknown;
}

interface InnerPage {
   data: ITour
}

export const useToursGet = ({
  params,
  options
}: {
  params?: Params;
  options?: UseQueryOptions<ApiResponse, Error>;
} = {}) => {
  return useQuery<ApiResponse, Error>({
    queryKey: ['tours', params],
    queryFn: () => service.getList(params).then(res => res.data),
    ...options
  });
};

export const useToursByIdGet = (id: string) => {
  return useQuery<InnerPage, Error>({
    queryKey: ['tours', id],
    queryFn: () => service.getById(id).then(res => res.data)
  });
};
