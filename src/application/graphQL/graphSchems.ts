import gql           from 'graphql-tag'
import {ApolloCache} from 'apollo-cache'

gql`
    scalar DateTime
    


    type User {
        id: ID!
        description: String!
        active: Boolean!
        deleted: Boolean!
        createdAt: DateTime!
        updatedAt: DateTime!
        accounts: [Account!]!
    }
    
    type RedirectLink {
        link: String
        processed:Boolean
      }
    
   type ApplicationState {
        login: Boolean
        refreshTokenTime: String
        account: Account 
        redirectLink: RedirectLink
     }
    
    type Address {
        id: ID!
        street: String!
        zipCode: String!
        city: String!
        state: String!
        flag: String
        userId: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    
    type Contact {
        id: ID!
        flag: String!
        value: String!
        description: String
        userId: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Client {
        id: ID!
        flag: Int
        taxNumber: String!
        clientNumber: String!
        description: String!
        status: Int
        userId: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
        addresses: [Address]
        contacts: [Contact]
    }
    
    type Account {
        id: ID!
        userName: String!
        email: String!
        status:Int!
        createdAt: DateTime!
        updatedAt: DateTime!
        user: User!
    }

    input AddressInputTypeInsert {
        street: String!
        zipCode: String!
        city: String!
        state: String!
        description: String
        flag: String
    }

    input AddressInputTypeUpdate {
        street: String
        zipCode: String
        city: String
        state: String
        description: String
        flag: String
    }
    
    input ContactInputTypeInsert {
        flag: Float!
        value: String!
        description: String
        status: Float
    }
    
    input ContactInputTypeUpdate {
        flag: Float
        value: String
        description: String
        status: Float
    }
    
    input ClientInputTypeInsert {
        taxNumber: String!
        clientNumber: String!
        description: String!
        flag: Int
        status: Int
        addresses: Address
        contacts: [Contact]
    }
    
    input ClientInputTypeUpdate {
        taxNumber: String
        clientNumber: String
        description: String
        flag: Int
        status: Int
        addresses: Address
        contacts: [Contact]
    }
    
    input AccountInputTypeInsertRegister {
       accountCode: String!
       userName: String!
       email: String!
       password: String!
    }
    
    input AccountInputTypeChangePassword {
       password: String!
       key: String!
    }
`

const userDetails = gql`
    fragment userDetails on User {
        id
        description
        active
        createdAt
        updatedAt
    }
`

const addressDetails = gql`   
    fragment addressDetails on Address {
            id
            street
            city
            state
            zipCode
            description
            flag
            createdAt
            updatedAt 
}`

const contactDetails = gql`
    fragment contactDetails on Contact {
        id
        flag
        value
        description
        status
        createdAt
        updatedAt
    }
`

const clientDetails = gql`
    fragment clientDetails on Client {
        id
        taxNumber
        clientNumber
        description
        flag
        status
    }
`

const accountDetailsShort = gql`
    fragment accountDetailsShort on Account {
        id
        userName
        email
        status
        createdAt
        updatedAt
    }
`

