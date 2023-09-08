import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider.jsx';
import axiosClient from './axios-client.js';

export function Editor() {
  const [editorReady, setEditorReady] = useState(false);
  const { setNotification } = useStateContext();

  const [errors] = useState(null)
  const [loading, setLoading] = useState(false)

  const { id } = useParams();
  const [data, setData] = useState({
    id: null,
    name: '',
    setor: '',
    description: '',
    htmltext: '',
  });

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'text-editor__editor',
      },
    },
  });

  const editorContent = useMemo(() => {
    // Verifica se o editor está pronto antes de acessá-lo
    if (editor && editor.commands) {
      editor.commands.setContent(data.htmltext); // Atualiza o conteúdo do editor com os dados locais
    }

    if (editor) {
      setEditorReady(true);
    }
  }, [editor, data]);

  useEffect(() => {
    setLoading(true)
    if (id) {
      if (!data.htmltext) {
        axiosClient
          .get(`/workflows/${id}`)
          .then(({ data }) => {
            console.log(data);
            setData(data);
            setLoading(false)
          })
          .catch(() => {
            // Trate o erro aqui
          });
      }
    }
  }, [id, data.htmltext]);

  const enviarParaServidor = () => {
    if (editorReady) {
      if (editor && editor.commands) {
        axiosClient
          .put(`/workflows/${id}`, { htmltext: editor.getHTML(), name: data.name, setor: data.setor })
          .then(() => {
            setNotification('Texto atualizado com sucesso');
          })
          .catch(() => {
            // Trate o erro aqui
          });
      }
    }
  };

  return (
    <>
      {data.id && <h1>{data.name} - {data.setor}</h1>}
      <h2>{data.description}</h2>
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
          <div className='semoutline'>
            <EditorContent key={editorContent} editor={editor} />
            <button onClick={enviarParaServidor}>Enviar para o Servidor</button>
          </div>
        )}
      </div>
    </>
  );
}
