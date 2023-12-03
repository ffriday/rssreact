export enum FormNames {
  name = 'name',
  age = 'age',
  email = 'email',
  password = 'password',
  confirm = 'confirm',
  gender = 'gender',
  country = 'country',
  image = 'image',
  accept = 'accept',
}

export type TFormData = {
  [FormNames.name]: string;
  [FormNames.age]: number;
  [FormNames.email]: string;
  [FormNames.password]: string;
  [FormNames.country]: string;
  [FormNames.gender]: string;
  [FormNames.confirm]: string;
  [FormNames.image]: string;
  [FormNames.accept]: string;
};

type TProps = {
  type: string;
  name: string;
  id: string;
  placeholder: string;
};

export type TDataInput = {
  props: TProps;
  message: string;
  onChange?: (value: string) => void;
};

export type TDataProps = Omit<TProps, 'placeholder'> &
  Omit<TDataInput, 'props' | 'onChange'>;

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
