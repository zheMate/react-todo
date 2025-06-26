export default function UISVGButton({ onClick, className, children, type }) {
    return(
         <button
          type={type}
          className={className}
          onClick={onClick}
        >
          {children}
        </button>

    );
}