import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box, Checkbox, FormControlLabel, Grid, MenuItem
} from '@mui/material';
import { FormProvider, useForm  } from 'react-hook-form';
import { userSchema, UserFormValues } from '../schemas/user.schema';
import { FormField } from '../components/FormField';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ukLocale from 'date-fns/locale/uk'; 
import { format } from 'date-fns';

export const UserForm = ({
  onSubmit,
  initialValues
}: {
  onSubmit: (data: UserFormValues) => void;
  initialValues?: Partial<UserFormValues>;
}) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {    
      fullName: '',
      email: '',
      phone: '',
      birthDate: '',
      role: '',
      position: '',
      isActive: true,
      ...initialValues,
    },
  });

  return (
    <FormProvider {...form}>
      <Box component="form" id="user-form" onSubmit={form.handleSubmit(onSubmit)} noValidate sx={{ pt: 2, pb: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <FormField name="fullName" label="ПІБ *" />
          </Grid>
          <Grid size={{ xs: 12}}>
            <FormField name="email" label="Email *" />
          </Grid>
          <Grid size={{ xs: 12}}>
            <FormField name="phone" label="Телефон *" />
          </Grid>
          <Grid size={{ xs: 12}}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ukLocale}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="birthDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    label="Дата народження"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      const formatted = date ? format(date, 'yyyy-MM-dd') : '';
                      field.onChange(formatted);
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                      },
                    }}
                  />
                )}
              />
            </Grid>
          </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12}}>
          <FormField name="role" label="Роль *" select>
            <MenuItem value="" disabled>
              -- Оберіть роль --
            </MenuItem>
            <MenuItem value="Адміністратор">Адміністратор</MenuItem>
            <MenuItem value="Користувач">Користувач</MenuItem>
          </FormField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormField name="position" label="Посада" />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={<Checkbox {...form.register('isActive')} defaultChecked />}
              label="Активний"
            />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};
