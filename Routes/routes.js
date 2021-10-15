//declares the path
const path = require('path');
//declares access to other files
const route = require('express').Router();
//allows use of file system
const fs = require('fs');

//API Routes
//reads db.jsonfile and displays the notes data
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

//new note created after saving note
route.post('/api/notes', (req,res) => {
    //reads through db.json and pushes object data into an array
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) =>{
        if(err){
            console.error(err);
        }
        else{
            let notes = JSON.parse(data);

            let notesArray = [];

            notes.push(req.body);
            //parses through object data. obtains title text and an id and pushes it into notesArray
            for(var i = 0; i < notes.length; i++){
                let newNote = {
                    title: notes[i].title,
                    text: notes[i].text,
                    id: i
                };
                notesArray.push(newNote);
            }
            //writes new db.json file of updated notes object. Includes new note now
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

//deletes notes when clicking delete button
route.delete("/api/notes/:id", (req,res) => {
    //obtains the id of the note that user wants deleted
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
            //writes new db.json file that no longer includes the deleted note
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
//displays notes.html on the /notes route
route.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
  
//any other routes will end up displaying index.html
route.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
//exports Router() to use on other files
module.exports = route;
