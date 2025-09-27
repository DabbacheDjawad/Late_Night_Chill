import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      className={`relative cursor-pointer py-2 px-4 text-center font-barlow inline-flex justify-center uppercase
      dark:text-white text-black rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline
      focus:outline-white focus:outline-offset-4 overflow-hidden ${className}`}
    >
      <span className="relative z-20 flex items-center gap-2">{children}</span>

      <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-black/20 dark:bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

      <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block dark:border-[#D4EDF9] border-black absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
      <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block dark:border-[#D4EDF9] border-black absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
      <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block dark:border-[#D4EDF9] border-black absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
      <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block dark:border-[#D4EDF9] border-black absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
    </button>
  );
};

export default Button;
