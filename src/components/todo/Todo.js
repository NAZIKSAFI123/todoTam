import React, { useState, useEffect } from "react";
import "./Todo.scss";
import axios from "axios";
import Tododone from "../tododone.js"
import Navbar from "../layout/navBar.js"

const Todo = () => {
    const [todo, setTodo] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [filteredTodo, setFilteredTodo] = useState([]);


    useEffect(() => {   

        getTasksAll();

    }, []); 
    
    const getTasksAll = () => {
        axios.get("http://localhost:9000/todos").then((res) => {
            const nonDeletedTasks = res.data.filter((task) => task.isDeleted === false);
            setTodo(nonDeletedTasks);

        });
    };

    
    const FormSubmit = (event) => {
        event.preventDefault();
        const isoDateString = new Date().toISOString();
        const date = new Date(isoDateString);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[date.getDay()] 
        let hour = date.getHours(); 
        const ampm = hour >= 12 ? 'pm' : 'am';
        hour = hour % 12 || 12;
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        const newTask = {
            id: "",
            title: event.target.task.value,
            isDone: false,
            createdAt: `${dayOfWeek} at ${hour}:${minutes}${ampm}`,
            isDeleted: false,
        };
        setTodo((prevTodo) => [...prevTodo, newTask]);

        axios.post("http://localhost:9000/todos", newTask).then(() => {
            event.target.task.value = "";
        });
    };

    const handleCheckboxChange = (taskId) => {
        const updatedTodo = todo.map((task) =>
            task.id === taskId ? { ...task, isDone: true } : task
        );
        setTodo(updatedTodo);
        const taskUpdated = updatedTodo.find((task) => task.id === taskId);
        axios.put(`http://localhost:9000/todos/${taskId}`, taskUpdated)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDeleteTask = (taskId) => {

        axios.delete(`http://localhost:9000/todos/${taskId}`)
            .then((res) => {

                setTodo((prevTodo) => prevTodo.filter((task) => task.id !== taskId));
            })
            .catch((error) => {
                console.error("task no supprimer", error);
            });
    };



    const handleDeleteTaskSoft = (taskId) => {
        console.log(taskId);
        axios.patch(`http://localhost:9000/todos/${taskId}`, { isDeleted: true })
            .then((res) => {
                if (res.status === 200) {
                    setTodo((prevTodo) =>
                        prevTodo.filter((task) => task.id !== taskId && !task.isDeleted)
                    );
                } else {
                    console.error("Erreur lors de la suppression douce de la tâche");
                }
            })
            .catch((error) => {
                console.error("task no supprimer", error);
            });
    };
    useEffect(() => {
        handleFilterChange(filterType, todo);
    }, [filterType, todo]);



    const handleFilterChange = (filterType) => {
        setFilterType(filterType);
        let filteredTasks;

        if (filterType === "all") {
            filteredTasks = todo;
        } else if (filterType === "notDone") {
            filteredTasks = todo.filter((task) => !task.isDone);
        } else if (filterType === "done") {
            filteredTasks = todo.filter((task) => task.isDone);
        }

        setFilteredTodo(filteredTasks);
        console.log(filteredTodo)
    };


    useEffect(() => {
        console.log(filteredTodo);
    }, [filteredTodo]);


    const handleCancelClick = () => {

        document.getElementById("task").value = "";
    };
    return (
        <div className="container">
            <Navbar
                handleFilterChange={handleFilterChange}
            />
            <div className="form-container">
                <div className="scroldiv">


                    <Tododone
                        todo={filteredTodo}
                        handleCheckboxChange={handleCheckboxChange}
                        handleDeleteTask={handleDeleteTaskSoft}
                    />

                </div>

                <div className="form">
                    <form onSubmit={FormSubmit}>
                        <input
                            className="text-input"
                            type="text"
                            id="task"
                            name="task"
                            placeholder="Add task"
                        />
                        <button type="submit" className="save-button">
                            Save
                        </button>
                        <button type="button" className="cancel-button" onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Todo;
