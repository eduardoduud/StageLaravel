import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function Workflows() {
  let {id} = useParams();
  const [workflow, setWorkflow] = useState({
    id: null,
    name: '',
    setor: '',
    description: '',
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

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


  return (
    <>
      {workflow.id && <h1>{workflow.name} - {workflow.setor}</h1>}
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
          <h2>Descrição: {workflow.description}</h2>
        )}
      </div>
    </>
  )
}