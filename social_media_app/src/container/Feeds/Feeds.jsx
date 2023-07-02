import Notification from './Notification';
import AddPosts from './AddPosts/AddPosts';
import Posts from './Posts/Posts';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

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

const Feed = () => {
    return (
        <>
            <Main>
                <Grid container>
                    <Grid item md={8} sm={12} sx={{ padding: '20px 40px' }}>
                        <AddPosts />
                        <Posts />
                    </Grid>
                    <Grid className='notification' item sm={12} md={4} sx={{ padding: '20px 20px 0 0' }}>
                        <Notification />
                    </Grid>
                </Grid>
            </Main>
        </>
    )
}

export default Feed;