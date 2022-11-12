import { useState, useEffect } from "react";

const [tasks, setTasks] = useState([]);

useEffect(() => {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  };
  getTasks();
}, []);

 const fetchTasks = async () => {
    const res = await fetch("http://localhost:8000/");
    const data = await res.json();
    return data;
  };