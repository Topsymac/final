import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todosActions } from "../utility/Notesdata";


const Note = ({ setInput, myRef, setEditTodo }) => {

  const [filteredTodos, setFilteredTodos] = useState([])
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const handleDelete = ({ id }) => {
    const deletingTodo = todos.filter((todo) => todo.id !== id);
    dispatch(todosActions.todoDeleted([...deletingTodo]));
  };

  const handleEdit = ({ id }) => {
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);

    const editingTodo = todos.filter((todo) => todo.id !== id);
    dispatch(todosActions.todoEditing([...editingTodo]));
    setInput(findTodo.title.trim());
    myRef.current.focus();
   
  };
  const handleDone = ({ id }) => {
    const editedTodo = todos.map((todo) => {
      if(todo.id === id){
        return{...todo, isDone: !todo.isDone}
      }
      return todo
    });

    dispatch(todosActions.todoEdited([...editedTodo]))
  }
  const handleFilterDone = () => {
    setFilteredTodos(todos.filter((todo) => todo.isDone === true));
  }

  const handleFilterUndone = () => {
    setFilteredTodos(todos.filter((todo) => todo.isDone === false));
  }

  const handleCancelFilter = () => {
    setFilteredTodos([]);
  }


  return (
    <div className="d-grid gap-3">
      <div className="d-grid gap-2 d-md-block">
        <button onClick={handleFilterDone} className="btn btn-sm me-3 d-inline btn-primary">Filter </button>
        <button onClick={handleFilterUndone} className="btn btn-sm me-3 d-inline btn-info">Filter undo</button>
        <button onClick={handleCancelFilter} className="btn btn-sm d-inline btn-light">Cancel Filter</button>
      </div>
      { filteredTodos.length === 0 ? todos.map((todo) => (
        <div key={todo.id} className="p-2 bg-light border ">
          <p className={todo.isDone ? "text-decoration-line-through d-inline pt-3 ms-5 float-start" : "d-inline pt-3 ms-5 float-start"}>{todo.title}</p>
          <button
            className="btn btn-sm  mt-2 btn-danger float-end me-5"
            onClick={() => handleDelete(todo)}
          >
            DELETE
          </button>
          <button
            className="btn btn-sm mt-2 btn-secondary float-end me-2"
            onClick={() => handleEdit(todo)}
          >
            EDIT
          </button>
          <button
            className="btn btn-sm mt-2 btn-success float-end me-2"
            onClick={() => handleDone(todo)}
          >
            DONE
          </button>
        </div>
      )) : filteredTodos.map((todo) => (
        <div key={todo.id} className="p-2 bg-light border ">
          <p className={todo.isDone ? "text-decoration-line-through d-inline pt-3 ms-5 float-start" : "d-inline pt-3 ms-5 float-start"}>{todo.title}</p>
          <button
            className="btn btn-sm  mt-2 btn-danger float-end me-5"
            onClick={() => handleDelete(todo)}
          >
            DELETE
          </button>
          <button
            className="btn btn-sm mt-2 btn-warning float-end me-2"
            onClick={() => handleEdit(todo)}
          >
            EDIT
          </button>
          <button
            className="btn btn-sm mt-2 btn-success float-end me-2"
            onClick={() => handleDone(todo)}
          >
            DONE
          </button>
        </div>
      )) }
    </div>
  )
}

export default Note