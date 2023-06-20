const db = require("../../data/db-config")

const getAll = async (limit, sortBy, sortDir) => {
  limit = limit || await db("accounts").length;
  sortBy = sortBy || "id";
  sortDir = sortDir || "asc";
  return db("accounts").orderBy(sortBy, sortDir).limit(limit);
}

const getById = id => {
  return db("accounts").where("id",id).first();
}

const getByName = name => {
  return db("accounts").where("name",name).first();
}


const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  await db("accounts").where("id",id).update(account);
  return getById(id);
}

const deleteById = id => {
  return db("accounts").where("id",id).del();
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
