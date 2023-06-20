const router = require('express').Router();
const accountsModel = require("./accounts-model");
const mw = require("./accounts-middleware")

router.get('/', async (req, res, next) => {
 try {
  const accounts = await accountsModel.getAll(req.query.limit, req.query.sortBy, req.query.sortDir)
  res.json(accounts);
} catch (error) {
  next(error);
 }
})

router.get('/:id', mw.checkAccountId, (req, res, next) => {
   try {
    res.json(req.existAccount);
   } catch (error) {
    next(error);
   }
})

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
try {
  const inserted = {
    name:req.body.name,
    budget:req.body.budget
  }
  const insertedAccount = await accountsModel.create(inserted);
  res.status(201).json(insertedAccount)
} catch (error) {
  next(error);
}
})

router.put('/:id',mw.checkAccountId, mw.checkAccountPayload, mw.checkAccountNameUnique, async  (req, res, next) => {
try {
  const updated = {
    name:req.body.name,
    budget:req.body.budget
  }
  const updatedAccount = await accountsModel.updateById(req.params.id,updated);
  res.json(updatedAccount)
} catch (error) {
  next(error);
}
});

router.delete('/:id',mw.checkAccountId, async (req, res, next) => {
 try {
  await accountsModel.deleteById(req.params.id);
  res.json({message: `${req.params.id} numaralı id silindi.`})
 } catch (error) {
  next(error);
 }
})


module.exports = router;
