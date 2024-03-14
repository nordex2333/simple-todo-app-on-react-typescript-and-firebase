import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { TodoList } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import useAuth from './hooks/useAuth';

function App() {
  const isAuthenticated = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/todo-list" /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo-list" element={isAuthenticated ? <TodoList /> : <Navigate to="/login" />} />
        <Route path="/todo/:todoId" element={isAuthenticated ? <TodoItem /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;