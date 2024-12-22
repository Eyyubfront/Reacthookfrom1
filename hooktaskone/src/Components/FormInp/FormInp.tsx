import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import "./index.css";

interface FormValues {
  username: string;
  password: string;
  confirmpassword: string;
  email: string;
  age: number;
  checkbox: boolean;
}

const FormInp: React.FC = () => {

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();

  const password = watch('password');  

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='inputs_top'>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          {...register("username", { 
            required: 'Username is required', 
            minLength: { value: 3, message: 'Username must be at least 3 characters long' }
          })} 
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div className='inputs_top'>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          {...register("email", { 
            required: 'Email is required'
          })} 
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className='inputs_top'>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register("password", { 
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters long' }
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div className='inputs_top'>
        <label htmlFor="confirmpassword">Confirm Password:</label>
        <input
          id="confirmpassword"
          type="password"
          {...register("confirmpassword", { 
            required: 'You must confirm your password',
            validate: (value) =>
              value === password || 'Passwords do not match'   
          })}
        />
        {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}
      </div>

      <div className='inputs_top'>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          {...register("age", { 
            required: 'Age is required',
            min: { value: 18, message: 'You must be at least 18 years old' }
          })}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div className='check_input'>
        <label htmlFor="checkbox">Checkbox:</label>
        <input
          id="checkbox"
          type="checkbox"
          {...register("checkbox", { required: 'You must accept the terms and conditions' })}
        />
        {errors.checkbox && <p>{errors.checkbox.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormInp;








