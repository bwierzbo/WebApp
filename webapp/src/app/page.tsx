import { cookieBasedClient } from "@/utils/amplify-utils";
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

export default async function Home() {
    const { data: posts, errors } = await cookieBasedClient.models.Post.list({
      selectionSet: ["title", "id"],
      authMode: "apiKey",
    });

    if (!errors) {
      return posts;
    }



  console.log("posts", posts)


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-1/2 m-auto">
      <h1 className="text-2xl pb-10"> List of all Titles</h1>
      {posts?.map(async (post, idx) => (
        <div key={idx}>
          <div>{post.title}</div>
        </div>
      ))}
    </main>
  );
};
