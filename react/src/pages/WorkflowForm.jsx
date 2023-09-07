import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Workflows() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [workflow, setWorkflow] = useState({
    id: null,
    name: '',
    setor: '',
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/workflows/${id}`)
        .then(({data}) => {
          setLoading(false)
          setWorkflow(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [id])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (workflow.id) {
      axiosClient.put(`/workflows/${workflow.id}`, workflow)
        .then(() => {
          setNotification('Workflow atualizado com sucesso')
          navigate('/workflows')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/workflows', workflow)
        .then(() => {
          setNotification('Workflow criado com sucesso')
          navigate('/workflows')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {workflow.id && <h1>Atualizar Workflow: {workflow.name}</h1>}
      {!workflow.id && <h1>Novo Workflow</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Carregando...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={workflow.name} onChange={ev => setWorkflow({...workflow, name: ev.target.value})} placeholder="Nome"/>
            <input value={workflow.setor} onChange={ev => setWorkflow({...workflow, setor: ev.target.value})} placeholder="Setor"/>
            <button className="btn">Salvar</button>
          </form>
        )}
      </div>
    </>
  )
}