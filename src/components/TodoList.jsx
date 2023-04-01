import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../redux/todoSlice";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import EditModal from "./EditModal";
import { MdDoneAll } from "react-icons/md";

const TodoList = ({ todos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [checked, setChecked] = useState(false);
  const [currentTodo, setCurrentTodo] = useState([]);
  const dispatch = useDispatch();

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const handleCompletedClick = (todo) => {
    if (todo.completed === false) {
      setChecked(true);
    } else {
      setChecked(false);
    }

    dispatch(updateTodo({ ...todo, completed: checked }));
  };

  return (
    <>
      {todos.length === 0 ? (
        <h1 className="my-10 text-3xl text-center">No Active Todos</h1>
      ) : isEditing ? (
        <EditModal
          todo={currentTodo}
          setEditing={setIsEditing}
          setCurrentTodo={setCurrentTodo}
        />
      ) : (
        todos?.map((todo, index) => (
          <ul className="flex items-center justify-between my-5 " key={todo.id}>
            <div
              className={`flex justify-between w-full p-4 italic border-2 ${
                todo.completed ? "bg-red-200 line-through" : ""
              }  `}
            >
              <span className={`text-xl font-semibold flex break-all `}>
                {todo.title}
              </span>
              <div className="flex items-center">
                <button className="" onClick={() => handleCompletedClick(todo)}>
                  <MdDoneAll className="text-xl text-green-700 hover:text-green-400 " />
                </button>
                <button
                  className="ml-5 text-red-500"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <AiOutlineDelete className="text-xl text-red-700 hover:text-red-400" />
                </button>
                <button
                  className="ml-5 text-blue-400"
                  onClick={() => handleEditTodo(todo)}
                >
                  <AiOutlineEdit className="text-xl text-gray-700 hover:text-gray-400" />
                </button>
              </div>
            </div>
          </ul>
        ))
      )}
    </>
  );
};

export default TodoList;
