import AddTaskComponent from "./components/AddEditTaskComponent/AddEditTaskComponent";
import ErrorPage from "./components/ErrorPageComponent/ErrorPage";
import ListTaskComponent from "./components/ListTaskComponent/ListTaskComponent";
import { useEffect, useState } from "react";
import { fetchAvalaibleToDos } from "./http";
function App() {
  const [listOfTodos, setListOfTodos] = useState([]);
  const [reqFilter, setReqFilter] = useState('all');
  const [quantityOfTodos, setQuantityOfTodos] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  async function fetchTodos() {
    setIsFetching(true);
    try {
      const todos = await fetchAvalaibleToDos(reqFilter);
      setListOfTodos(todos.data);
      setQuantityOfTodos(todos.info);
    } catch (error) {
      setError({ message: error.message || "Could not fetch Todos" });
      setIsFetching(false);
    }
    setIsFetching(false);
  }
  useEffect(() => {  
    fetchTodos();
  }, [reqFilter]);

  if (error) {
    return <ErrorPage title="An error occured!" message={error.message} />;
  }

  return (
    <main>
      <AddTaskComponent
        reFetchListOfTodo={fetchTodos}
      />
      <ListTaskComponent
        reqFilter={reqFilter}
        setReqFilter={setReqFilter}
        reFetchListOfTodo={fetchTodos}
        allTypesOfQuantity={quantityOfTodos}
        setAllTodos={setListOfTodos}  
        allTodos={listOfTodos}
        loadingText="Fetching todo Items data..."
        isLoading={isFetching}
      />
    </main>
  );
}

export default App;
