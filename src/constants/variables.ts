import { Links } from './types';

export const navLinks = [
  [Links.home, 'Home'],
  [Links.componentForm, 'Component form'],
  [Links.hookForm, 'Hook form'],
];

const inputStyle = 'text-gray-900 placeholder-current::placeholder';

export const inputs = {
  name: {
    type: 'name',
    name: 'name',
    placeholder: 'Name',
    className: inputStyle,
  },
};
