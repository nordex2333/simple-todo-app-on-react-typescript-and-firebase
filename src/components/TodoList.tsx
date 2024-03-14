import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

import { db } from '../utils/firebase';
import { TodoItem } from '../types';
import useAuth from '../hooks/useAuth';

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const currentUser = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, "todos"), where("userId", "==", currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: TodoItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as TodoItem);
      });
      setTodos(items);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addTodo = async () => {
    if (!newTodo.trim() || !currentUser) return;
    await addDoc(collection(db, "todos"), {
      title: newTodo,
      completed: false,
      userId: currentUser.uid,
    });
    setNewTodo('');
  };

  const toggleComplete = async (todo: TodoItem) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };

  const startEdit = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = async () => {
    if (editingId) {
      await updateDoc(doc(db, "todos", editingId), { title: editText });
      setEditingId(null);
      setEditText('');
    }
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto px-4">
      <div className="flex justify-between mb-5">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 mr-4 py-2 px-4 border rounded shadow-sm"
        />
        <button onClick={addTodo} className="py-2 px-6 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">
          Add Todo
        </button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center justify-between mb-4 bg-gray-100 p-4 rounded shadow-sm">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo)}
            className="form-checkbox h-5 w-5 text-blue-600 mr-4"
          />
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 mr-4 py-2 px-4 border rounded shadow-sm"
              />
              <button onClick={saveEdit} className="text-sm bg-green-500 text-white p-2 rounded hover:bg-green-600">Save</button>
              <button onClick={cancelEdit} className="ml-2 text-sm bg-gray-500 text-white p-2 rounded hover:bg-gray-600">Cancel</button>
            </>
          ) : (
            <>
              <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`} onDoubleClick={() => startEdit(todo)}>
                {todo.title}
              </span>
              <button onClick={() => startEdit(todo)} className="text-sm p-2 rounded hover:bg-gray-200">
                ✏️
              </button>
              <button onClick={() => deleteTodo(todo.id)} className="ml-2 text-sm p-2 rounded hover:bg-gray-200">
                🗑️
              </button>
              <Link to={`/todo/${todo.id}`} className="ml-2 text-lg">👁️</Link>
            </>
          )}
        </div>
      ))}
    </div>
  );
};