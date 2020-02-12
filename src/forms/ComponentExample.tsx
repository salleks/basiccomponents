import React            from 'react'
import InputTextFloat from '../componentsUI/InputTextFloat'
import {InputText}      from '../components/InputText'
import CardInfo       from '../components/CardInfo'
import SelectText       from '../components/SelectText'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

const ComponentExamples = () => {
  return (

    <div style={{
      margin: '50px auto',
      width: '80%'
    }}>

      <div className={'hw-component-div'} >
        <div className={'hw-component'}>
          <SelectText
              label={'Select'}
              selectValues={[
                {
                  value: 'test',
                  label: 'Test'
                },
                {
                  value: 'test1',
                  label: 'Test 1'
                }
              ]}
              value={''}
              onChange={() => {}}
              field={''}
          /> </div>
        <div className={'hw-component'}>
          <SelectText
              helperText={'choose one'}
              label={'Select'}
              required
              selectValues={[
                {
                  value: 'test',
                  label: 'Test'
                },
                {
                  value: 'test1',
                  label: 'Test 1'
                }
              ]}
              value={''}
              onChange={() => {}}
              field={''}
          />
        </div>
      </div>

      <div className={'hw-component-div'} >
        <div className={'hw-component'}>
          <InputText
              fullWidth
              icon={faDollarSign}
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => (e)}
              label={'Label'}
              helperText={'helper text'}/>
        </div>
        <div className={'hw-component'}>
          <InputText
              fullWidth
              error={'Test error'}
              required
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => (e)}
              label={'Label'}
              helperText={'helper text'}/>
        </div>
      </div>

      <InputTextFloat/>

      <div className={'btn-div-test'}>
        <button className={'hw-button-default'}>

          <span className={'hw-button-text'}>DEFAULT</span>

        </button>

        <button className={'hw-button-default hw-primary'}>

          <span className={'hw-button-text'}>PRIMARY</span>

        </button>

        <button className={'hw-button-default hw-success'}>

          <span className={'hw-button-text'}>SUCCESS</span>

        </button>

        <button className={'hw-button-default hw-danger'}>

          <span className={'hw-button-text'}>DANGER</span>

        </button>

        <button className={'hw-button-default hw-info'}>

          <span className={'hw-button-text'}>INFO</span>

        </button>

        <button className={'hw-button-default hw-primary hw-lg'}>

          <span className={'hw-button-text'}>LG PRIMARY</span>

        </button>
        <button className={'hw-button-default hw-primary hw-block'}>

          <span className={'hw-button-text'}>BLOCK</span>

        </button>

        {/* OUTLINE BUTTONS*/}

        <button className={'hw-button-default hw-primary hw-outline'}>

          <span className={'hw-button-text'}>PRIMARY OUTLINE</span>

        </button>

        <button className={'hw-button-default hw-success hw-outline'}>

          <span className={'hw-button-text'}>SUCCESS OUTLINE</span>

        </button>

        <button className={'hw-button-default hw-danger hw-outline'}>

          <span className={'hw-button-text'}>DANGER OUTLINE</span>

        </button>

        <button className={'hw-button-default hw-info hw-outline'}>

          <span className={'hw-button-text'}>INFO OUTLINE</span>

        </button>

        <button className={'hw-button-default hw-primary hw-lg hw-outline'}>

          <span className={'hw-button-text'}>LG PRIMARY OUTLINE</span>

        </button>
        <button className={'hw-button-default hw-primary hw-block hw-outline'}>

          <span className={'hw-button-text'}>BLOCK OUTLINE</span>

        </button>

      </div>

      <CardInfo/>

    </div>

  )
}

export default ComponentExamples
