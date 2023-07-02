import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions';
import { TextField, Button, Typography, Paper, Grid, Container, Box } from '@mui/material';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (email !== '' && password !== '') {
            dispatch(login(formData, navigate));
        }
    }

    return (
        <Box>
            <Container sx={{ height: '100vh' }}>
                <Grid container sx={{ alignItems: 'center', height: '100%' }}>
                    <Grid item xs={12} md={6}>
                        <Typography color='primary' fontWeight='bolder' variant='h4'>LookAlike</Typography>
                        <Typography variant='h5'>Connect with Friends and the world around you on LookAlike</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={4} sx={{ padding: '20px', borderRadius: '10px' }}>
                            <form onSubmit={onSubmit}>
                                <Grid container rowGap={2}>
                                    <Grid item xs={12}>
                                        <Typography variant='h4' textAlign='center'>Log In</Typography>
                                    </Grid>
                                     <Grid item xs={12}>
                                        <TextField
                                            type='email'
                                            variant='outlined'
                                            name='email'
                                            required
                                            fullWidth
                                            value={formData.email}
                                            label='Email......'
                                            onChange={onChange}
                                        />
                                      </Grid>
                                      <Grid item xs={12}>
                                        <TextField
                                            type='password'
                                            name='password'
                                            value={formData.password}
                                            onChange={onChange}
                                            variant='outlined'
                                            required
                                            fullWidth
                                            label='Password..........'
                                        />
                                      </Grid>
                                     <Grid item xs={12}>
                                        <Button type='submit' variant='contained' sx={{ marginBottom: '10px' }} fullWidth>Login In</Button>
                                        <Typography marginBottom='10px' variant='body2' component={Link} to='/forgotpassword'>Forgot Password</Typography>
                                        <Button type='button' variant='contained' fullWidth component={Link} to='/signup' color='success'>Create An Account?</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Login;