const QUERY = {

  ApplicationState: {

    appState: gql`
          query appState { 
               appState: ApplicationState @client{
                   login
                   account {
                      id
                      userName
                      email  
                      user{
                        id
                        description
                        accountCode
                      }                    
                   }
                    refreshTokenTime
                    redirectLink {
                       link
                       processed
                    }  
                } 
          }
       `,
    appStateRedirectLink: gql`
       query appStateRedirectLink { 
          data:ApplicationState @client {
              redirectLink {
                link
                processed
                }           
              }
          }
      `

  },
  Address: {
    address: gql`
            query address($id: Int!) {
                address(id: $id) {
                    ...addressDetails
                      }
                 }
            ${addressDetails}         
        `,

    addresses: gql`
            query addresses($limit: Int,$offset: Int, $page: Int, $perPage: Int, $sort: Sorting ) {
                addresses(limit:$limit,offset:$offset, page: $page, perPage:$perPage, sort:$sort) {
                    count
                    perPage
                    page
                    items{
                        ...addressDetails
                        }
                    }
                }
            ${addressDetails}
        `,
  },

  User: {
    users: gql`
            query users($limit: Int,$offset: Int, $page: Int, $perPage: Int, $sort: Sorting) {
                users(limit:$limit,offset:$offset, page: $page, perPage:$perPage, sort:$sort) {
                    items{
                       ...userDetails
                    }
                    count
                    perPage
                    page
                }
            }
            ${userDetails}
        `,
    user: gql`
            query  user($id: Int!) {
                user(id: $id) {
                    ...userDetails
                    accounts {
                      ...accountDetailsShort
                    }
                  }
               }
            ${userDetails}
            ${accountDetailsShort}
        `
  },

  Contact: {
    contacts : gql`
            query contacts($limit: Int,$offset: Int, $page: Int, $perPage: Int, $sort: Sorting) {
                contacts(limit:$limit,offset:$offset, page: $page, perPage:$perPage, sort:$sort) {
                    items{
                        ...contactDetails
                    }
                    count
                    perPage
                    page
                }
            }
            ${contactDetails}
        `,
    contact: gql`
            query contact($id: Int!) {
                contact(id: $id) {
                    ...contactDetails
                }
            }
            ${contactDetails}
        `
  },

  Client: {
    clients:  gql`
            query clients($limit: Int,$offset: Int, $page: Int, $perPage: Int, $sort: Sorting) {
                clients(limit:$limit,offset:$offset, page: $page, perPage:$perPage, sort:$sort) {
                    items{
                        ...clientDetails
                    }
                    count
                    perPage
                    page
                }
            }
            ${clientDetails}
        `,
    client: gql`
            query client($id: Int!) {
                client(id: $id) {
                    ...clientDetails
                }
            }
            ${clientDetails}       `
  },
  Account: {

    refreshToken: gql`
        query refreshToken{
            data: refreshToken {
                refresh
             }
         }
     `,
    triggerToken: gql`
        query triggerToken{
            data:triggerToken {
                refresh
             }
         }
     `,
    accountPasswordRecovery: gql`
       query accountPasswordRecovery($email: String!) {
           data:accountPasswordRecovery(email:$email)
        }
    `,
    login: gql`
        query login($email:String!, $password: String!) {
            data:login(email: $email, password: $password) {
               refresh
            }
        }`,
    logged: gql`
        query logged {
            logged{
                 id
                 email
                 userName,
                 user {
                   id
                   accountCode
                   description
                  }
             }
        }`,
    accounts: gql`
         query accounts($offset: Int,$limit: Int ){
            data:accounts(offset: $offset,limit:$limit){
             items{
                       ...accountDetailsShort
                    }
                    count
                    perPage
                    page
             }
          }
          ${accountDetailsShort}
       `
  }
}

const MUTATION = {

  ApplicationState: {
    setAppStateRedirectLinkProcessed: gql`
          mutation setAppStateRedirectLinkProcessed($val:Boolean){
              setAppStateRedirectLinkProcessed(value:$val)@client
          }
      `,
    appStateRedirectLink: gql`
          mutation setAppStateRedirectLink($link:string){
              setAppStateRedirectLink(link:$link) @client
          }
      `,
    appState: gql`
          mutation setAppState($login: Boolean, $account: Account, $refresh: String){ 
               setAppState(login:$login, account: $account,refresh: $refresh) @client {
                   login
                   account
               }
          }
       `
  },

  accountChangePassword:  gql`
     mutation accountChangePassword($data: AccountInputTypeChangePassword!) {
          accountChangePassword(data: $data)
      }
  `,

  confirmation: gql`
           mutation confirmation($key:String!) {
             confirmation(key: $key) 
          }
         `,
  registration: gql`
           mutation registration($data:AccountInputTypeInsertRegister!) {
             registration(data: $data) 
          }
         `,

  refreshToken: gql`
        mutation refreshToken {
            account:refreshToken{
                ...accountDetailsShort
            }
        }
        ${accountDetailsShort}
    `,
  Address: {
    insertAddress: gql`
            mutation insertAddress($data:AddressInputTypeInsert!) {
                address:insertAddress(data:$data) {
                   ...addressDetails
                    }
               }
            ${addressDetails}
        `,
    updateAddress: gql`
            mutation updateAddress($id:Int!, $data: AddressInputTypeUpdate!) {
                address:updateAddress(id:$id, data: $data) {
                    ...addressDetails
                  }
               }
            ${addressDetails}
        `
  },
  Contact: {
    insertContact: gql`
            mutation insertContact($data: ContactInputTypeInsert!){
                contact:insertContact(data: $data) {
                    ...contactDetails
                }
            }
            ${contactDetails}
        `,
    updateContact: gql`
            mutation updateContact($id:Int!, $data: ContactInputTypeUpdate!) {
                contact:updateContact(id:$id, data: $data) {
                    ...contactDetails
                }
            }
            ${contactDetails}
        `
  },
  Client: {
    insertClient: gql`
            mutation insertClient($data: ClientInputTypeInsert!) {
                client: insertClient(data: $data){
                    ...clientDetails
                    addresses{
                        ...addressDetails
                    }
                    contacts{
                        ...contactDetails
                    }
                }
            }
            ${clientDetails}
            ${addressDetails}
            ${contactDetails}
        `,
    updateClient: gql`
            mutation updateClient($id:Int!, $data: ClientInputTypeUpdate!) {
                client:updateClient(id:$id, data: $data) {
                    ...clientDetails
                }
            }
            ${clientDetails}
        `
  }
}

export {
  QUERY,
  MUTATION
}
