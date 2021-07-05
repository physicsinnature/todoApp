import React, { useState , useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('todo-list');
    if(data) {
      setTodos(JSON.parse(data));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem('todo-list',JSON.stringify(todos));
  });

  const addTodo = todo => {
    if (!todo.text ) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);


  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;