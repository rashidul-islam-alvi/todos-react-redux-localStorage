import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveTodos from "./components/ActiveTodos";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { fetchTodos } from "./redux/todoSlice";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoReducer.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  });

  return (
    <div className="flex items-center justify-center py-10 ">
      <div className="flex  flex-col  min-h-[30%] min-w-[50%] ">
        <Header />

        <AddTodo todos={todos} />
        <TodoList todos={todos} />

        <ActiveTodos />
      </div>
    </div>
  );
}

export default App;
