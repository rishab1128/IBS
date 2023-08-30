import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../utils";
import ErrorMessage from "./ErrorMessage";

const PasswordFields = ({
  label,
  inputProps,
  control,
  name,
  errors,
  disabled,
}) => {
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            disabled={disabled}
            {...field}
            {...addErrorIntoField(errors[name])}
            required
            label={label}
            variant="filled"
            InputProps={inputProps}
            type="password"
          />
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
};

export default PasswordFields;
