import React, {useEffect}       from 'react'
import {DialogMessageComponent} from '../../../components/Dialog/DialogBasic'
import {useQuery}               from '@apollo/react-hooks'
import {QUERY}                  from '../../graphQL'
import {
  useRedirectLink
}                               from '../../graphQL/hooks'

interface RedirectedStatusFormsProps {
  link : string,
  redirectLink : string,
  redirectLayout : string
  title : string,
  text : string,
  sub : string
}

const RedirectedStatusForm = ({title, link, sub, text, redirectLink,redirectLayout} : RedirectedStatusFormsProps) => {

  const {data} = useQuery(QUERY.ApplicationState.appStateRedirectLink)
  const {redirect} = useRedirectLink()
  useEffect(() => {
    const reg = new RegExp(`.*${link}$`)
    if (!data.data.redirectLink.link || !reg.exec(data.data.redirectLink.link)) {
      redirect(redirectLayout, redirectLink).then(() => {})
    }
  }, [data])

  return (
    <DialogMessageComponent
            title={title}
            text={text}
            sub={sub}
    />
  )
}
export default RedirectedStatusForm
