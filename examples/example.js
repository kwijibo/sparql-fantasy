import * as SF from '../index.js'
import Task from 'data.task'
const cannedContent = require('./books.sparql.json')
const cannedResponse = { body: JSON.stringify(cannedContent), statusCode: 200 }
const env = {
    queryEndpoint: 'test',
    updateEndpoint: 'test',
    fetch: (req)=> Promise.resolve(cannedResponse),
    post: (req) => Promise.resolve({statusCode: 201, body: 'applied update: '+JSON.stringify(req)})
}

const Sparql = SF.sparql(Task)
const x = Sparql.query(`SELECT ?s ?name 
    WHERE { 
        ?s a foaf:Person; foaf:name ?name .  
}`)
.map(x => x.body)
.chain(Sparql.parseJSON)
.map(SF.resultBindings)
.run(env)
.fork(
      console.error
    , console.log
)

console.log(x)
