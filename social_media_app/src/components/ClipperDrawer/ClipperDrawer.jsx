import { Toolbar, Box, Paper, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import image from '../../assets/images.png';
import { ListIcon } from './Style';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ClipperDrawer = ({ listArray }) => {
    //const loggedIn_user = JSON.parse(localStorage.getItem('profile'))?.result;
    const allUsers = []


  return (
    <Paper sx={{ height: 'inherit' }} elevation={6}>
      <Toolbar />
      <Box  sx={{ height: '100%' }}>
        <Box>
          <ul>
            {listArray.map(({ name, Icon, link }) => (
              <ListIcon style={{ margin: '0' }} key={name}>
                <Box className="link" component={Link} to={link}>
                  <div className="icon">
                    <Icon />
                  </div>
                  <Typography className='link_text' variant='body1' sx={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{name}</Typography>
                </Box>
              </ListIcon>
            ))}
          </ul>
        </Box>
        <Divider />
        <Box>
          <ul>
              {allUsers.length > 0 && allUsers.map((user) => (
                <ListIcon style={{ margin: '0' }} key={user._id}>
                  <Box component={Link} className="link" to={`/lookalike/profile/${user._id}`}>
                    <div className="image">
                      <img src={user.profileImage || image} height='50%' width='50%' alt="icon" style={{ borderRadius: '100%' }} />
                    </div>
                    <Typography className='link_text' variant='body1' sx={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{user.username}</Typography>
                  </Box>
                </ListIcon>
              ))}
          </ul>
        </Box>
      </Box>
    </Paper>
  )
}

ClipperDrawer.proptypes = {
  listArray: PropTypes.array.isRequired
}

export default ClipperDrawer;