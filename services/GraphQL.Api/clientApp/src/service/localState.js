// import ApolloClient from "apollo-boost";

import {notificationQuery} from "../graphql/local"

const notificationDefaults = {
    notification: {
        __typename: 'Notification',
        message: null,
        created: null
    }
}

const notificationResolver = {
    Mutation: {
        addNotification: (_, { message, created }, { cache }) => {
            const previous = cache.readQuery({ notificationQuery });
            const data = { ...previous, message: message, created: created };
            cache.writeData({data});
          return null;
        }
      }
}




export const localState = {
    clientState:  { defaults: {...notificationDefaults}, resolvers: { ...notificationResolver}}
}