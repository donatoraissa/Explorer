import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { FiMail, FiLock, FiUser } from "react-icons/fi";

import { Backgroung, Container, Form } from "./styles";

import { api } from "../../services/api";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function SignUp() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  function handleSignUp() {
    if(!name || !email || !password) {
      return alert("Todos os campos devem ser preenchidos!");
    }

    api.post("/users", {name, email, password})
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      })
      .catch(error => {
        if(error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possível realizar o cadastro!");
        }

      })
  }

  return (
    <Container>
      <Backgroung />

      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder='Nome'
          type='text'
          icon={FiUser}
          onChange={e => setName(e.target.value)} />

        <Input
          placeholder='E-mail'
          type='text'
          icon={FiMail}
          onChange={e => setEmail(e.target.value)} />
        
        <Input
          placeholder='Senha'
          type='password'
          icon={FiLock}
          onChange={e => setPassword(e.target.value)} />

        <Button title='Cadastrar' onClick={handleSignUp}/>

        <Link to='/'>
          Voltar para o login
        </Link>
      </Form>
    </Container>
  )
}