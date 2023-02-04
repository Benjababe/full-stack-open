const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    return <div className={message.status}>{message.text}</div>;
};

export default Notification;