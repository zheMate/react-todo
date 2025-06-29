import UIButton from "../../UI/UIButton"
import "./ButtonComponent.css";

export default function ButtonComponent ({ onClick, className, children}) {
  
    return (
        <UIButton 
        onClick={onClick}
        className={className}
        >
            {children}
        </UIButton>
    );
}