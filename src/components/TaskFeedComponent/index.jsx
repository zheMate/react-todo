import SingleTaskComponent from "../SingleTaskComponent/SingleTaskComponent";
export default function TaskFeedComponent({allTodos, loadingText, isLoading, reFetchListOfTodo, setAllTodos}) {
  return (
    <div>
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
}
