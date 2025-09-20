import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import request from '../hooks/https-request';

const service = {
  getList: (params?: Record<string, unknown>) => request.get('/faq', { params }),
};

interface Params {
  [key: string]: unknown;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}


type Response = {
    data: Faq[];
}

export const useFaqsGet = () => {
  return useQuery<Faq, Error>({
    queryKey: ['faqs'],
    queryFn: () => service.getList().then(res => res.data?.data || []),
  });
};
