import "./AddEditTaskComponent.css";
import { useState } from "react";
import { addTodos } from "../../http";
export default function AddEditTaskComponent({reFetchListOfTodo, setAllTodos, allTodos}) {
  
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
      const resData = await addTodos(allInputValues);  
      setAllTodos([resData, ...allTodos ]);
      reFetchListOfTodo();
      setFormValue({title: '',});
    }
    
  }
  const validateFormInput = (formData) =>{
    let errors = {};
    if(!formData.title){
      errors.title = "title is required";
    } else if (!enoughCharactersForTitle(formData.title)){
      errors.title = "title should be 2-64 characters, Cyrillic, Latin or Numbers";
    }
    return errors;
  }
  const enoughCharactersForTitle = (title) => {  
    const regExp = /^[A-Za-zА-Яа-я0-9]{2,64}$/;
    return regExp.test(title);
  }
  
  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmit}>
      <input value={formValue.title} name="title" type="text"   placeholder="Task To Be Done..." onChange={handleInput}/>
      <button type="submit"  >Add</button>
      </form>
      <div>
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
    </div>
  );
}
