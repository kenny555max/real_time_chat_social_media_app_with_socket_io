import Feed from '../Feeds/Feeds';
import listArray from '../list';
import ClipperDrawer from '../../components/ClipperDrawer/ClipperDrawer';
import { styled } from '@mui/material/styles';
import Header from '../../components/Header/Header';


export const SideBar = styled('div')(({ theme }) => ({
    position: 'fixed',
    width: '20%',
    top: '0',
    left: '0',
    zIndex: '1',
    height: '100%',
    bottom: '0',
    [theme.breakpoints.down('lg')]: {
        width: '50px',
    },
}));

const Home = () => {
    return (
        <>
            <Header />
            <SideBar>
                <ClipperDrawer listArray={listArray} />
            </SideBar>
            <Feed />
        </>
  )
}

export default Home;