import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Clients = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const clientList = localStorage.getItem('clients');
    if (!!clientList) {
      setClients(JSON.parse(clientList));
    }
  }, []);
  return (<div className="clients">
    <ul>
      {clients.map(client => <li key={client.id}>{client.name}</li>)}
    </ul>
  </div>);
};

export default Clients;