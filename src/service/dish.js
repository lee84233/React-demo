import axiosCommon from '../assets/lib/axios-common';

export function getDishList(url) {
  return axiosCommon.get(url);
}
