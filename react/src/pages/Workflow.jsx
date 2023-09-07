import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Workflows() {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getWorkflows();
  }, [])

  const onDeleteClick = workflow => {
    if (!window.confirm("Tem certeza que deseja deletar este workflow?")) {
      return
    }
    axiosClient.delete(`/workflows/${workflow.id}`)
      .then(() => {
        setNotification('Workflow deletado com sucesso')
        getWorkflows()
      })
  }

  const getWorkflows = () => {
    setLoading(true)
    axiosClient.get('/workflows')
      .then(({ data }) => {
        setLoading(false)
        setWorkflows(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Workflows</h1>
        <Link className="btn-add" to="/workflows/new">Adicionar</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Setor</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Carregando...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {workflows.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.setor}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/workflows/' + u.id}>Editar</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Deletar</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}