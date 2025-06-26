import ButtonComponent from "../ButtonComponent/ButtonComponent";
import TaskFeedComponent from "../TaskFeedComponent";
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
      <form className="list-task-statuses" onSubmit={(e) => e.preventDefault()}>
        <ButtonComponent
          onClick={() => setReqFilter("all")}
          className={reqFilter === "all" ? "selected" : ""}
        >
          Все ({allTypesOfQuantity.all})
        </ButtonComponent>
        <ButtonComponent
          onClick={() => setReqFilter("inWork")}
          className={reqFilter === "inWork" ? "selected" : ""}
        >
          В работе ({allTypesOfQuantity.inWork})
        </ButtonComponent>
        <ButtonComponent
          onClick={() => setReqFilter("completed")}
          className={reqFilter === "completed" ? "selected" : ""}
        >
          Сделано ({allTypesOfQuantity.completed})
        </ButtonComponent>
      </form>

      <TaskFeedComponent
        allTodos={allTodos}
        loadingText={loadingText}
        isLoading={isLoading}
        reFetchListOfTodo={reFetchListOfTodo}
        setAllTodos={setAllTodos}
      />
    </div>
  );
}
