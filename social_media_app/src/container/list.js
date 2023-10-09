import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';

const listArray = [
    {
        name: 'feed',
        Icon: RssFeedIcon,
        link: '/lookalike/feeds'
    },
    {
        name: 'chat',
        Icon: ChatIcon,
        link: '/lookalike/chat'
    },
    {
        name: 'videos',
        Icon: PlayCircleIcon
    },
    {
        name: 'groups',
        Icon: GroupsIcon
    },
    {
        name: 'bookmarks',
        Icon: BookmarksIcon
    },
    {
        name: 'questions',
        Icon: HelpOutlineIcon
    },
    {
        name: 'jobs',
        Icon: WorkIcon
    },
    {
        name: 'events',
        Icon: EventIcon
    },
    {
        name: 'courses',
        Icon: SchoolIcon
    }
];

export default listArray;