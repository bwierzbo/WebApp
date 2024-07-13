import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
//import { addComment, deleteComment } from "@/app/_actions/actions";
import React from "react";
import { Schema } from "@/../amplify/data/resource";
import TodoList from "@/components/TodoList";
import { Amplify } from 'aws-amplify';


const Todo = async ({ params }: { params: { id: string } }) => {
    if (!params.id) return null;


    const isSignedIn = await isAuthenticated();
        const fetchTodos = async () => {
          const { data: todo, errors } = await cookieBasedClient.models.Post.list({
            selectionSet: ["title", "id"],
            authMode: "apiKey",
          });
          
      
          if (!errors) {
            return todo;
          }
        };
      
};



export default TodoList;