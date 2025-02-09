import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase.js";
import '../styles/styles.scss'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";


const Home = () => {
  const navigate = useNavigate();
  const [todo, setTodo] =  useState("");
  const [userTodos, setUserTodos] = useState([]);
  
  const todosCollection = collection(db, 'todos');

  useEffect(() => {
    if (!auth.currentUser) return;
    
    const fetchTodos = async () => {
      try {
        const q = query(todosCollection, where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const fetchedTodos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserTodos(fetchedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    
    fetchTodos();
  }, [userTodos])

  const addTodo = async () => {
    if (!todo.trim()) return;
    try {
      await addDoc(todosCollection, {
        text: todo,
        createdAt: new Date(),
        userId: auth.currentUser?.uid || "anonymous",
      })
      setTodo("");
      console.log("Todo added!")
    } catch (error) {
      console.error("Error adding todo: ", error)
    }
  };

  const logout = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  return (
    <>
    <div>
      <div className="welcome-user">
        Hello, {auth.currentUser.displayName || "User"}! 👋
      </div>
      <div className="todo-field">
        <input type="todo-input" placeholder="Your Todo" className="todo-input" value={todo} onChange={(e) => setTodo(e.target.value)}/>
        <button type="button" onClick={addTodo}>Add Todo +</button>
      </div>
      <hr style={{width: "1000px", margin:"30px auto"}}/>
      <div className="todo-field">
        <h3>Your Todos:</h3>
        <ul>
        {userTodos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      </div>
      <div className="signin">
        <button className="signin-with-google-button" onClick={logout}>
            Logout
        </button>
      </div>
    </div>
    </>
  );
};

export default Home;