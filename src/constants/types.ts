export type TFormData = {
  name: string;
  age: number;
};

export enum Links {
  home = '',
  componentForm = 'component-form',
  hookForm = 'hook-form',
}

export enum Style {
  bgColor = 'bg-zinc-800',
  textColor = 'text-stone-200',
  textHover = 'hover:text-sky-600',
  button = 'bg-sky-600',
  buttonHover = 'hover:bg-sky-800',
  textActive = 'text-sky-800',
}

export enum QueryParams {
  page = 'page',
}

export enum FormNames {
  name = 'name',
  age = 'age',
  email = 'email',
  password = 'password',
  confirm = 'confirm',
  gender = 'gender',
  country = 'country',
  agree = 'agree',
  image = 'image',
}
