import React, { useState, useEffect } from "react";
import "./tododone.scss";
import axios from "axios";

const Tododone = (props) => {
   
    const {
        todo,
        handleCheckboxChange,
        handleDeleteTask,
    } = props;

    return (

        <>
            {todo && (
                <div>
                    {todo.map((task) => (
                        <div key={task.id} className="div1">
                            <div className="data">
                                <input
                                    className="check-input"
                                    type="checkbox"
                                    checked={task.isDone} 
                                    onChange={() => handleCheckboxChange(task.id)} 
                                />
                                <div className="today">
                                    <h4>{task.title}</h4>
                                    <p>{task.createdAt}</p>
                                </div>
                            </div>
                            <div className="div2">
                                <button onClick={() => handleDeleteTask(task.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 23 26" fill="none">
                                        <path d="M21.8993 2.02173H16.0399L15.5809 1.10865C15.4837 0.913439 15.3339 0.749235 15.1485 0.634506C14.963 0.519777 14.7492 0.459077 14.5311 0.459233H8.95007C8.73249 0.458397 8.51906 0.518871 8.33426 0.633727C8.14945 0.748583 8.00073 0.913176 7.90515 1.10865L7.44617 2.02173H1.58679C1.37959 2.02173 1.18088 2.10404 1.03436 2.25056C0.887852 2.39707 0.805542 2.59578 0.805542 2.80298L0.805542 4.36548C0.805542 4.57268 0.887852 4.7714 1.03436 4.91791C1.18088 5.06442 1.37959 5.14673 1.58679 5.14673H21.8993C22.1065 5.14673 22.3052 5.06442 22.4517 4.91791C22.5982 4.7714 22.6805 4.57268 22.6805 4.36548V2.80298C22.6805 2.59578 22.5982 2.39707 22.4517 2.25056C22.3052 2.10404 22.1065 2.02173 21.8993 2.02173ZM3.4032 23.262C3.44046 23.857 3.70308 24.4155 4.1376 24.8237C4.57212 25.2319 5.14587 25.4592 5.74207 25.4592H17.744C18.3402 25.4592 18.914 25.2319 19.3485 24.8237C19.783 24.4155 20.0456 23.857 20.0829 23.262L21.118 6.70923H2.36804L3.4032 23.262Z" fill="#6B7280" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}




        </>

    );
};

export default Tododone;
