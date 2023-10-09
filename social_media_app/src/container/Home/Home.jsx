import { lazy, Suspense } from 'react';

const Feed = lazy(() => import('../Feeds/Feeds'));
import listArray from '../list';
const ClipperDrawer = lazy(() => import('../../components/ClipperDrawer/ClipperDrawer'));
const Header =  lazy(() => import('../../components/Header/Header'));

import { styled } from '@mui/material/styles';

export const SideBar = styled('div')(({ theme }) => ({
    position: 'fixed',
    width: '20%',
    top: '0',
    left: '0',
    bottpm: '0',
    zIndex: '1',
    height: 'auto',
    bottom: '0',
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    scrollBehavior: 'scroll',
    [theme.breakpoints.down('lg')]: {
        width: '50px',
    },
}));

const Home = () => {
    return (
        <>
            <Suspense fallback={<div>Loading........</div>}>
                <Header />
            </Suspense>
            <SideBar>
                <Suspense fallback={<div>Loading..........</div>}>
                    <ClipperDrawer listArray={listArray} />
                </Suspense>
            </SideBar>
            <Suspense fallback={<div>Loading............</div>}>
                <Feed />
            </Suspense>
        </>
  )
}

export default Home;