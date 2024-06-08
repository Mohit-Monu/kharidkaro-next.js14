import { ReactNode } from "react";
const GradiantButton = ({
  children,
  className,
  OnClick,
  type,
  disabled
}: {
  children: ReactNode;
  className?: string;
  OnClick?: () => void;
  type?:"button"|"submit"
  disabled?:boolean
}) => {
  return (
    <button
      type={type?type:"button"}
      className={`text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-4 py-2 text-center ${className}`}
      onClick={OnClick} disabled={disabled}
    >
      {children}
    </button>
  );
};

export default GradiantButton;
