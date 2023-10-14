import { ApolloServer, gql } from "apollo-server";
import { peopleArray } from "./data.js";

// Definiciones de los datos
const typeDefs = gql`
  type Person {
    id: ID!
    name: String!
    last_name: String
    phone: String
    email: String
    city: String
  }

  type Query {
    allPeople: [Person]!
    person(name: String!): Person
  }
`;

// Indicar de dónde apollo va a sacar los datos
const resolvers = {
  Query: { // Debe hacer match con los type defs
    allPeople: () => peopleArray,
    person: (root, args) => {
      const { name } = args;
      return peopleArray.find(person => person.name === name);
    }
  }
}

// Crear el servidor
const server = new ApolloServer({
  // Mostrar las propiedades explícitamente: typeDefs, resolvers
  typeDefs: typeDefs,
  resolvers: resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
})