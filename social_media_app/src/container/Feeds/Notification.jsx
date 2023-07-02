import image from '../../assets/images.png';
import RedeemIcon from '@mui/icons-material/Redeem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Box, Typography, Avatar } from '@mui/material';

const Notification = () => {
    return (
        <Box>
            <div style={{ display: 'flex' }}>
                <RedeemIcon />
                <Typography variant='body1'><strong>Shade</strong> and <strong>16 others</strong> have birthdays today</Typography>  
            </div>
            <div style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: '20px', height: '300px', marginTop: '20px' }}>
                <Typography variant='h6'>This is a Notification</Typography>
            </div>
            <div style={{ marginTop: '40px' }}>
                <h3>Online Friends</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((list) => {
                        return <ListItem key={list} sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bolder' }}>
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={image} />
                                </ListItemAvatar>
                                <ListItemText
                                primary="Brunch this weekend?"
                                />
                            </ListItem>
                    })}
                </List>
            </div>
        </Box>
    )
}

export default Notification;