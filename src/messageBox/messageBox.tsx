import { MessageType, TMessage } from '../constants/types';

export default function MessageBox({ message, type }: TMessage): JSX.Element {
  const messageColor = type || MessageType.info;
  const styles = `flex items-center ${messageColor} font-mon text-white justify-center translate-y-4 h-8`;
  return <div className={styles}>{message}</div>;
}
