import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useStateContext } from './contexts/ContextProvider.jsx';
import { RxFontBold, RxFontItalic, RxCode, RxUnderline } from 'react-icons/rx'
import { RiStrikethrough } from 'react-icons/ri'
import { BubbleButton } from './components/BubbleButton.jsx';
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
    if (editor) {
      setEditorReady(true);
    }
    // Verifica se o editor está pronto antes de acessá-lo
    if (editor && editor.commands) {
      editor.commands.setContent(data.htmltext); // Atualiza o conteúdo do editor com os dados locais
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
          });
      }
    }
  }, [id, data.htmltext]);

  const handleSave = () => {
    if (editorReady) {
      if (editor && editor.commands) {
        axiosClient
          .put(`/workflows/${id}`, { htmltext: editor.getHTML(), name: data.name, setor: data.setor })
          .then(() => {
            setNotification('Texto atualizado com sucesso');
          })
          .catch(() => {
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
          <div>
            <EditorContent key={editorContent} editor={editor} />
            { editor && (
            <BubbleMenu className='bubble-menu' editor={editor}>
              <BubbleButton>
                <RxFontBold />
              </BubbleButton>
              <BubbleButton>
                <RxFontItalic />
              </BubbleButton>
              <BubbleButton>
                <RiStrikethrough />
              </BubbleButton>
              <BubbleButton>
                <RxUnderline />
              </BubbleButton>
              <BubbleButton>
                <RxCode />
              </BubbleButton>
            </BubbleMenu>
            )}
            <button onClick={handleSave}>Salvar</button>
          </div>
        )}
      </div>
    </>
  );
}
