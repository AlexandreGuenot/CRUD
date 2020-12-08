var express = require('express');
var router = express.Router();
const User = require('../Models/users.models');
/* GET users listing. */

// Read
router.get('/', (req, res) => {

  User.find()
    .then(users => { res.status(200).json(users) })
    .catch(error => res.status(400).json({ error }));

});

router.get('/:id', (req, res) => {

  User.findOne({ id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
});
// Créer
router.post('/', (req, res) => {
  const user = new User({
    ...req.body
  });
  console.log(user);
  user.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !', id: user.id }))
    .catch(error => res.status(400).json({ error: error }));
});
//
router.put('/:id', (req, res) => {
  User.updateOne({ id: req.params.id }, { ...req.body, id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

router.delete('/:id', (req, res) => {
  User.deleteOne({ id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !', id: req.params.id }))
    .catch(error => res.status(400).json({
      error: "Object wasn't deleted. " + error
    }));
});
module.exports = router;
