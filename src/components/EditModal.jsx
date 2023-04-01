import React, { useState } from "react";
import { MdCancel, MdDoneAll } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateTodo } from "../redux/todoSlice";

const EditModal = ({ todo, setEditing }) => {
  const dispatch = useDispatch();
  const [updatedTodo, setUpdatedTodo] = useState("");
  const handleChange = (e) => {
    setUpdatedTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedTodo === "") {
      alert("Task name required");
    } else {
      dispatch(updateTodo({ ...todo, title: updatedTodo }));
      setEditing(false);
    }
  };
  const handleCancelClick = () => {
    setEditing(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center my-10 border-2 ">
      <input
        placeholder={todo.title}
        onChange={handleChange}
        className="w-full p-4 italic focus:ring-green-500 focus:border-green-500 focus:outline-none "
      />
      <button className="flex items-center px-4 py-2 rounded-md cursor-pointer">
        <MdDoneAll className="text-3xl text-green-700 hover:text-green-400 " />
      </button>
      <button
        onClick={handleCancelClick}
        className="flex items-center px-4 py-2 rounded-md cursor-pointer"
      >
        <MdCancel className="text-3xl text-red-700 hover:text-green-400 " />
      </button>
    </form>
  );
};

export default EditModal;
