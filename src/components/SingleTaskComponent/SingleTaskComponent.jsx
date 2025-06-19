import { useState } from "react";
import "./SingleTaskComponent.css";
import { apiRequest } from "../../http";
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
    const updateOptions = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        isDone: checkedTodo[0].isDone,
        title: checkedTodo[0].title,
      }),
    };
    const reqUrl = `https://easydev.club/api/v1/todos/${todoItemId}`;
    const result = await apiRequest(reqUrl, updateOptions);
    reFetchListOfTodo();
    if (result) throw new Error(result);
  };

  const handleEdit = async () => {
    setIsEditing((editingState) => !editingState);
  };
  const handleUpdateTodoItem = async (todoItemId) => {
    const ValidationError = validateFormInput(newTodoItemTitle);
    setError(ValidationError);
    if (Object.keys(ValidationError).length === 0) {
      const todoItemForUpdate = allTodos.filter(
        (todoItem) => todoItem.id === todoItemId
      );
      const updateOptions = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          isDone: todoItemForUpdate[0].isDone,
          title: newTodoItemTitle,
        }),
      };
      const reqUrl = `https://easydev.club/api/v1/todos/${todoItemId}`;
      const result = await apiRequest(reqUrl, updateOptions);
      reFetchListOfTodo();
      if (result) throw new Error(result);
      setIsEditing(false);
    }
  };
  const validateFormInput = (newTodoItemTitle) => {
    let errors = {};
    if (!newTodoItemTitle) {
      errors.title = "title is required";
    } else if (!enoughCharactersForTitle(newTodoItemTitle)) {
      errors.title =
        "title should be 2-64 characters, Cyrillic, Latin or Numbers";
    }
    return errors;
  };
  const enoughCharactersForTitle = (title) => {
    const regExp = /^[A-Za-zА-Яа-я0-9]{2,64}$/;
    return regExp.test(title);
  };
  const handleChange = async (event) => {
    setNewTodoItemTitle(event.target.value);
  };
  const handleCancelUpdate = async () => {
    setNewTodoItemTitle(singleTodo.title);
    setIsEditing(false);
  };

  const handleDelete = async (todoItemId) => {
    const listAllTodos = allTodos.filter(
      (todoItem) => todoItem.id !== todoItemId
    );
    setAllTodos(listAllTodos);
    const deleteOptions = { method: "DELETE" };
    const reqUrl = `https://easydev.club/api/v1/todos/${todoItemId}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    reFetchListOfTodo();
    if (result) throw new Error(result);
  };
  return (
    <li key={singleTodo.id} className="task">
      <input
        type="checkbox"
        checked={singleTodo.isDone}
        onChange={() => handleCheckIsDone(singleTodo.id)}
      />
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
            style={
              singleTodo.isDone ? { textDecoration: "line-through" } : null
            }
          >
            {newTodoItemTitle}
          </label>
        )}
        <div className="edit-block">
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
      </div>
      {isEditing ? (
        <button
          type="submit"
          className="edit-task-button"
          onClick={() => handleUpdateTodoItem(singleTodo.id)}
        >
          Save
        </button>
      ) : (
        <button type="submit" className="edit-task-button" onClick={handleEdit}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
        </button>
      )}
      {isEditing ? (
        <button
          type="submit"
          className="delete-task-button"
          onClick={handleCancelUpdate}
        >
          Cancel
        </button>
      ) : null}
      <button
        type="submit"
        className="delete-task-button"
        onClick={() => handleDelete(singleTodo.id)}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>
      </button>
    </li>
  );
}
