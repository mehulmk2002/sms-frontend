import React, { ReactNode } from 'react'

interface PropsType{
    children?: ReactNode
    title:string
    formik:any
}


const FormContainer = ({children,title,formik}:PropsType) => {
    return (
        <div className='container'>
            <h1 style={{ textAlign: 'center', color: 'blueviolet' }}>{title}</h1>
            <form style={{ marginTop: '50px' }}  onSubmit={formik.handleSubmit}>
                {children}
            </form>
        </div>
    )
}

export default FormContainer