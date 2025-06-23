
import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    return {
      message: error.response.data?.message || 'Đã có lỗi xảy ra',
      status: error.response.status,
      code: error.response.data?.code,
    };
  }
  
  if (error.request) {
    return {
      message: 'Không thể kết nối đến server',
      code: 'NETWORK_ERROR',
    };
  }
  
  return {
    message: error.message || 'Đã có lỗi xảy ra',
    code: 'UNKNOWN_ERROR',
  };
};
