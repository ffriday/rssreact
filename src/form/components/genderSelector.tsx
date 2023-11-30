export const GenderSelector = () => (
  <fieldset>
    <legend>Gender:</legend>
    <input type="radio" id="male" name="gender" value="male" checked />
    <label htmlFor="male">Male</label>
    <input type="radio" id="female" name="gender" value="female" />
    <label htmlFor="female">Female</label>
  </fieldset>
);
