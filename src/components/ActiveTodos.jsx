import React from "react";
import { useDispatch } from "react-redux";
import {
  filterActiveTodos,
  filterCompletedTodos,
  getTodos,
} from "../redux/todoSlice";

const ActiveTodos = () => {
  const dispatch = useDispatch();
  const handleAllTodos = () => {
    dispatch(getTodos());
  };

  const handleCompletedTodos = () => {
    dispatch(filterCompletedTodos());
  };

  const handleActiveTodos = () => {
    dispatch(filterActiveTodos());
  };

  return (
    <div className="flex justify-center">
      <span className="mr-5 text-lg cursor-pointer" onClick={handleAllTodos}>
        All
      </span>
      <span onClick={handleActiveTodos} className="mr-5 text-lg cursor-pointer">
        Active
      </span>
      <span
        className="mr-5 text-lg cursor-pointer"
        onClick={handleCompletedTodos}
      >
        Completed
      </span>
    </div>
  );
};

export default ActiveTodos;
