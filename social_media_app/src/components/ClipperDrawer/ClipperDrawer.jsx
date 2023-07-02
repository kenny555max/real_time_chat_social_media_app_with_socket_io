import { Toolbar, Box, Paper, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import image from '../../assets/images.png';
import { ListIcon } from './Style';


const ClipperDrawer = ({ listArray }) => {
  return (
    <Paper sx={{ height: '100%' }} elevation={6}>
      <Toolbar />
      <Box>
        <Box>
          <ul>
            {listArray.map(({ name, Icon }) => (
              <ListIcon style={{ margin: '0' }} key={name}>
                <a href="#">
                  <div className="icon">
                    <Icon />
                  </div>
                  <Typography className='link_text' variant='body1' sx={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{name}</Typography>
                </a>
              </ListIcon>
            ))}
          </ul>
        </Box>
        <Divider />
        <Box>
          <ul>
              {[1, 2, 3, 5, 6].map((num) => (
                <ListIcon style={{ margin: '0' }} key={num}>
                  <a href="#">
                    <div className="image">
                      <img src={image} height='50%' width='50%' alt="icon" style={{ borderRadius: '100%' }} />
                    </div>
                    <Typography className='link_text' variant='body1' sx={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}>Oyedepo Kehinde</Typography>
                  </a>
                </ListIcon>
              ))}
          </ul>
        </Box>
      </Box>
    </Paper>
  )
}

export default ClipperDrawer;