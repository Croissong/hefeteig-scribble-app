import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';

interface Message {
    username: String;
    text: String;
    time: number;
}




// TODO:
// Subscribe to messages.
// Subscription logic implemented in backend.
// Basically, it creates a FluxSink on subcription.
// No messages are being sent, though.
// Since GraphiQL has a bug (?) this has not been tested.
// Maybe create test subscription logic in React with free
// subscription endpoint online?
const ChatComponent: React.FC = () => {
    // TODO: Error handling.
    const { loading, error, data } = useQuery(gql`
        {
            messages {
                username
                text
                time
            }
        }
    `);
    const [sendMessage, { data: mutData }] = useMutation(gql`
        mutation SendMessage($username: String!, $message: String!) {
            sendMessage(username: $username, message: $message) {
                username
                text
            }
        }
    `);

    const [message, setMessage] = useState('');

    const send_message = (message: String) => {
        // TODO: Validate empty or invalid message.
        console.log(message);
        sendMessage({ variables: { username: 'usernameA', message: message } });
        setMessage('');
    };

    if (loading) return <div> Loading ...</div>;
    return (
        <div>
            <div>
                {data.messages.map((value: Message, index: number) => {
                    return (
                        <div key={index}>
                            {value.time} - {value.username}: {value.text}
                        </div>
                    );
                })}
            </div>
            <form
                onSubmit={event => {
                    send_message(message);
                    event.preventDefault();
                }}
            >
                <label htmlFor="chat-input">Message:</label>
                <input
                    type="text"
                    name="chat-input"
                    id="chat-input"
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                />
                <button>Send</button>
            </form>
        </div>
    );
};
export default ChatComponent;
