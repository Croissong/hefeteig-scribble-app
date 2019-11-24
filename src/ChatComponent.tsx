import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import './ChatComponent.css';
import { useMutation, useSubscription } from 'react-apollo';

interface Message {
    username: String;
    text: String;
    time: number;
}

const ChatComponent: React.FC = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([] as Message[]);
    const [sendMessage] = useMutation(gql`
        mutation SendMessage($username: String!, $message: String!) {
            sendMessage(username: $username, message: $message) {
                username
                text
            }
        }
    `);
    const { error } = useSubscription(
        gql`
            subscription MessagesSubscription($username: String!) {
                messagesSubscription(username: $username) {
                    username
                    text
                    time
                }
            }
        `,
        {
            variables: { username: 'test' },
            onSubscriptionData: data => {
                setMessages([
                    ...messages,
                    data.subscriptionData.data.messagesSubscription,
                ]);
            },
        }
    );

    const send_message = (message: String) => {
        // TODO: Validate empty or invalid message.
        if (message.trim().length > 0) {
            sendMessage({ variables: { username: 'test', message: message } });
        }
        setMessage('');
    };

    if (error) console.error(`asdasd ${error}`);
    return (
        <div>
            <div className="chat">
                {messages.map((value: Message, index: number) => {
                    return (
                        <div key={index}>
                            {new Date(value.time).toLocaleString('de-DE', {
                                timeZone: Intl.DateTimeFormat().resolvedOptions()
                                    .timeZone,
                            })}{' '}
                            - {value.username}: {value.text}
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
