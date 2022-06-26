import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";


export default function Register() {
  // Import react-router-dom history.
  const history = useHistory();

  const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm({
    // Using form properties. => from react-hook-form.
    mode: 'all'
  });

  // Validation function.
  const handleApiErrors = (errors: any) => {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('Password')) {
          setError('password', {message: error})
        } else if (error.includes('Email')) {
          setError('email', {message: error})
        } else if (error.includes('Username')) {
          setError('username', {message: error})
        }
      })
    }
    console.log(errors);
  }

  return (
    <Container component={Paper} maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box component="form"
        onSubmit={handleSubmit((data) =>
          agent.Account.register(data)
            .then(() => {
              toast.success('Registration successful - you can now login');
              history.push('/login');
            })
            .catch(error => handleApiErrors(error)))
        }
        noValidate sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          autoComplete="username"
          autoFocus
          // Using react-hook-form register
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={errors?.username?.message?.toString()}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email address"
          // Using react-hook-form register
          {...register('email',
            {
              required: 'Email is required',
              pattern: {
                value: /^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,
                message: 'Not a valid email address'
              }
            })}
          error={!!errors.email}
          helperText={errors?.email?.message?.toString()}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register('password',
            {
              required: 'Password is required',
              pattern: {
                value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                message: 'Password is not complex enough'
              }
            })}
          error={!!errors.password}
          helperText={errors?.password?.message?.toString()}
        />

        <LoadingButton loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>

        <Grid container>
          <Grid item>
            <Link to='/login'>
              {"Already have an account? Sign In"}
            </Link> 
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}