import { Container, Links, Content } from './styles';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Tag } from '../../components/Tag';
import { ButtonText } from '../../components/ButtonText';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export function Details() {
  const [noteData, setNoteData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja mesmo excluir a nota?");

    if(confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setNoteData(response.data); 
    }

    fetchNote();
  })
  return(
    <Container>
      <Header />

      {noteData &&
        <main>
          <Content>
            <ButtonText
              title="Excluir nota"
              onClick={handleRemove}
            />
            
            <h1>
              {noteData.title}
            </h1>

            <p>
              {noteData.description}
            </p>

            {noteData.links &&
              <Section title="Links úteis">
                <Links>
                  {noteData.links.map(link => (
                    <li key={String(link.id)}>
                      <a href={link.url} target='_blank' >
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            }
            
            {noteData.tags &&
              <Section title="Marcadores">
                {noteData.tags.map(tag => (
                  <Tag
                    key={String(tag.id)}
                    title={tag.name} />
                ))}
              </Section>
            }

            <Button
              title="Voltar"
              onClick={handleBack}
            />
          </Content>
        </main>
      }

    </Container>
  )
}