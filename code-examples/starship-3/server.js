const { buildSchema, graphql } = require('graphql')
const express = require('express')
const graphqlHTTP = require('express-graphql')

const schema = `
  type Starship {
    id: ID
    name: String
    costInCredits: Int
    manufacturer: [String]
  }

  type Query {
    getStarships: [Starship]
    getStarship (name: String): Starship
  }

  input StarshipInput {
    name: String
    costInCredits: Int
    manufacturer: [String]
  }

  type Mutation {
    createStarship (input: StarshipInput): Starship
  }
`

const starship = {
  id: '1234',
  name: 'Falcon',
  costInCredits: 500,
  manufacturer: [
    'nodeschool',
    'pixelbar'
  ]
}

const starships = [starship]

const root = {
  getStarships: () => {
    return starships
  },
  getStarship: ({ name }) => {
    return starship
  },
  createStarship: ({ input }) => {
    const newStarship = input
    newStarship.id = 'some-new-id'
    starships.push(newStarship)
    return newStarship
  }
}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(schema),
  rootValue: root,
  graphiql: true
}))

app.listen(4000)
