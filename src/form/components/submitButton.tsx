import { Style } from '../../constants';

export const SubmitButton = () => (
  <button
    type="submit"
    className={`self-center min-w-min w-2/5 h-10 rounded-lg mt-2 ${Style.button} ${Style.buttonHover}`}
  >
    SUBMIT
  </button>
);
