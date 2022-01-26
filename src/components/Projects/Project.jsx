import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const Project = (props) => {
  const [timer, setTimer] = useState(0);
  const {project: {id, name, time}, setNewTime, deleteProject} = props;
  let interval = useRef(null);
  useEffect(() => {
    console.log('I am here', time);
    setTimer(time);
  }, [time]);
  const playProject = () => {
    interval.current = setInterval(() => {
      console.log(timer);
      setTimer(timer + 1);
    }, 1000);
  }
  const stopProject = () => {
    clearInterval(interval.current);
    setNewTime(id, timer);
  }
  return (
    <div className="project-row" key={id}>
          <span style={{marginRight: '20px'}}>{name}</span>
          <span style={{marginRight: '20px'}}>{timer}</span>
          <button onClick={playProject}>Play</button>
          <button onClick={stopProject}>Stop</button>
          <button onClick={() => deleteProject(id)}>Delete</button>
        </div>
  );
};

export default Project;