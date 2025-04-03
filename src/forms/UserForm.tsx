import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box, Checkbox, FormControlLabel, Grid, MenuItem
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { userSchema, UserFormValues } from '../schemas/user.schema';
import { FormField } from '../components/FormField';

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
      role: 'Користувач',
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
            <FormField
              name="birthDate"
              label="Дата народження"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12}}>
            <FormField name="role" label="Роль *" select>
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
