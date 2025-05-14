
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";



const Nav = () => {
  return (
    <div className="links">
      <nav className="wrapper">
        <Link to="/" className="nav-link">
          All tasks
        </Link>
        <Link to="/create_task" className="nav-link">
          Create new task
        </Link>
        <Link to="/projects" className="nav-link">
          Projects
        </Link>
        <Link to="/create_project" className="nav-link">
          Create new project
        </Link>
        
      </nav>
    </div>
  );
};

const NewTask = ({ addTask }) =>{
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createNewTask = () => {
    if (name.trim() && description.trim()) {
      addTask(name, description);
      setName("");
      setDescription("");
      alert("Task successfully added");
    } else {
      alert("Enter in both fields");
    }
  };
  return(
    <div className='wrapper-create'>
      <h2>New Task</h2>
      <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="inp"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="des"
      />
      <button className='create-btn' onClick={createNewTask}>Add</button>
      <div className='create-desk'></div>
    </div>
  )
}

const Home = ({ tasks, deleteTask }) => {
  
  const [name, setName] = useState("");
  const [SearchTasks, setSearchTasks] = useState(tasks);
  useEffect(() => {
    setSearchTasks(tasks);
  }, [tasks]);
  

  const Search = () => {
    const filtered = tasks.filter((task) => {
      return (
        (name === "" || task.name.toLowerCase().includes(name.toLowerCase()))
      );
    });
    setSearchTasks(filtered);
    setName("");
  };

  

  return (
    <div className="home-container">
      <section className='sec1'>
        <h2>Tasks to do</h2>
        <div className='search_wrap'>
          <div className='wrap'>
            <input
                type="text"
                placeholder="Search task"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="inp"
              />
              <button className="btn" id="all" onClick={Search}>
                Search
              </button>
          </div>
      </div>
      </section>
      <section className="sec2">
        <div className="second-content">
        {SearchTasks.map((task) => (
          <div key={task.id} className="task-card">

            <div className="task_wrap">

              <h2>{task.id}. {task.name}</h2>
              
              <p>{task.description}</p>
              
              <p className="task-date">Дата: {task.date}</p>
              <button className='delete' onClick={() => deleteTask(task.id)}></button>
            </div>
            
            
            
          </div>
        ))}
        </div>
      </section>
      
    </div>
  );
};



function App() {
  const [tasks, setTasks] = useState([
  { id: 1, name: "Homework Friday", description: "Complete math homework", date: new Date().toLocaleDateString() },
  { id: 2, name: "Buy Groceries", description: "Get milk, eggs, bread", date: new Date().toLocaleDateString() },
  { id: 3, name: "Go to the gym", description: "Morning workout session", date: new Date().toLocaleDateString() },
  { id: 4, name: "Read a book", description: "Read 20 pages of 'The Great Gatsby'", date: new Date().toLocaleDateString() },
  { id: 5, name: "Clean the house", description: "Vacuum and mop the floors", date: new Date().toLocaleDateString() },
  { id: 6, name: "Study for exam", description: "Study for the history exam on Monday", date: new Date().toLocaleDateString() }
]);
  const addTask = (name, description) => {
    const newTask = {
      id: tasks.length + 1,
      name,
      description,
      date: new Date().toLocaleDateString()
    };
    setTasks([...tasks, newTask]);
  };
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/create_task" element={<NewTask addTask={addTask} />}></Route>
          <Route path="/create_project" element={2}></Route>
          <Route path="/" element={<Home tasks={tasks} deleteTask={deleteTask}/>}></Route>
          <Route path="/projects" element={4}></Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
