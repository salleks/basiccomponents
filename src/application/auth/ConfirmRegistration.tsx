import React, {
  useEffect,
  useState
} from 'react'

import {
  RouteComponentProps,
  withRouter
}                                       from 'react-router'
import {useMutation}                    from '@apollo/react-hooks'
import {MUTATION}                       from '../graphQL'
import {DialogMessageComponentRedirect} from '../../components/Dialog/DialogBasic'

const Component = (props : RouteComponentProps) => {

  const [confirmedState, setConfirmedState]  = useState(0) // 0 - try confirmed, 1 - success, 2 - failed
  const [mutation] = useMutation(MUTATION.confirmation)

  useEffect(() => {
    if (confirmedState !== 0) {
      return
    }
    const key = props.location.search.replace(/^.*=\s*(.*)/,'$1')
    mutation({
      variables:{
        key: key
      }}).then((v) => {
      setConfirmedState(1)
    })
      .catch((e) => {
        setConfirmedState(2)
      })
  },[mutation,setConfirmedState])

  if (confirmedState === 1) {
         /** redirect  */
    return (
      <DialogMessageComponentRedirect
                 title={'Account Successfully Activated !'}
                 text = {'thank you for registering and activating your account!'}
      />
    )
  }

  if (confirmedState === 2 ) {
    return (
      <DialogMessageComponentRedirect
                error
                title={'Account activation error!'}
                text = {'please try again or contact administrator!'}
      />
    )
  }

  return (

    <div>
         Confirmation process.
    </div>

  )

}

export default  withRouter(Component)
