
// import React from "react";
import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    border: boolean;
    children: ReactNode;
}

const Card = ({border, children, ...props}: Props) => {

    return (
        <div className={`${border && "rounded border-state-600 border"} p-1 ${props.className}`}>
           {children} 
        </div>
    )
}

export default Card