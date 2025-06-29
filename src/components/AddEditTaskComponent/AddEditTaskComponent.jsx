import "./AddEditTaskComponent.css";
import { useState } from "react";
import { addTodos } from "../../http";
import UIButton from "../../UI/UIButton";
export default function AddEditTaskComponent({reFetchListOfTodo}) {
  
  const [formValue, setFormValue] = useState({title: '',});
  const [errors, setError] = useState({});
  const handleInput = (e)=>{
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    const ValidationError = validateFormInput(formValue);
    setError(ValidationError);
    if(Object.keys(ValidationError).length===0){
      const allInputValues = {title: formValue.title, isDone: false}
      await addTodos(allInputValues);  
      reFetchListOfTodo();
      setFormValue({title: '',});
    }
  }
  const validateFormInput = ({title}) =>{
    let errors = {};
    if(!title){
      errors.title = "title is required";
    } else if (title.length < 2 || title.length > 64){
      errors.title = "title should be 2-64 characters, Cyrillic, Latin or Numbers";
    }
    return errors;
  }
  
  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmit}>
      <input value={formValue.title} name="title" type="text"   placeholder="Task To Be Done..." onChange={handleInput}/>
      <UIButton type="submit">Add</UIButton>
      </form>
      <div>
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
    </div>
  );
}
