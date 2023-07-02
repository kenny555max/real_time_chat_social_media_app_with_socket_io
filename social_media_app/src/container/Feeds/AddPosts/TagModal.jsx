import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar } from '@mui/material';
import { Box } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  height: 600,
  p: 4,
};

const modalBodyStyle = {
  height: 450,
  overflow: 'auto'
}

export default function TagModal({ open, handleClose, allFriends, tagFriends }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tag Friends & Family
          </Typography>
          <div className='modal_body' style={modalBodyStyle}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {allFriends.map((user, index) => {
                      return <ListItem key={index} onClick={() => tagFriends(user)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bolder' }}>
                                <ListItemAvatar>
                                  <Avatar alt="Remy Sharp" src={user.profileImage} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={user.username}
                                />
                          </ListItem>
                  })}
            </List>
          </div>
          <Button onClick={handleClose}>close modal</Button>
        </Box>
      </Modal>
    </div>
  );
}