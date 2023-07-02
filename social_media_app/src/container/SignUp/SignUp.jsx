import { useState } from 'react';
import { Link } from 'react-router-dom';
import { insertData } from '../../actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Grid, Container, Box } from '@mui/material';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const { username, email, password, confirmPassword } = formData;
        
        if (username !== '' && email !== '' && password !== '' && confirmPassword === password) {
            dispatch(insertData(formData, navigate));

            setFormData(
                {
                    username: '',
                    password: '',
                    email: '',
                    confirmPassword: ''
                }
            );
        }
    }

    return (
        <Box>
            <Container sx={{ height: '100vh' }}>
                <Grid container sx={{ alignItems: 'center', height: 'inherit' }}>
                    <Grid item xs={12} md={6}>
                        <Typography color='primary' fontWeight='bolder' variant='h4'>LookAlike</Typography>
                        <Typography variant='h5'>Connect with Friends and the world around you on LookAlike</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={4} sx={{ padding: '20px', borderRadius: '10px' }}>
                            <form onSubmit={onSubmit}>
                                <Grid container rowGap={2}>
                                    <Grid item xs={12}>
                                        <Typography variant='h4' textAlign='center'>Sign Up</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            type='text'
                                            variant='outlined'
                                            fullWidth
                                            name='username'
                                            label='username......'
                                            value={formData.username}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </Grid>
                                     <Grid item xs={12}>
                                        <TextField
                                            type='email'
                                            variant='outlined'
                                            name='email'
                                            fullWidth
                                            value={formData.email}
                                            onChange={(e) => onChange(e)}
                                            label='Email......'
                                        />
                                    </Grid>
                                     <Grid item xs={12}>
                                        <TextField
                                            name='password'
                                            type='password'
                                            variant='outlined'
                                            fullWidth
                                            value={formData.password}
                                            label='Pasword......'
                                            onChange={(e) => onChange(e)}
                                        />
                                    </Grid>
                                     <Grid item xs={12}>
                                        <TextField
                                            name='confirmPassword'
                                            type='password'
                                            variant='outlined'
                                            label='Confirm Password......'
                                            fullWidth
                                            value={formData.confirmPassword}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </Grid>
                                     <Grid item xs={12}>
                                        <Button type='submit' variant='contained' sx={{ marginBottom: '10px' }} fullWidth>Sign Up</Button>
                                        <Button type='button' variant='contained' fullWidth color='success' component={Link} to='/login'>Already Have An Account?</Button>
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

export default SignUp;