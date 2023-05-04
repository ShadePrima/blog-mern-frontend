import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { fetchAuth, selectIsAuth } from '../../redux/slices/auth'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import styles from './Login.module.scss'
import { Navigate } from 'react-router-dom'

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  console.log(isAuth, 'isAuth')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'test@gmail.com',
      password: '12345',
    },
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    console.log(data, 'data')

    if (!data.payload) {
      alert('Could not login')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Account login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label='E-Mail'
          error={Boolean(errors.email?.message)}
          type='email'
          helperText={errors.email?.message}
          {...register('email', { required: 'Indicate mail' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label='Password'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Indicate password' })}
          fullWidth
        />
        <Button type='submit' size='large' variant='contained' fullWidth>
          Enter
        </Button>
      </form>
    </Paper>
  )
}
