import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodos } from "../redux/todoSlice";
import { v4 as uuidv4 } from "uuid";

const AddTodo = ({ todos }) => {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addNewTodo = (e) => {
    e.preventDefault();
    newTodo.length === 0
      ? alert("task name please")
      : dispatch(
          addTodos({
            userId: 1,
            id: uuidv4(),
            title: newTodo,
            completed: false,
          })
        );

    setNewTodo("");
  };
  return (
    <>
      <form className="flex flex-col items-center mb-5" onSubmit={addNewTodo}>
        <input
          className="border-b-[1px] focus:outline-none text-lg border-black w-full h-[50px] p-5 hover:border-red-300"
          type="text"
          name="todo"
          value={newTodo}
          placeholder="Add todo here..."
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="px-5 py-2 mt-5 border-2 border-red-400 w-fit hover:bg-red-300 "
        >
          Add new todo
        </button>
      </form>
    </>
  );
};

export default AddTodo;
