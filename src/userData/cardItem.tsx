type TCardItem = {
  caption: string;
  text: string;
  changed?: boolean;
  image?: string;
};

export const CardItem = ({ caption, text }: TCardItem) => {
  return <p>{`${caption}: ${text}`}</p>;
};
