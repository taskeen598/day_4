import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {

  const updateTodo = (id, title, completed) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          id: id,
          title: input,
          completed: completed,
        };
      } else {
        return todo;
      }

    });
    setInput("")
    setTodos(updatedTodos);
    setEditTodo("")
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput(null);
    }
  }, [setInput, editTodo])

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }])
      setInput("");
    } else {
      updateTodo(editTodo.id, editTodo.title, editTodo.completed)
    }
  }
  return (
    <form onSubmit={onFormSubmit}>
      <input type="text" placeholder='Enter a Todo...' className='task-input' value={input} required onChange={onInputChange} />
      <button className='button-add' type='submit'>{editTodo ? "Ok" : "Add"}</button>
    </form>
  )
}

export default Form