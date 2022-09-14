import { toast } from 'react-toastify';

const determineType = (level) => {
    if (level === 'low') return 'info';

    if (level === 'medium') return 'warning'

    if (level === 'high') return 'error';

    return 'default';
};

const determinePosition = (level) => {
    if (level === 'low') return 'top-left';

    if (level === 'medium') return 'top-center'

    if (level === 'high') return 'top-right';

    return null;
};

const buildMessage = ({ type, message, room, sensor}) => {
    return `This is an ${type} message! ${message} in room ${room} from sensor ${sensor}`
};

const notify = (message) => toast(buildMessage(message), {
    type: determineType(message.level),
    theme: 'colored',
    position: determinePosition(message.level),
    autoClose: false,
    closeOnClick: false,
    pauseOnHover: true,
});

export { notify }
