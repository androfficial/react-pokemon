import { axiosInstance } from 'api/instance';
import { AxiosResponse } from 'axios';
import { IGetTypes } from 'types';

export const getTypes = (): Promise<AxiosResponse<IGetTypes>> =>
  axiosInstance.get<IGetTypes>(`/type`);
