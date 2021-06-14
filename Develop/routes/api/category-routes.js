const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // Find all categories
  try {
    const categoryData = await Category.findAll({
      // Include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      // Include its associated Products
      include: [{ model: Product}],
    });

    if (!categoryById) {
      res.status(404).json({ message: 'No category found with that id'})
    }
    res.status(200).json(categoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});  
  

// CREATE a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }  
});

// UPDATE a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    }  
  });
  if (!updatedCategory) {
    res.status(404).json({ message: 'No category found with that id'});
    return;
  } 
  // sends updated category as a json response
  res.status(200).json(updatedCategory);
    } catch (err) {
    res.status(400).json(err);
  }   
});


// DELETE a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
