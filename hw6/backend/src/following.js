'use strict';
//this is the stub for following

let followings = [
        {username:"loggedInUser", followings:["mz22", "jy54"]},
        {username:"jr58test", followings:["mztest", "sep1"]},
        {username:"sep1", followings:["sep1test", "jr58"]}
]

const getFollowing = (req, res) => {
	if (!req.user) {
		req.user = 'loggedInUser'
	}
	const username = req.params.user ? req.params.user : req.user
	let target = followings.filter((item)=>{return item.username == username})

	res.status(200).send(target)
}

const putFollowing = (req, res) => {
	const username = req.params.user
	if(!username){
		res.status(400).send({result: "username is missing"});
		return;
	}
	let target = followings.filter((item) => {
            if(item.username == 'loggedInUser') {
            	if(item.followings.indexOf(username) === -1)
                item.followings.push(username);
                return item.username == 'loggedInUser'
    		}
	})
	res.status(200).send(target)
}

const deleteFollowing = (req, res) => {
	const username = req.params.user
	if(!username){
		res.status(400).send({result: "username is missing"});
		return;
	}
	let target = followings.filter((item)=>{
            if(item.username == 'loggedInUser') {
            	let index = item.followings.indexOf(username)
            	if(index !== -1)
                item.followings.splice(index, 1)
                return item.username == 'loggedInUser'
            }
    })
	res.status(200).send(target)
}

module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}