import { forwardRef, useImperativeHandle, useRef, type ComponentPropsWithoutRef, type FormEvent, type ReactNode } from "react";

type FormProps = {
    children: ReactNode;
    onSave: (value: unknown) => void; // Function to handle form submission
} & ComponentPropsWithoutRef<'form'>;

export type FormHandle = {
    clear: () => void; // Method to clear the form
}

const Form = forwardRef<FormHandle, FormProps>( function Form({
    children,
    onSave,
    ...props
},
ref ) {
    
    const formRef = useRef<HTMLFormElement>(null)
    
        useImperativeHandle(ref, () => {
            return {
                clear() {
                    console.log('CLEARING FORM');
                    formRef.current?.reset(); // Method to reset the form
                }
            }
        }) // This hook allows you to customize the instance value that is exposed to parent components when using `ref`

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {

        event.preventDefault(); // Prevent the default form submission behavior
        // You can add additional logic here if needed, such as form validation

        const formData = new FormData(event.currentTarget); // Get form data
        const data = Object.fromEntries(formData) 

        onSave(data); // Call the onSave function with the form data

        formRef.current?.reset(); // Reset the form after submission

    }

    return (
        <form
            onSubmit = {handleSubmit}
            ref = {formRef}
            {...props}
        >
            { children }
        </form>
    )

});

export default Form;