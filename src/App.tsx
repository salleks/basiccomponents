import React, {useEffect} from 'react'
import {BrowserRouter}    from 'react-router-dom'
import Roots              from './components/SideBar/Roots'
import routes             from './components/SideBar/routes'
import 'bootstrap/dist/css/bootstrap.css'

const App : React.FC = () => {

  const style = {
    display: 'flex',
    justifyContent: 'center'
  }

  const styleTheme = {
    width: '600px',
    margin: '20px  auto',
    display: 'flex',
    justifyContent: 'space-around'
  }

  useEffect(() => {
    const  element = document.getElementsByTagName('HTML')[0]
    const array = [...element.className.split(' ').filter(x => !x.startsWith('hw-theme-')),'hw-theme-basic-blue']
    element.className = array.join(' ')
  },[])

  const changeTheme = (theme : string) => {
    const  element = document.getElementsByTagName('HTML')[0]
    const array = [...element.className.split(' ').filter(x => !x.startsWith('hw-theme-')),theme]
    element.className = array.join(' ')
  }
  return (
    <div className={'hw-app-root'}>
      <BrowserRouter>
        {/* <SideBar routes={routes}/>*/}
        {/*  <div style={styleTheme}>
          <button style={{color: 'white', background: 'blue'}}  onClick={() => changeTheme('hw-theme-basic-blue')}>Theme Blue</button>
          <button style={{color: 'white', background: 'green'}} onClick={() => changeTheme('hw-theme-basic-green')}>Theme Green</button>
        </div>*/}
        <div style={style}>
          <Roots routes={routes}/>
        </div>
      </BrowserRouter>

    </div>

  )
}

export default App
