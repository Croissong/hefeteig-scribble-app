import React from 'react';
import './App.css';
import ChatComponent from './ChatComponent';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloProvider } from 'react-apollo';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const App: React.FC = () => {
    const subscriptionClient = new SubscriptionClient('/api/graphql', {
        reconnect: true,
    });
    const wsLink = new WebSocketLink(subscriptionClient);
    const client = new ApolloClient({
        link: wsLink,
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <ChatComponent />
        </ApolloProvider>
    );
};

export default App;
