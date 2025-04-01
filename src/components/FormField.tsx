import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type FormFieldProps = TextFieldProps & {
    name: string;
  };

export const FormField = ({ name, ...props }: FormFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          fullWidth
          error={!!fieldError}
          helperText={fieldError}
        />
      )}
    />
  );
};
