import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Snackbar } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const schema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be between 2 and 30 characters.')
    .max(30, 'First name must be between 2 and 30 characters.')
    .required('First name is required.'),
  lastName: Yup.string()
    .min(2, 'Last name must be between 2 and 30 characters.')
    .max(30, 'Last name must be between 2 and 30 characters.')
    .required('Last name is required.'),
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters and include both letters and numbers.')
    .matches(/[a-zA-Z]/, 'Password must include both letters and numbers.')
    .matches(/[0-9]/, 'Password must include both letters and numbers.')
    .required('Password is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match.')
    .required('Confirm password is required.')
});

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');


  const onSubmit = (data) => {
    setSnackbarMessage('Registration successful!');
    setOpenSnackbar(true);
    console.log('Form data:', data);
  };


  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <TextField
            label="First Name"
            fullWidth
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ''}
          />
        </div>
        <div>
          <TextField
            label="Last Name"
            fullWidth
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ''}
          />
        </div>
        <div>
          <TextField
            label="Email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
        </div>
        <div>
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
          />
        </div>
        <div>
          <Button type="submit"  color="primary">
            Register
          </Button>
        </div>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default RegistrationForm;
