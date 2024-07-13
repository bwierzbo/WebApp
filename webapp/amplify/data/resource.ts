import { a, defineData, type ClientSchema } from '@aws-amplify/backend';


// The "owner" of a Todo record is only allowed to create, read, and update it.
// The "owner" of a Todo record is denied to delete it.
const schema = a.schema({
    Todo: a.model({
        content: a.string(),
        isDone: a.boolean(),
    }).authorization(allow => [allow.owner().to(['read', 'delete'])]),
    Post: a.model({
        title: a.string().required(),
        id: a.string(),
        isDone: a.boolean(),
        
      }).authorization(allow => [allow.owner().to(['read', 'delete'])]),

    Comment: a.model({

        content: a.string().required(),

      }).authorization(allow => [allow.owner().to(['read', 'delete'])]),

  });

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});