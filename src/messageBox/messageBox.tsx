import { MessageType, TMessage } from '../constants/types';

export default function MessageBox({ message, type }: TMessage): JSX.Element {
  const messageColor = type || MessageType.info;
  const styles = `grid place-items-center bg-${messageColor}-500 font-mon pl-2 text-white content-center justify-center translate-y-4 h-12`;
  return <div className={styles}>{message}</div>;
}
