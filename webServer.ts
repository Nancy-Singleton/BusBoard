import {busesFromPostcode} from "./functions/getBusInfoFunctions";

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
    res.send('Hello World!')
})

app.get('/departureBoards', (req: any, res: { send: (arg0: string) => void }) => {
    const postcode = req.query.postcode;
    // const busList = await busesFromPostcode(postcode,5);
    res.send(postcode)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})