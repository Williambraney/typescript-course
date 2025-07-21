import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

type ContainerProps<T extends ElementType> = { // Stands for type parameter T
    as?: T // Value should be the name of the component to render
    children: ReactNode; // Optional children prop to allow passing content
} & ComponentPropsWithoutRef<T>

export default function Container<C extends ElementType>({ // C is a type parameter that will be inferred from the `as` prop
    as,
    children,
    ...props
}: ContainerProps<C> ) {

    const Component = as || 'div'; // Default to 'div' if no component is provided

    return <Component
        className="container" // Add a default class name
        {...props} // Spread the rest of the props onto the component
    >
        {children}
    </Component>

};