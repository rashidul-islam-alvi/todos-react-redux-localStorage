import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getToDosFromLocalStorage = () => {
  const localTodoList = window.localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  } else {
    return [];
  }
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return await res.data;
});

const initialState = {
  isLoading: false,
  todos: getToDosFromLocalStorage(),
  error: null,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    getTodos: (state) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        state.todos = todoListArr;
      }
    },
    addTodos: (state, action) => {
      // state.todos.push(action.payload);
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push(action.payload);
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todos.push(action.payload);
      }
    },
    deleteTodo: (state, action) => {
      // const id = action.payload;
      // state.todos = state.todos.filter((todo) => todo.id !== id);

      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todos = todoListArr;
      }
    },

    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todo.completed = action.payload.completed;
            todo.title = action.payload.title;
          }
        });

        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todos = todoListArr;
      }
    },

    filterCompletedTodos: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");

      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        let filteredTodos = todoListArr.filter(
          (todo) => todo.completed === true
        );

        state.todos = filteredTodos;
      }
    },

    filterActiveTodos: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");

      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        let filteredTodos = todoListArr.filter(
          (todo) => todo.completed === false
        );

        state.todos = filteredTodos;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;

      /*run this code once to fetch data
      
      
      
      window.localStorage.setItem(
        "todoList",
        JSON.stringify(action.payload.slice(0, 4))
      );

      
      */

      state.error = null;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.todos = [];
      state.error = action.error.message;
    });
  },
});

export const {
  getTodos,
  addTodos,
  deleteTodo,
  updateTodo,
  filterCompletedTodos,
  filterActiveTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
