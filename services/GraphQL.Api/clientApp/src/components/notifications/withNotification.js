import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";

import {notificationQuery,addNotificationMutation} from '../../graphql/local'


function withNotification(WrappedComponent, useQuery) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                useQuery: useQuery
            };
          }        

          render() {
            let showQuery = this.state.useQuery;

            return <Mutation mutation={addNotificationMutation}>
                {(addNotification, { loading, error }) =>  (
                    <React.Fragment>
                     {showQuery && 
                    <Query query={notificationQuery} >
                        {({ loading, error, data }) => {
                        return (
                            <WrappedComponent notification={data.notification} loading={loading} error={error} updateNotification={(m,c) => {
                                console.log(m);
                                console.log(c);
                                addNotification({variables: {message: m, created: c}});
                            }}  {...this.props}  />
                        ); 
                        }}
                    </Query>
                     }
                     {!showQuery && 
                            <WrappedComponent updateNotification={(m,c) => {
                                console.log(m);
                                console.log(c);
                                addNotification({variables: {message: m, created: c}});
                            }}  {...this.props}  />
                    }
                    </React.Fragment>
                )}
            </Mutation>
          }
    };
}

export default withNotification;