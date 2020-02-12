import React, {useState}               from 'react'
import Footer                          from '../../component/Footer'
import {Switch}                        from 'react-router-dom'
import {
  Route,
  RouteComponentProps,
  withRouter
}                                      from 'react-router'
import MainNavBar                      from '../../navbars/MainNavBar'
import {Dashboard as AccountDashboard} from '../../component/account'
import Table                  from '../../../components/Table/Show'
import {
  useLazyQuery,
  useMutation,
  useQuery
}                             from '@apollo/react-hooks'
import {
  MUTATION,
  QUERY
}                             from '../../graphQL'
import {SpinnerLoadingCenter} from '../../../components/Spinner/SpinnerLoading'
import {DialogInfo}    from '../../../components/Dialog/DialogBasic'
import ClientDashboard from '../../component/client/ClientDashboard'
import {
  faBars,

}                      from '@fortawesome/free-solid-svg-icons'
import {AppBar}        from '../../../components/AppBar'
import LoginStatus     from '../../auth/LoginStatus'
import ItemsForm       from '../../component/items/ItemsForm'
import SaleDashboard   from '../../component/sale/SaleDashboard'

const RefreshToken = withRouter((props : RouteComponentProps) => {

  const [needLogin, setNeedLogin] = useState(false)

  const {data: dataQueryAppState} = useQuery(QUERY.ApplicationState.appState)
  const [mutationAppState] = useMutation(MUTATION.ApplicationState.appState)
  const timePollInterval = React.useMemo(() => {
    if (!dataQueryAppState || !dataQueryAppState.appState || !dataQueryAppState.appState.refreshTokenTime || !dataQueryAppState.appState.login) {
      return void(0)
    }
    return ( dataQueryAppState.appState.refreshTokenTime * 1000 - 3000)
  }, [dataQueryAppState])

  const [loginFunAccount, {loading: loadingFunAccount}] = useLazyQuery(QUERY.Account.logged, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: async (data) => {
      await mutationAppState({
        variables: {
          login: true,
          account: data.logged
        }
      })
    },
    onError: (e) => {
      setNeedLogin(true)
    }
  })

  const {loading: loadingRefreshToken} = useQuery(QUERY.Account.refreshToken, {
    skip: dataQueryAppState.appState.login || dataQueryAppState.appState.account,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: async (dataRef) => {
      await mutationAppState({
        variables: {
          refresh: dataRef.data.refresh
        }
      })
      loginFunAccount()
    },
    onError: (e) => {
      setNeedLogin(true)
    }
  })

    /** for the first time */
  useQuery(QUERY.Account.triggerToken, {
    skip: !dataQueryAppState.appState.login,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    pollInterval: timePollInterval,
    onError: async (e) => {
      console.log('trigger data - error')
      await mutationAppState({
        variables: {
          login: false
        }
      })
      setNeedLogin(true)
    },
    onCompleted: async (data) => {
      const time = data.data.refresh
      if (time === dataQueryAppState.appState.refreshTokenTime) {
        return
      }
      await mutationAppState({
        variables: {
          refresh: time
        }
      })
    }
  })

  const  redirect = () => {
    props.history.replace('/application/auth/login')
  }

  return (
    <>
      {needLogin ?
        <DialogInfo
                       text={'Your session is expired, You need to login !'}
                       buttonLabel={'Go to Login '}
                       action  = {redirect}
        /> : <></> }
      {(loadingRefreshToken || loadingFunAccount) ? <SpinnerLoadingCenter/> : <></>}
    </>
  )
})

export interface ISideBarState {
  open : boolean,
  mini : boolean,
  visible : boolean,
  selected ?:  string
}

const MainLayout = (props : RouteComponentProps) => {
  const [state,setState] = useState({
    open: false,
    mini: true,
    visible: true
  } as ISideBarState)

  const onClickHandler  = () => {
    setState({
      ...state,
      ...{
        visible: !state.visible
      }
    })
  }

  const onClickBarListHandler = () => {
    setState({
      ...state,
      ...{
        mini: !state.mini,
        open: !state.open
      }
    })
  }

  const changeStatus = () => {
    alert('logout')
  }

  return (
    <>
      <RefreshToken/>
      <div className={'hw-app-layout-main'}>
        <AppBar icon={faBars}  menuAction={onClickHandler} label={'DEAL-SELL POS'}>

          <LoginStatus  changeStatus={changeStatus}  label={'LOGOUT'}/>

        </AppBar>
        <div className={'hw-app-layout-main-root'}>
          <MainNavBar state={state} onClickBarListHandler={onClickBarListHandler}/>
          <div className={`hw-app-layout-main-data${state.mini ? ' mini' : state.open ? ' opened' : ' hide'}`}>
            <Switch>
              <Route path={'/application/main/accounts'}><AccountDashboard/></Route>
              <Route path={'/application/main/table'}><Table/></Route>
              <Route path={'/application/main/client'}>
                <ClientDashboard/>
              </Route>
              <Route path={'/application/main/items'}>
                <ItemsForm/>
              </Route>
              <Route path={'/application/main/sale'}>
                <SaleDashboard/>
              </Route>

            </Switch>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default withRouter(MainLayout)
