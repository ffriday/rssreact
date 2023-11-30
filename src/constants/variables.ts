import { Links } from './types';

export const navLinks = [
  [Links.home, 'Home'],
  [Links.componentForm, 'Component form'],
  [Links.hookForm, 'Hook form'],
];

export const inputs = {
  name: {
    type: 'text',
    name: 'name',
    placeholder: 'Name',
  },
  age: {
    type: 'number',
    name: 'age',
    placeholder: 'Age',
  },
  email: {
    type: 'email',
    name: 'email',
    placeholder: 'Email',
  },
};
