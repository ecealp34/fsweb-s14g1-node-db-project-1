const accountsModel = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  try {
    let {name,budget} = req.body;
    if(name === undefined || budget === undefined) {
      res.status(400).json({message:"name and budget are required"})
    } else if(name.trim().length > 100 || name.trim().length < 3) {
      res.status(400).json({message:"name of account must be between 3 and 100"})
    } else if(typeof budget !== "number" || isNaN(budget)) {
      res.status(400).json({message: "budget of account must be a number"})
    } else if(budget > 1000000 || budget < 0) {
      res.status(400).json({message: "budget of account is too large or too small"})
    } else {
      req.body.name = req.body.name.trim();
      next();
    }
  } catch (error) {
    next(error);
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
 try {
  const existName = await accountsModel.getByName(req.body.name);
  if(existName) {
    res.status(400).json({message:"that name is taken"})
  } else {
    next();
  }
 } catch (error) {
   next(error);
 }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const existAccount = await accountsModel.getById(req.params.id);
    if(existAccount === undefined) {
      res.status(404).json({message: "account not found"});
    } else {
      req.existAccount = existAccount;
      next();
    }
  } catch (error) {
    next(error);
  }
}
