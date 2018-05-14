const { buildSchema, graphql } = require('graphql')

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

graphql(
  buildSchema(schema), 
  `query { getStarship { id name costInCredits manufacturer } }`, 
  root
).then(result => {
  console.log(result)
})
