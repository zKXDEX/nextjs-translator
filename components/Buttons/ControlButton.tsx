import React, { FunctionComponent } from "react";

interface ButtonProps {
  children: React.ReactNode;
  event?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FunctionComponent<ButtonProps> = ({children, event}) => {
  return (
    <>
      <button onClick={event} className="px-2 py-2 rounded-lg bg-line/10 hover:bg-line/20 text-white mx-1 transition-all hover:scale-110 duration-300">
        {children}
      </button>
    </>
   );
}

export default Button;