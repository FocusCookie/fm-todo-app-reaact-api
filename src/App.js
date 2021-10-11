import "./styles/app.css";
import { AddTaskBar } from "./components/AddTaskBar/AddTaskBar";
import { Tasklist } from "./components/Tasklist/Tasklist";
import { Overview } from "./components/Overview/Overview";
import { FilterBar } from "./components/FilterBar/FilterBar";
import moonIconPath from "./images/icon-moon.svg";
import sunIconPath from "./images/icon-sun.svg";
import { useEffect, useState } from "react";

import * as api from "./services/api.service";

let devTasks = [
  {
    completed: false,
    _id: "1",
    description: "reading book",
    owner: "615a9d50334cdc00174ebe23",
    createdAt: "2021-10-04T06:23:08.857Z",
    updatedAt: "2021-10-04T06:23:08.857Z",
    __v: 0,
  },
  {
    completed: false,
    _id: "2",
    description: "buy milk",
    owner: "615a9d50334cdc00174ebe23",
    createdAt: "2021-10-04T06:23:08.857Z",
    updatedAt: "2021-10-04T06:23:08.857Z",
    __v: 0,
  },
  {
    completed: false,
    _id: "3",
    description: "clean house",
    owner: "615a9d50334cdc00174ebe23",
    createdAt: "2021-10-04T06:23:08.857Z",
    updatedAt: "2021-10-04T06:23:08.857Z",
    __v: 0,
  },
  {
    completed: true,
    _id: "4",
    description: "do the tasks",
    owner: "615a9d50334cdc00174ebe23",
    createdAt: "2021-10-04T06:23:08.857Z",
    updatedAt: "2021-10-04T06:23:08.857Z",
    __v: 0,
  },
];

function App() {
  //TODO: refactor into [darkMode, setDarkMode]
  const [state, setValue] = useState({ darkMode: false });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      api.login("test", "1234567").then(() => {
        api.getTasks().then((res) => setTasks(res.data));
      });
    };

    fetchData();
  }, []);

  return (
    <div
      className={`App bg-picture ${
        state.darkMode ? "bg-picture-dark" : "bg-picture-light"
      } ${state.darkMode ? "dark-theme" : ""}`}
    >
      <div className="content-wrapper">
        <header className="App-header">
          <h1 className="text--title">TODO</h1>
          <button
            className="theme-btn"
            onClick={() => {
              setValue({ darkMode: !state.darkMode });
            }}
          >
            <img
              className="theme-icon"
              src={state.darkMode ? sunIconPath : moonIconPath}
              alt={
                state.darkMode
                  ? "Sun Icon - Dark Mode is enabled"
                  : "Moon Icon - Light Mode is enabled"
              }
            />
          </button>
        </header>

        <section className="card addTaskBar">
          <AddTaskBar onAddTask={(e) => console.log(e)} />
        </section>

        <section className="card">
          <Tasklist
            tasks={tasks}
            loading={false}
            onCompleteTask={(e) => {
              console.log("complete ", e);
            }}
            onDeleteTask={(e) => {
              console.log("delete ", e);
            }}
            onSaveTask={(id, description) => {
              console.log("save ", id, description);
            }}
          />
          <div className="tasks-overview">
            <Overview
              tasksLeft={5}
              activeFilter={"all"}
              onSetFilter={(filter) => console.log("filter set to ", filter)}
              onClearCompleted={(id) => console.log("clear completed tasks")}
            />{" "}
          </div>
        </section>

        <section className="app-filterbar card">
          <FilterBar
            activeFilter={"all"}
            onSetFilter={(filter) => console.log("filter set to ", filter)}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
