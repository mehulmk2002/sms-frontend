import React, { ReactNode } from 'react'
interface PropsType {
    children?: ReactNode
    title: string
}

const FormFieldGroup = ({ children, title }: PropsType) => {
    return (
        <div>
            <h4 className="form-categori-lable"  >{title}</h4><hr />
            <div className="row">
                {children}
            </div>
        </div>
    )
}

export default FormFieldGroup