import { navLinks } from '../constants';
import { DataInput, SubmitButton } from './components';

export const HookForm = () => {
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <section className="flex flex-col items-center w-full gap-5">
      <h2 className="uppercase font-semibold text-base tracking-wide">
        {navLinks[2][1]}
      </h2>
      <form
        onSubmit={submit}
        className="flex flex-col items-start min-w-min w-4/5 gap-2"
      >
        <DataInput
          props={{
            type: 'text',
            name: 'test',
            id: 'test',
            placeholder: 'test',
          }}
          message={'test-msg'}
        />
        <SubmitButton />
      </form>
    </section>
  );
};
