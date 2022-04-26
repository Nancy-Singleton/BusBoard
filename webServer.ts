const express = require('express')
const app = express()
const port = 3000

interface Fruit {
    type: string;
}

app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
    res.send('Hello World!')
})

app.get('/fruit', (req: any, res: { send: (arg0: string) => void }) => {
    const fruit = req.query as Fruit;
    res.send(fruit.type)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})