import { styled } from '@mui/material/styles';

export const ListIcon = styled('li')(({ theme }) => ({
  '.link': {
    display: 'flex',
    width: '100%',
    textDecoration: 'none',
    color: '#000',
    
    '.icon, .image': {
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    '.link_text': {
        height: '50px',
        flex: '1',
        display: 'flex',
        justifyContent: 'flex-center',
        alignItems: 'center'
    },
    transition: 'all 0.5s ease',
    '&:hover': {
        background: 'lightgrey'
    },
  },
  [theme.breakpoints.down('lg')]: {
      '.link': {
          display: 'block',

          '.link_text': {
              display: 'none'
          }
      }
  },
}));