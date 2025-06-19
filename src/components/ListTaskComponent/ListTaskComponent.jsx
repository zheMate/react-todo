import ButtonComponent from "../ButtonComponent/ButtonComponent";
import SingleTaskComponent from "../SingleTaskComponent/SingleTaskComponent";
import "./ListTaskComponent.css";
export default function ListTaskComponent({
  reqFilter,
  setReqFilter,
  reFetchListOfTodo,
  setAllTodos,
  allTypesOfQuantity,
  allTodos,
  loadingText,
  isLoading,
}) {
  
  
    return (
      <div className="list-task-container">
        <form
          className="list-task-statuses"
          onSubmit={(e) => e.preventDefault()}
        >
          <ButtonComponent
            buttonText="Все"
            buttonTypeName="all"
            reqFilter={reqFilter}
            setReqFilter={setReqFilter}
            countity={allTypesOfQuantity.all}
            reFetchListOfTodo={reFetchListOfTodo}
          />
          <ButtonComponent
            buttonText="В работе"
            buttonTypeName="inWork"
            reqFilter={reqFilter}
            setReqFilter={setReqFilter}
            countity={allTypesOfQuantity.inWork}
            reFetchListOfTodo={reFetchListOfTodo}
          />
          <ButtonComponent
            buttonText="Сделано"
            buttonTypeName="completed"
            reqFilter={reqFilter}
            setReqFilter={setReqFilter}
            countity={allTypesOfQuantity.completed}
            reFetchListOfTodo={reFetchListOfTodo}
          />
        </form>

        {isLoading && <p className="loading-text">{loadingText}</p>}
        
        {!isLoading && allTodos.length > 0 && (
          <ul className="list-of-tasks">
            {allTodos.map((singleTodo) => (
                <SingleTaskComponent
                  singleTodo={singleTodo}
                  allTodos={allTodos}
                  setAllTodos={setAllTodos}
                  reFetchListOfTodo={reFetchListOfTodo}
                />
            ))}
          </ul>
        )}
      </div>
    );
  };

