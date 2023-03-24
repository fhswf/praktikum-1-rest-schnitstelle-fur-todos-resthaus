import express, { response } from 'express';

/** Zentrales Objekt für unsere Express-Applikation */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Liste aller ToDos. 
 * Wird später durch Datenbank ersetzt!
 */
let TODOS = [
    {
        "id": 1671056616571,
        "title": "Übung 4 machen",
        "due": "2022-11-12T00:00:00.000Z",
        "status": 0
    },
    {
        "id": 1671087245763,
        "title": "Für die Klausur Webentwicklung lernen",
        "due": "2023-01-14T00:00:00.000Z",
        "status": 2
    },
];


app.get('/', (request, response) => response.redirect('/todos'));


app.get('/todos', (req, res) => {
    res.send(TODOS)
  })

 
app.get('/todos/:id', (req, res) => {  
    const id = parseInt(req.params['id'])  
    for (let i=0; i<TODOS.length; i++) { 
        if (TODOS[i].id === id){
            res.send(TODOS[i])
            break;         
        }
        }       
    res.send(id + " ist nicht vorhanden")    
})


app.post('/todos', (req, res) => {
    const input = req.body;
    if (!input.id) {
        res.status(400).send('Todo muss eine ID haben');
        return;
    }
    for (let i=0; i<TODOS.length; i++) { 
        if (TODOS[i].id === input.id){
            res.status(409).send("Anlegen nicht möglich. ID schon vorhanden");
            return;
        }
    }
    TODOS.push(input);
    res.send(TODOS);
});

app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params['id'])
    const input = req.body;
    for (let i=0; i<TODOS.length; i++) { 
        if (TODOS[i].id === id){
            TODOS[i].title = input.title;
            TODOS[i].due = input.due;
            TODOS[i].status = input.status;
            res.send(id + " wurde erfolgreich geändert") 
        }
        }       
    res.send(id + " ist nicht vorhanden") 
});

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params['id'])      
    for (let i=0; i<TODOS.length; i++) { 
        if (TODOS[i].id === id){
            TODOS.splice(i, 1);
            res.send(id + " wurde erfolgreich gelöscht")        
        }
        }       
    res.send(id + " ist nicht vorhanden") 
})





app.listen(1337, () => {
    console.log('Server is listening to https://dobo91-automatic-chainsaw-q44gw6rgw96c67-1337.preview.app.github.dev/');
}); 

app.listen(1234, () => {
    console.log('Server is listening to https://dobo91-automatic-chainsaw-q44gw6rgw96c67-1337.preview.app.github.dev/');
}); 