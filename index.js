import Reader from 'fantasy-readers'
export  const sparql = Task => {
    const ReaderTask = Reader.ReaderT(Task)
    return {
        ReaderTask,
        query: q => ReaderTask.ask.chain(env => {
            const fetch = (a) => new Task((reject, resolve) => env.fetch(a).then(resolve, reject) )
            return ReaderTask.lift(env.fetch({ uri: env.queryEndpoint, qs: {query: q}}))
        }),
        update: u => ReaderTask.ask.chain(env => {
            const post = futurizeP(env.post)
            return ReaderTask.lift(post({ uri: env.updateEndpoint, body: u}))
        }),
        parseJSON: json => ReaderTask.lift(new Task((reject, resolve)=>{
            try {
                const parsed = JSON.parse(json)
                resolve(parsed)
            } catch (e) {
                reject(e)
            }
        }))

    }
}

export const resultBindings = data => data.results.bindings

