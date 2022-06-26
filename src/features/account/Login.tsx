import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";
import { signInUser } from "./accountSlice";

export default function Login() {
  // Import react-router-dom history.
  const history = useHistory();
  const location = useLocation<any>();
  // Import redux dispatch.
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({
    // Using form properties. => from react-hook-form.
    mode: 'all'
  });

  // Form function.
  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      history.push(location.state?.from?.pathname || '/catalog');
    } catch (error: any) {
      console.log(error);
    }  
  }

  return (
    <Container component={Paper} maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt: 1}}>
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
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors?.password?.message?.toString()}
        />

        <LoadingButton loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>

        <Grid container>
          <Grid item>
            <Link to='/register'>
              {"Don't have an account? Sign Up"}
            </Link> 
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}