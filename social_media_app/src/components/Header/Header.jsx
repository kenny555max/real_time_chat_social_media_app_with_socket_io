import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './__Search';
import { Link } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import Person2Icon from '@mui/icons-material/Person2';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.scss';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, Badge, Avatar, Box } from "@mui/material";


export const Info = styled('div')(({ theme }) => ({
  flexGrow: '1',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    'div.menu': {
      display: 'block !important',
      'svg': {
        fontSize: '2em',
        cursor: 'pointer'
      }
    }
  },
}));


const Header = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <AppBar position="fixed" sx={{ height: '70px', alignItems: 'center', flexDirection: 'row' }}>
      <Toolbar variant="dense" sx={{ justifyContent: 'space-between', width: '100%' }}>
        <Box className="logo" sx={{ flexGrow: '1' }}>
          <Typography sx={{ textDecoration: 'none' }} variant="h6" color="inherit" component={Link} to='/lookalike/feeds'>
            LookAlike
          </Typography>
        </Box>
        <Info className='info'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for friend, post, video..............."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Typography component={Link} marginLeft='20px' sx={{ textDecoration: 'none' }} variant='body1' color='floralwhite' to='/homepage'>Homepage</Typography>
            <Typography component={Link} marginLeft='20px' sx={{ textDecoration: 'none' }} variant='body1' color='floralwhite' to='/timeline'>Timeline</Typography>
          </div>
          <div className="notification">
            <Badge badgeContent={4} color='secondary'>
              <MailIcon sx={{ color: 'floralwhite' }} />
            </Badge>
            <Badge badgeContent={4} color="secondary">
              <Person2Icon sx={{ color: 'floralwhite' }} />
            </Badge>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon sx={{ color: 'floralwhite' }} />
            </Badge>
          </div>
          <div>
            <Avatar component={Link} to={`/lookalike/profile/${user?.result?._id}`} alt="CRemy Sharp" src="/static/images/avatar/1.jpg" />
          </div>
          <div className="menu" style={{ display: 'none' }}>
            <MenuIcon />
          </div>
        </Info>
      </Toolbar>
    </AppBar>
  )
}

export default Header;