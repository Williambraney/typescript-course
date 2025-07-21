import { forwardRef, type ComponentPropsWithoutRef } from "react";

type InputProps = {
    label: string;
    id: string;
} & ComponentPropsWithoutRef<'input'>

const Input = forwardRef<HTMLInputElement, InputProps>( function Input({
    label,
    id,
    ...props
},
ref
) {

    return (
        <p>
            <label
                htmlFor={id}
            >
                {label}
            </label>
            <input 
                id={id}
                type="text"
                ref = {ref}
                placeholder="Enter text here"
                name = {id}
                {...props} 
            />
        </p>
    )

});

export default Input;