import React from 'react'
import Button from '@mui/material/Button'

import styles from './Header.module.scss'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logaut, selectIsAuth } from '../../redux/slices/auth'

export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log')) {
      dispatch(logaut())
      window.localStorage.removeItem('token')
    }
  }

  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to='/posts/create'>
                  <Button variant='contained'>To write an article</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant='contained'
                  color='error'
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button variant='outlined'>Enter</Button>
                </Link>
                <Link to='/register'>
                  <Button variant='contained'>Create an account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
