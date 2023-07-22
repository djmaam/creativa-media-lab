import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Call from '../components/Call';


const Wrapper = styled.div`
  margin: 5rem auto 10rem;
  max-width: 35rem;
  min-height: 25rem;
  padding: 0 1.5rem;
  text-align: center;
`;

const FormWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FieldWrapper = styled.p`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-right: ${props => (props.last ? '0' : '0.5rem')};
  width: 100%;
`;
const Label = styled.label`
  color: #000;
  margin-bottom: 0.75rem;
`;
const Input = styled.input`
  background-color: white;
  background-clip: padding-box;
  border: solid 1px #37005b;
  border-radius: 6px;
  box-shadow: none;
  padding: 0.5rem;
  width: 100%;
  @media (min-width: 768px) {
    max-width: 275px;
  }
  &:focus {
    outline: none;
    border-color: #b45edd;
  }

`;
const TextArea = styled.textarea`
  background-color: white;
  background-clip: padding-box;
  border: solid 1px #37005b;
  border-radius: 6px;
  box-shadow: none;
  max-width: 100%;
  min-width: 100%;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #b45edd;
  }
`;

const Button = styled.input`
  background: #37005b;
  background-clip: padding-box;
  border: solid 2px;
  border-radius: 0.25rem;
  color: #fff;
  margin: 0 auto;
  padding: ${props => (props.returnHome ? '0.5rem' : '0.5rem 3rem')};
  text-align: center;
  transition: padding 0.3s ease-in-out;
  &:hover {
    background: #b45edd;
    color: white;
    cursor: pointer;
    padding: ${props => (props.returnHome ? '0.5rem 1rem' : '0.5rem 3.5rem')};
  }
`;

const Contact = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter;
  const { html } = data.markdownRemark;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    const request = new Request(
      'https://getform.io/f/75dbc99f-f5bd-49c2-8c25-9d6eac136ba3'
    );
    const data = {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    };

    fetch(request, data)
      .then(response => {
        window.location.replace('https://creativamedialab.ar/');
      })
      .catch(e => console.error(e));
  };
  return (
    <Layout bodyClass="page-default-single">
      <div className="container pb-6 pt-6 pt-md-10 pb-md-10">
        <div className="row justify-content-start">
          <div className="col-12 col-md-8">
            <h1 className="title">{title}</h1>
            <Call showButton={false} />
            <div className="content mt-4" dangerouslySetInnerHTML={{ __html: html }} />
            <Wrapper>
              <form onSubmit={handleSubmit} autoComplete="on">
                <FormWrapper>
                  <FieldWrapper>
                    <Label>Nombre</Label>
                    <Input
                      type="text"
                      name="name"
                      required
                      onChange={e => setName(e.target.value)}
                      value={name}
                    />
                  </FieldWrapper>
                  <FieldWrapper last>
                    <Label>Correo Electrónico</Label>
                    <Input
                      type="email"
                      name="_replyto"
                      required
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                    />
                  </FieldWrapper>
                </FormWrapper>
                <FieldWrapper>
                  <Label>Tu mensaje</Label>
                  <TextArea
                    name="message"
                    required
                    wrap="hard"
                    cols="40"
                    rows="10"
                    spellcheck
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                  />
                </FieldWrapper>

                <Button type="submit" value="Enviar" />
              </form>
            </Wrapper>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        path
      }
      fields {
        slug
      }
      html
    }
  }
`;

export default Contact;
