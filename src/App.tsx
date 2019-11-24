import React from 'react';
import './App.css';
import ChatComponent from './ChatComponent';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const App: React.FC = () => {
    const client = new ApolloClient({
        uri: '/graphql',
    });

    return (
        <ApolloProvider client={client}>
            <ChatComponent />
        </ApolloProvider>
    );
};

export default App;
