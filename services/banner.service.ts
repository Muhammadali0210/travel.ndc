import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import request from '../hooks/https-request';
import { IBanner } from '@/types';

const service = {
  getList: (params?: Record<string, unknown>) => request.get('/banners', { params }),
};

interface Params {
  [key: string]: unknown;
}

export const useBannerGet = () => {
  return useQuery<IBanner, Error>({
    queryFn: () => service.getList().then(res => res.data)
  });
};
