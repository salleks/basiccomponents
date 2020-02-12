import React          from 'react'
import {IButtonProps} from './Button'
import {Button}       from './index'

interface IButtonActionProps extends IButtonProps{
  action : (e : React.MouseEvent<HTMLButtonElement,MouseEvent>) => void
}

export interface IButtonsFormProps {
  buttonsCancel : IButtonActionProps
  buttonSubmit : IButtonActionProps
}

const ButtonsForm = ({buttonsCancel,buttonSubmit} : IButtonsFormProps) => {
  return (
    <div className={'d-flex col-md-12 justify-content-center'}>
      <div className="col-md-12">
        <div className={'d-flex flex-fill justify-content-around'} >
          <div className={'col-md-6'}>
            <Button
            classNames={'hw-form-button-root'}
            label={buttonsCancel.label ? buttonsCancel.label : 'CANCEL'}
            onClick={buttonsCancel.action}
            outline
            fullWidth
            color={buttonsCancel.color ? buttonsCancel.color : 'danger'}
            />
          </div>
          <div className={'col-md-6'}>
            <Button
            classNames={'hw-form-button-root'}
            label={buttonSubmit.label ? buttonSubmit.label : 'SUBMIT'}
            onClick={buttonSubmit.action}
            outline
            fullWidth
             color={buttonSubmit.color ? buttonSubmit.color : 'primary'}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default ButtonsForm
