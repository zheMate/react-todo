import { useState } from "react";
import "./SingleTaskComponent.css";
import TrashCan from "../../assets/trash-can.svg";
import EditPencil from "../../assets/edit-pencil.svg";
import { editTodos, deleteTodos } from "../../http";
import UISVGButton from "../../UI/UISVGButton";
import UIButton from "../../UI/UIButton";

export default function SingleTaskComponent({
  singleTodo,
  setAllTodos,
  reFetchListOfTodo,
  allTodos,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoItemTitle, setNewTodoItemTitle] = useState(singleTodo.title);
  const [errors, setError] = useState({});

  const handleCheckIsDone = async (todoItemId) => {
    const listAllTodos = allTodos.map((todoItem) =>
      todoItem.id === todoItemId
        ? { ...todoItem, isDone: !todoItem.isDone }
        : todoItem
    );
    setAllTodos(listAllTodos);
    const checkedTodo = listAllTodos.filter(
      (todoItem) => todoItem.id === todoItemId
    );
    await editTodos(todoItemId, {
      isDone: checkedTodo[0].isDone,
      title: checkedTodo[0].title,
    });
    reFetchListOfTodo();
  };

  const handleEdit = async () => {
    setIsEditing((editingState) => !editingState);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleUpdateTodoItem(singleTodo.id);
  };
  const handleUpdateTodoItem = async (todoItemId) => {
    const ValidationError = validateFormInput(newTodoItemTitle);
    setError(ValidationError);
    if (Object.keys(ValidationError).length === 0) {
      const todoItemForUpdate = allTodos.filter(
        (todoItem) => todoItem.id === todoItemId
      );
      const result = await editTodos(todoItemId, {
        isDone: todoItemForUpdate[0].isDone,
        title: newTodoItemTitle,
      });
      reFetchListOfTodo();
      setIsEditing(false);
    }
  };
  const validateFormInput = (newTodoItemTitle) => {
    let errors = {};
    if (!newTodoItemTitle) {
      errors.title = "title is required";
    } else if (newTodoItemTitle.length < 2 || newTodoItemTitle.length > 64) {
      errors.title =
        "title should be 2-64 characters, Cyrillic, Latin or Numbers";
    }
    return errors;
  };
  const handleChange = async (event) => {
    setNewTodoItemTitle(event.target.value);
  };
  const handleCancelUpdate = async () => {
    setNewTodoItemTitle(singleTodo.title);
    setIsEditing(false);
  };

  const handleDelete = async (todoItemId) => {
    await deleteTodos(todoItemId);
    reFetchListOfTodo();
  };

  return (
    <li key={singleTodo.id} className="task">
      <input
        type="checkbox"
        checked={singleTodo.isDone}
        onChange={() => handleCheckIsDone(singleTodo.id)}
      />
      <form onSubmit={handleSubmit}>
        <div>
          {isEditing ? (
            <input
              type="text"
              required
              value={newTodoItemTitle}
              onChange={handleChange}
            />
          ) : (
            <label
              className={singleTodo.isDone ? "done" : ""}
              style={null}
            >
              {newTodoItemTitle}
            </label>
          )}
          <div className="edit-block">
            {errors.title && <span className="error">{errors.title}</span>}
          </div>
        </div>
        {isEditing ? (
          <UIButton type="submit"
            className="edit-task-button"
            onClick={() => handleUpdateTodoItem(singleTodo.id)}
            >
            Save
          </UIButton>
        ) : (
          <UISVGButton type="button" className="edit-task-button" onClick={handleEdit}>
            <img className="button-icon" src={EditPencil} alt="Edit pencil" />
          </UISVGButton>
        )}
        {isEditing ? (
          <UIButton type="button" className="delete-task-button" onClick={handleCancelUpdate}>
            Cancel
          </UIButton>
        ) : null}
        <UISVGButton type="button"
          className="delete-task-button"
          onClick={() => handleDelete(singleTodo.id)}
        >
          <img className="button-icon" src={TrashCan} alt="Trash can" />
        </UISVGButton>
      </form>
    </li>
  );
}
