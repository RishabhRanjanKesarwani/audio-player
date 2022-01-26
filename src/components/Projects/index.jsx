import Project from "./Project";
import React from "react";
import SelectSearch from "react-select-search";
import { useEffect } from "react";
import { useState } from "react";

const Projects = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [clientName, setclientName] = useState('');

  useEffect(() => {
    const clientList = localStorage.getItem('clients');
    if (!!clientList) {
      setClients(JSON.parse(clientList));
    }
    const projectList = localStorage.getItem('projects');
    if (!!projectList) {
      setProjects(JSON.parse(projectList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const onProjectNameChange = (e) => {
    setProjectName(e.target.value);
  }

  const onClientNameChange = (e) => {
    setclientName(e.target.value);
  }

  const saveClient = () => {
    const newClient = {
      id: clients.length,
      name: clientName,
    };
    const temp = [...clients];
    temp.push(newClient);
    setClients(temp);
    setclientName('');
  }

  const saveProject = () => {
    const newProject = {
      id: projects.length,
      name: projectName,
      time: 0,
      isDeleted: false,
    }
    const temp = [...projects];
    temp.push(newProject);
    setProjects(temp);
    setProjectName('');
  }

  const setNewTime = (id, time) => {
    const temp = [...projects];
    const index = temp.findIndex(proj => proj.id === id);
    if (index >= 0) {
      temp[index].time = time;
    }
    setProjects(temp);
  };

  const deleteProject = (id) => {
    const temp = [...projects];
    const index = temp.findIndex(proj => proj.id === id);
    if (index >= 0) {
      temp[index].isDeleted = true;
    }
    setProjects(temp);
  };

  return (
    <div className="projects">
      <h2>Add project</h2>
      <input type="text" className="projects-input" onChange={onProjectNameChange} value={projectName} placeholder="Enter project name" />
      <SelectSearch options={clients} search placeholder="Select client" />
      <button className="projects-project-save" onClick={saveProject}>Save project</button>
      <h4>Add client (if not already present)</h4>
      <input type="text" className="projects-input-clients" onChange={onClientNameChange} value={clientName} placeholder="Enter client name" />
      <button className="projects-client-save" onClick={saveClient}>Save Client</button>
      <hr />
      <h2>List of projects</h2>
      {projects.map(project => project.isDeleted ? null : (
        <Project project={project} setNewTime={setNewTime} deleteProject={deleteProject} key={project.id} />
      ))}
    </div>
  );
};

export default Projects;