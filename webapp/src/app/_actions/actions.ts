"use server";

import { cookieBasedClient } from "@/utils/amplify-utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from 'aws-amplify/data';


const client = generateClient<Schema>();

export const fetchTodos = async () => {
    const { data: todos, errors } = await cookieBasedClient.models.Todo.list();
    if (!errors) {
      return todos;
    }
    console.error(errors);
    return [];
  };

export async function createPost(formData: FormData) {
    const { data } = await cookieBasedClient.models.Post.create({
      title: formData.get("title")?.toString() || "",
    });
    console.log("create post data", data);
    redirect("/");
  }