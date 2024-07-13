"use client";



import { Amplify } from 'aws-amplify';
import { useState, useEffect } from "react";
import { Button, Divider, Flex } from "@aws-amplify/ui-react";

import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import outputs from '../../amplify_outputs.json';


Amplify.configure(outputs);

const client = generateClient<Schema>();



export default function TodoList() {
  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);

  const fetchTodos = async () => {
    const { data: items, errors } = await client.models.Todo.list();
    setTodos(items);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async () => {
    await client.models.Todo.create({
      content: window.prompt("Todo content?"),
      isDone: false,
    });

    fetchTodos();
  }

  return (
    <div>
      <button onClick={createTodo}>Add new todo</button>
      <ul>
        {todos.map(({ id, content }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
    </div>
  );
}