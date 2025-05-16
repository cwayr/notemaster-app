"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource"; 
import "./../app/app.css"; 
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator, useAuthenticator, Button, Heading } from '@aws-amplify/ui-react';

Amplify.configure(outputs); 

const client = generateClient<Schema>(); 

const AppContent = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  async function deleteTodo(id: string) {
    await client.models.Todo.delete({ id });
  }

  return (
    <main>
      <Heading level={1}>My todos</Heading>
      {user && <Heading level={3}>Welcome, {user.signInDetails?.loginId || user.username}!</Heading>}
      
      <Button variation="primary" onClick={createTodo}>+ new</Button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
            {todo.content}
          </li>
        ))}
      </ul>
      <div>
        App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
      <Button variation="link" onClick={signOut}>Sign Out</Button>
    </main>
  );
};

export default function App() {
  return (
    <Authenticator loginMechanisms={['email']} socialProviders={['google', 'facebook']}>
      <AppContent />
    </Authenticator>
  );
}
