const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { json } = require("express/lib/response");




//ROUTE 1: get all the notes using '/notes/fetchuser' ..... login req



router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);

})





//ROUTE 2: add new notes using '/notes/addnote' .....login req



router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {

    try {

        //if there is error.. send bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });// to show all errors
        }

        const { title, description, tags } = req.body;
        const note = new Notes({
            user: req.user.id, title, description, tags
        })
        const savednote = await note.save()
        res.json(savednote);

    } catch (error) {
        console.error(error.message)
        res.status(500).send('some error occur')
    }


})





//ROUTE 3: update existing notes using '/notes/updatenote' .....login req



router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tags } = req.body;
    try {

       
        // create new note
        const newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tags) { newnote.tags = tags };

        //find note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
        res.json("updated successfully!!")
    } catch (error) {
        console.error(error.message)
        res.status(500).send('some error occur')
    }
})




//ROUTE 3: delete an existing notes using '/notes/deletenote' .....login req



router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    try {
        const { title, description, tags } = req.body;
        //find note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        // allow deletion only if user owns this note
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("chala ja");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "success": "note has been deleted", note: note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('some error occur')
    }
})




module.exports = router