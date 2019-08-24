const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');


// Gets all members
router.get('/', (req,res) => res.json(members));


// Get single member
router.get('/:id', (req,res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if(found){
		res.json(members.filter(member => member.id === parseInt(req.params.id)));
	}else{
		res.status(400).json({ msg: `No Member With ID ${req.params.id}` });
	}
});


// Create Member
router.post('/', (req,res) => {
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email,
		status: 'active'
	}

	if(!newMember.name || !newMember.email){
		res.status(400).json({ msg: "Please include name and email" });
	}

	members.push(newMember);
	//res.json(newMember);     /// redirects to json
	
	// Redirect Page to show Updated Members Information
	 res.redirect('/');
});


// Update Member
router.put('/:id', (req,res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));
	// check to make sure id is found in json file
	if(found){
		const updatedMember = req.body;
		//loop through members...
		members.forEach(member =>{
			//if id is equal to id we are attempting to edit...
			if(member.id === parseInt(req.params.id)){
				// if updated information includes new name, update name : if not, save old name
				member.name = updatedMember.name ? updatedMember.name : member.name;
				// if update information includes new email, update email : if not, save old email
				member.email = updatedMember.email ? updatedMember.email : member.email;

				res.json({ msg: "Member information updated", member });
			}
		});
	}else{
		res.status(400).json({ msg: `No Member With ID ${req.params.id}` });
	}
});

// Delete Member
router.delete('/:id', (req,res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if(found){
		res.json({
		 msg: "Member Deleted", 
		 members:members.filter(member => member.id !== parseInt(req.params.id))
		});
	}else{
		res.status(400).json({ msg: `No Member With ID ${req.params.id}` });
	}
});

module.exports = router;