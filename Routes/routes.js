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
            let notes = JSON.parse(data);

            let notesArray = [];

            notes.push(req.body);
            
            for(var i = 0; i < notes.length; i++){
                let newNote = {
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

    //Reads db.json then parses through the data and adds it to an array.
    fs.readFile(path.join(__dirname, "../db/db.json"), (err,data) => {
        if(err){
            console.err(err);
        }
        else{
            let notes = JSON.parse(data);
            let notesArray = [];

            //if each iteration doesn't equal the id number choses, it pushes it into an array. Therefor deleting the chosen id
            for(var i = 0; i < notes.length; i++){
                if(i !== id){
                    let newNote = {
                        title: notes[i].title,
                        text: notes[i].text,
                        id: notesArray.length   //Keeps Id's consistent when deleting notes
                    };
                    
                    notesArray.push(newNote);   //New array doesn't include deleted note
                }
            }
            console.log(notesArray);

            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray, null, 2), (err) =>{
                if(err){
                    console.error(err);
                }
                else{
                    res.json(req.body);
                }
            })
        }
    })
})


//HTML Routes
route.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    
route.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = route;
