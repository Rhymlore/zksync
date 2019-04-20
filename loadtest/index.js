var args = process.argv.slice(2)
let nClients = args[0] || 2
let tps = args[1] || 1000

console.log(`Usage: yarn test -- [nClients] [TPS]`)
console.log(`Starting loadtest for ${nClients} with ${tps} TPS`)

const Franklin = require('./franklin.js')
const franklin = new Franklin(process.env.API_SERVER)

class Client {

    constructor(id) {
        this.id = id
        console.log(`creating client #${this.id}`)
    }

    async prepare() {
        // create deterministic wallet by id from seed
        // if franklin not exists
            // if wallet empty
                // transfer funds from source account
                // wait for receipt
            // deposit funds into franklin
            // wait for receipt
    }

    async send() {
        let account = await franklin.getAccount(this.id);
        console.log(`client #${this.id}: tx `, account)
        return 5
    }
}

let clients = []

async function test() {

    console.log('creating clients...')
    for (let i=0; i<nClients; i++) {
        clients.push(new Client(i))
    }

    console.log('preparing clients...')
    let promises = []
    for (let i=0; i<nClients; i++) {
        promises.push( clients[i].prepare() )
    }

    console.log('waiting until the clients are ready...')
    await Promise.all(promises)

    console.log('starting the test...')
    while(true) {
        var nextTick = new Date(new Date().getTime() + 1000);
        for (let i=0; i<tps; i++) {
            let client = Math.floor(Math.random() * nClients);
            clients[client].send()
        }
        console.log('-')
        while(nextTick > new Date()) {
            await new Promise(resolve => setTimeout(resolve, 1))
        }
    }
}

test()
