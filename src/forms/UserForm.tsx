import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box, Checkbox, FormControlLabel, Grid, MenuItem, Typography
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
      <Box component="form" id="user-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Typography variant="h6" gutterBottom>
          Додати користувача
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <FormField name="fullName" label="ПІБ *" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <FormField name="email" label="Email *" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <FormField name="phone" label="Телефон *" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <FormField
              name="birthDate"
              label="Дата народження"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <FormField name="role" label="Роль *" select>
              <MenuItem value="Адміністратор">Адміністратор</MenuItem>
              <MenuItem value="Користувач">Користувач</MenuItem>
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <FormField name="position" label="Посада" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
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
