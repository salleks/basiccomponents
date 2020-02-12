import React            from 'react'
import {EasyDialog}     from '../../../components/EasyModel/EasyModal'
import {CenteredDialog} from '../../../components/Dialog/DialogBasic'
import {ClientForm}     from './index'
import {
  ApolloProvider,
  useApolloClient
}                       from '@apollo/react-hooks'

const ClientDashboard = () => {

  const apolloClient = useApolloClient()

  return (
    <div className={'hw-client-dashboard-root'}>
      {/* <Button
          label={'Add client'}
          color={'primary'}
          outline
          onClick={() => openDialogAddClientForm(apolloClient)}
      />*/}

      <ClientForm />
    </div>
  )
}

export default ClientDashboard

const openDialogAddClientForm = (apolloClient : any) => {

  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <ApolloProvider client={apolloClient}>
            <ClientForm closeDialog={closeDialog}/>
          </ApolloProvider>
        )
      }
      return (
        <>
          <CenteredDialog
                title={'Define Client'}
                closeAction={closeDialog}
                Component={ComponentToRender}

          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

