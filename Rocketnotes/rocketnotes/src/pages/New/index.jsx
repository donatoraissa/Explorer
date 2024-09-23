import { Container, Form } from "./styles";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { Header } from "../../components/Header"
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { api } from "../../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink])
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(
      link => link !== deleted
    ));
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(
      tag => tag !== deleted
    ));
  }

  async function handleNewNote() {
    if(!title) {
      return alert("Adicione um título a sua nota.")
    }

    if(newLink) {
      return alert("Você não adicionou o link que digitou. Apague o conteúdo digitado ou clique no botão de mais para adicioná-lo antes de prosseguir.")
    }

    if(newTag) {
      return alert("Você não adicionou a tag que digitou. Apague o conteúdo digitado ou clique no botão de mais para adicioná-lo antes de prosseguir.")
    }

    if(title && tags.length && links.length) {
      await api.post("/notes", {
        title,
        description,
        tags,
        links
      });
  
      alert("Nota cadastrada com sucesso!");
      navigate(-1);
    } else {
      alert("Não foi possível cadastrar a nota! Adicione pelo menos um link e um marcador!");
    }
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText
              title="voltar"
              onClick={handleBack}
            />
          </header>

          <Input
            placeholder='Título'
            onChange={e => setTitle(e.target.value)}
          />
          <TextArea
            placeholder='Observações'
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem
              isNew="true"
              placeholder='Novo link'
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>
            
          <Section title="Marcadores">
            <div className='tags'>
              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }

              <NoteItem
                isNew="true"
                placeholder='Nova tag'
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button
            title='Salvar'
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  );
}