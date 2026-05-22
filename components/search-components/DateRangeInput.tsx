import React, { useRef } from 'react'

const DateRangeInput = ({ name, label, placeholder, handleChange, handleBlur, type, required = false, value, disabled_field, styles, ...rest }:
    {
        name: string, label: string, placeholder: string, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        handleBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void, type?: string, required?: boolean,
        value?: string, disabled_field?: boolean, styles?: string
    }) => {

    let input_type = "text";
    if (type && type != "") {
        input_type = type;
    }

    return (
        <div className={`w-full flex flex-col h-12 cursor-pointer`}>
            <input className={`w-full font-normal pl-1 outline-none placeholder:font-light placeholder:text-sm appearance-none 
                resize-none overflow-hidden text-base h-12`} type={input_type} name={name} value={value} placeholder={placeholder}
                required={required} disabled={disabled_field || false} onChange={(e) => { handleChange(e) }} {...rest}
                onBlur={(e) => { if (handleBlur) { handleBlur(e) } }} />
        </div>
    )
}

export default DateRangeInput