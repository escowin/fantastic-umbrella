const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
      // be sure to include its associated Product data
    include:[Product]
  })
  .then(dbTAGdata => res.json(dbTAGdata))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where :{
      id: req.params.id
    },
    include: {
        model: Product,
        attributes:['id', 'product_name','price','stock','category_id']
  },
  })
  .then(dbTAGdata =>{
    if(!dbTAGdata){
      res.status(404).json({message:'404 | no tags'});
      return;
    }
    res.json(dbTAGdata);
  })
   
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
   
      tag_name: req.body.tag_name,
  })
  .then(dbTAGdata => res.json(dbTAGdata))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    tag_name: req.body.tag_name,
    where:{
      id:req.params.id,
    }
  })
  .then(dbTAGdata => {
    if(!dbTAGdata[0]) {
      res.status(404).json({message: '404 | no tags'});
      return;
    }
    res.json(dbTAGdata);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTAGdata =>{
    if(!dbTAGdata){
      res.status(404).json({message:'404 | no tags' });
      return;
    }
    res.json(dbTAGdata);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


module.exports = router;
