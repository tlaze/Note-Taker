const path = require('path');
const route = require('express').Router();
const fs = require('fs');

//API Routes
route.get('/api/notes', (req,res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err,data) => {
        if(err){
            console.error(err);
        }
        else{
            res.json(JSON.parse(data));
        }
    });
});

route.post('/api/notes', (req,res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) =>{
        if(err){
            console.error(err);
        }
        else{
            const notes = JSON.parse(data);
            console.log(notes);

            const notesArray = [];

            notes.push(req.body);
            
            for(var i = 0; i < notes.length; i++){
                const newNote = {
                    title: notes[i].title,
                    text: notes[i].text,
                    id: i
                };
                notesArray.push(newNote);
            }
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray, null, 2), (err) => {
                if(err){
                    console.error(err);
                }
                else{
                    res.json(req.body);
                }
            });
        }
    });
});

route.delete("/api/notes/:id", (req,res) => {
    const id = parseInt(req.params.id);
    console.log(id);
})


//HTML Routes
route.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    
route.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = route;
