import { FormControl, MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../utils";
import ErrorMessage from "./ErrorMessage";

const SelectFields = ({ label, name, control, errors }) => {
  const modeNames = ["NEFT", "RTGS", "IMPS"];
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...addErrorIntoField(errors[name])}
            {...field}
            required
            select
            label={label}
            variant="filled"
          >
            {modeNames.map((mode) => (
              <MenuItem key={mode} value={mode}>
                {mode}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
};

export default SelectFields;
