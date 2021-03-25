const router = require('express').Router();
const { Users, Messages, Flowers, Flags} = require('../../models'); 


//getting all users
router.get('/', (req, res) => {
    Users.findAll({
        attributes: {exclude: ['passowrd']}
    }).then(dbUserdata => res.json(dbUserdata))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    });
});

//get specific user by id 
router.get('/:id', (req, res) => {
    Users.findOne({
        attributes: {exclude : ['password']}, 
        where: {
            id: req.params.id
        }, 
        include: [
            {
                model: Messages, 
                attributes: []
            }
        ]
    })
})

module.exports = router;