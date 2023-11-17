const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// sends back the current database in json
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    });

    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }

 
});

// sends back the json for the specicied id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product]
    })
    if (!categoryData) {
      res.status(404).json({ message: 'NO CATEGORY FOUND WITH THIS ID!' });
      return;
    }

    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }

});

// allows the user to add to the database
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// allows user to update the database from a specific id
router.put('/:id', async (req, res) => {

  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(400).json({ message: 'NO CATEGORY FOUND WITH THIS ID!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(err);
  }
});

// allows the user to delete from the database by entering a specific id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(400).json({ message: 'NO CATEGORY FOUND WITH THIS ID!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
