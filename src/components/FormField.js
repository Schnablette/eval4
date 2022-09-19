import { Field, ErrorMessage } from "formik";
import * as _ from "lodash";

export const FormField = ({ label, ...rest }) => {
  const name = _.camelCase(label);

  return (
    <>
      <label className="block mt-4" name={name}>
        {label}
      </label>
      <Field
        className="border-solid border-[1px] border-gray-800 p-2 rounded-md"
        name={name}
        {...rest}
      />
      <ErrorMessage
        className="text-red-700 text-xs"
        name={name}
        component="div"
      />
    </>
  );
};
