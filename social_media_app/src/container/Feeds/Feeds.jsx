import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Notification =  lazy(() => import('./Notification'));
const AddPosts = lazy(() => import('./AddPosts/AddPosts'));
const Posts = lazy(() => import('./Posts/Posts'));

import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

import { io } from 'socket.io-client';

export const Main = styled('div')(({ theme }) => ({
    width: '80%',
    marginLeft: 'auto',
    marginTop: '70px',
    [theme.breakpoints.down('lg')]: {
        width: 'calc(100% - 50px)',
        '.icon-wrapper': {
            flexWrap: 'wrap'
        },
        '.notification': {
            padding: '20px 40px'
        }
    }
}));

let socket;

const Feed = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket = io('http://localhost:5000');

        if (socket) dispatch({ type: 'SOCKET_REDUCER', payload: socket });

        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <>
            <Main>
                <Grid container>
                    <Grid item md={8} sm={12} sx={{ padding: '20px 40px' }}>
                        <Suspense fallback='Loading.........'>
                            <AddPosts />
                            <Posts />
                        </Suspense>
                    </Grid>
                    <Grid className='notification' item sm={12} md={4} sx={{ padding: '20px 20px 0 0' }}>
                        <Suspense fallback='Loading.........'>
                            <Notification />
                        </Suspense>
                    </Grid>
                </Grid>
            </Main>
        </>
    )
}

export default Feed;