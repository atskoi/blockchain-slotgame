import React from 'react'
import { useNavigate } from 'react-router'

import * as Yup from 'yup'
import { useFormik, Form, FormikProvider } from 'formik'
// material
import { Stack, TextField, Alert, Box, Typography } from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import { Icon } from '@iconify/react'
import closeFill from '@iconify/icons-eva/close-fill'
import { useSnackbar } from 'notistack5'

import { MIconButton } from '../../@material-extend'

// hooks
import useAuth from '../../../hooks/useAuth'
import useIsMountedRef from '../../../hooks/useIsMountedRef'
import { PATH_USER } from 'routes/paths'
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth()
  const isMountedRef = useIsMountedRef()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name required'),
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Username required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    // address: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Address required'),
    // town: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Town required'),
    // province: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Province required'),
    // postalcode: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Postal code required'),
    // phone: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Phone Number required'),
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: '',
      address: '',
      city: '',
      province: '',
      postalcode: '',
      phone: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const response = await register(values)
        // setAuthModal("verify")
        // const { data } = response
        // console.log(response)
        // if (data === 'Success') {
          enqueueSnackbar('Register success. Please check your email', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          })
          // navigate(PATH_USER.home)
        // } else {
        //   enqueueSnackbar('Register failed.', {
        //     variant: 'error',
        //     action: (key) => (
        //       <MIconButton size="small" onClick={() => closeSnackbar(key)}>
        //         <Icon icon={closeFill} />
        //       </MIconButton>
        //     ),
        //   })
        // }

        if (isMountedRef.current) {
          setSubmitting(false)
        }
      } catch (error) {
        console.error(error)
        if (isMountedRef.current) {
          enqueueSnackbar('Register failed.', {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          })
          setErrors({ afterSubmit: error.message })
          setSubmitting(false)
        }
      }
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )}

          <Stack
            direction={{
              xs: 'column',
              marginTop: '10px !important',
              sm: 'row',
            }}
            spacing={2}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: 0, fontWeight: '400' }}>
                Username <span style={{ color: '#364e9b' }}>*</span>
              </Typography>

              <TextField
                fullWidth
                label="Enter your Username"
                {...getFieldProps('username')}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                sx={{ backgroundColor: '#1b1b1b', borderRadius: '8px' }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: 0, fontWeight: '400' }}>
                Password <span style={{ color: '#364e9b' }}>*</span>
              </Typography>

              <TextField
                fullWidth
                label="Enter your Password"
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                sx={{ backgroundColor: '#1b1b1b', borderRadius: '8px' }}
                type="password"
              />
            </Box>
          </Stack>

          <Stack
            direction={{
              xs: 'column',
              marginTop: '10px !important',
              sm: 'row',
            }}
            spacing={2}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: 0, fontWeight: '400' }}>
                First name <span style={{ color: '#364e9b' }}>*</span>
              </Typography>

              <TextField
                fullWidth
                label="Enter your First name"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ backgroundColor: '#1b1b1b', borderRadius: '8px' }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: 0, fontWeight: '400' }}>
                Last name <span style={{ color: '#364e9b' }}>*</span>
              </Typography>

              <TextField
                fullWidth
                label="Enter your Last name"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ backgroundColor: '#1b1b1b', borderRadius: '8px' }}
              />
            </Box>
          </Stack>

          <Stack
            direction={{
              xs: 'column',
              marginTop: '10px !important',
              sm: 'row',
            }}
            spacing={2}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: 0, fontWeight: '400' }}>
                Address <span style={{ color: '#364e9b' }}>*</span>
              </Typography>

              <TextField
                fullWidth
                label="Enter your Address"
                {...getFieldProps('address')}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
                sx={{ backgroundColor: '#1b1b1b', borderRadius: '8px' }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: 0, fontWeight: '400' }}>
                Town/City <span style={{ color: '#364e9b' }}>*</span>
              </Typography>

              <TextField
                fullWidth
                label="Enter your town/city"
                {...getFieldProps('city')}
                error={Boolean(touched.city && errors.city)}
                helperText={touched.city && errors.city}
                sx={{ backgroundColor: '#1b1b1b', borderRadius: '8px' }}
              />
            </Box>
          </Stack>

          <Stack
            direction={{
              xs: 'column',
              marginTop: '10px !important',
              sm: 'row',
            }}
            spacing={2}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: 0, fontWeight: '400' }}>
                Province <span style={{ color: '#364e9b' }}>*</span>
              </Typography>

              <TextField
                fullWidth
                label="Enter your Province"
                {...getFieldProps('province')}
                error={Boolean(touched.province && errors.province)}
                helperText={touched.province && errors.province}
                sx={{ backgroundColor: '#1b1b1b', borderRadius: '8px' }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: 0, fontWeight: '400' }}>
                Postal Code <span style={{ color: '#364e9b' }}>*</span>
              </Typography>

              <TextField
                fullWidth
                label="Enter your postal code"
                {...getFieldProps('postalcode')}
                error={Boolean(touched.postalcode && errors.postalcode)}
                helperText={touched.postalcode && errors.postalcode}
                sx={{ backgroundColor: '#1b1b1b', borderRadius: '8px' }}
              />
            </Box>
          </Stack>

          <Stack
            direction={{
              xs: 'column',
              marginTop: '10px !important',
              sm: 'row',
            }}
            spacing={2}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: 0, fontWeight: '400' }}>
                Phone <span style={{ color: '#364e9b' }}>*</span>
              </Typography>

              <TextField
                fullWidth
                label="Enter your Phone"
                {...getFieldProps('phone')}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                sx={{ backgroundColor: '#1b1b1b', borderRadius: '8px' }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: 0, fontWeight: '400' }}>
                Email <span style={{ color: '#364e9b' }}>*</span>
              </Typography>

              <TextField
                fullWidth
                label="Enter your email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                sx={{ backgroundColor: '#1b1b1b', borderRadius: '8px' }}
              />
            </Box>
          </Stack>

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              backgroundColor: '#2fc557',
              boxShadow: 'none',
              width: '50%',
              margin: '24px auto !important',
              marginBottom: '0 !important',
            }}
          >
            Sign Up
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
