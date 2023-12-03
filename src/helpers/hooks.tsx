import { useLocation } from 'react-router-dom';

export const useCurrentPage = () => {
  const { pathname } = useLocation();
  return pathname.replace('/', '');
};
