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
    getStarship(name: String): Starship
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

const root = {
  getStarship: ({ name }) => {
    return starship
  },
  getStarships: () => {
    return [starship]
  }
}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(schema),
  rootValue: root,
  graphiql: true
}))

app.listen(4000)
