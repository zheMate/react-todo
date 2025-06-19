import "./ButtonComponent.css";

export default function ButtonComponent ({ countity, buttonText, buttonTypeName, reqFilter, setReqFilter}) {
  
    return (
        <button
            className={buttonTypeName === reqFilter ? "selected" : null}
            type="button"
            onClick={()=>setReqFilter(buttonTypeName)}
        >
            {buttonText} ({countity})
        </button>
        
    );
}