import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost';
};

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'default',
    className,
    ...props
}) => {
    // const styles = className(
    //     '',
    //     {
    //         'bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
    //         'border border-gray-300 text-gray-800 hover:bg-gray-100': variant === 'outline',
    //         'text-gray-600 hover:bg-gray-100': variant === 'ghost',
    //     },
    //     className
    // );

    return (
        <button className={`px-4 py-2 rounded font-medium transition-colors`} {...props}>
            {children}
        </button>
    );
};
