import "./style.css";

export default function UIButton({onClick, className, children, type}) {
    return (
         <button
            className={className}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}