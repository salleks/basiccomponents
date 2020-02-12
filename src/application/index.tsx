import React, {useEffect} from 'react'
import '../assets/css/app/index.css'
import AuthLayout         from './layout/auth/index'
import {Switch}           from 'react-router-dom'
import {
  Route,
  RouteComponentProps,
  withRouter
}                         from 'react-router'
import {ApolloClient}     from 'apollo-client'
import {InMemoryCache}    from 'apollo-cache-inmemory'
import {createHttpLink}   from 'apollo-link-http'
import {
  ApolloProvider,
  useMutation,
  useQuery
} from '@apollo/react-hooks'
import MainLayout         from './layout/main'
import {
  MUTATION,
  QUERY,
  resolvers
} from './graphQL'

const cache = new InMemoryCache()

cache.writeData({
  data: {
    ApplicationState: {
      login: false,
      account: null,
      refreshTokenTime: null,
      redirectLink: {
        link: null,
        processed: false,
        __typename: 'RedirectLink'
      },
      __typename: 'ApplicationState'
    }
  }
})

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
})

const client = new ApolloClient({
  cache,
  link,
  resolvers: resolvers
})

const Component = withRouter((props : RouteComponentProps) => {

  const {data} = useQuery(QUERY.ApplicationState.appStateRedirectLink,{
    notifyOnNetworkStatusChange: true
  })
  const [mutationRedirectProcessed] = useMutation(MUTATION.ApplicationState.setAppStateRedirectLinkProcessed)
  useEffect(() => {
    if (!data.data.redirectLink.link) {
      return
    }
    mutationRedirectProcessed().then(() => {
      props.history.replace(data.data.redirectLink.link)
    })
  },[data.data.redirectLink])

  return (
    <div className={'hw-app-main'}>
      <Switch>
        <Route  path={'/application/auth'}> <AuthLayout/></Route>
        <Route  path={'/application/main'}> <MainLayout/></Route>
      </Switch>
    </div>
  )
})

const Application = () => {
  return (
    <ApolloProvider client={client}>
      <Component/>
    </ApolloProvider>
  )
}

export default withRouter(Application)
