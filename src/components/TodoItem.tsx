import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../utils/firebase';
import { TodoItem as TodoItemType } from '../types';

export const TodoItem = () => {
    const [todo, setTodo] = useState<TodoItemType | null>(null);
    const { todoId } = useParams();
  
    useEffect(() => {
      const fetchTodo = async () => {
        if (typeof todoId === 'undefined') {
          console.error('todoId is undefined');
          return;
        }
    
        const docRef = doc(db, "todos", todoId);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          setTodo({ id: docSnap.id, ...docSnap.data() } as TodoItemType);
        } else {
          console.log("No such document!");
        }
      };
    
      fetchTodo();
    }, [todoId]);
  
    if (!todo) return <div className="text-center mt-5">Loading...</div>;
  
    return (
      <div className="max-w-xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-2">{todo.title}</h3>
        <p className={`text-md ${todo.completed ? 'text-green-500' : 'text-red-500'}`}>
          {todo.completed ? "Completed" : "Not Completed"}
        </p>
        <div className="mt-4">
          <Link to="/" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">
            Go back to the list
          </Link>
        </div>
      </div>
    );
  };
  
  export default TodoItem;