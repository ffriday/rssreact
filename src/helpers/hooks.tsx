import { useParams } from 'react-router-dom';
import { Links } from '../constants';

export const useUrlParams = () => {
  const { page: currentPage } = useParams();
  const page = currentPage || Links.home;
  return { page };
};
