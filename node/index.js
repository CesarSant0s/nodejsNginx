const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const arrayNomes = ['joao', 'cesar', 'maria', 'joana', 'carla', 'eduardo', 'millena', 'vinicius'];
function sqlQuery() {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO people(name) values('${arrayNomes[Math.floor(Math.random() * arrayNomes.length)]}')`)
        connection.query('SELECT * FROM people', function (error, results) {
            if (error) {
                //Rejeita a promessa
                reject(error)
            }
            //Conclui a promessa
            resolve(results)
        })
    })
}

app.get('/', (req, res) => {
    sqlQuery()
        .then(queryResults => {
            people = JSON.parse(JSON.stringify(queryResults))
            return people

        }).then((results) => {
            let nomes = ''
            results.forEach(element => {
                nomes += (`<li>Nome: ${element.name} Id: ${element.id}\n</li>`)
            });
            return nomes
        })
        .then((results) => {
            res.send(`<h1>Full Cycle Rocks!</h1>
            <ul>${results}</ul>
        `)
        })


})

app.listen(port, () => {
})