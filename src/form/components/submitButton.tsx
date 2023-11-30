import { Style } from '../../constants';

export const SubmitButton = () => (
  <button
    type="submit"
    className={`self-center min-w-min w-2/5 h-10 rounded-lg ${Style.button} ${Style.buttonHover}`}
  >
    SUBMIT
  </button>
);
