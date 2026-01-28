const validateSearch = (schema, type = "body") => (req, res, next) => {
  try {
    const data = type === "query" ? req.query : req.body;
    schema.parse(data);
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors?.map(e => ({
        field: e.path.join("."),
        message: e.message
      }))
    });
  }
};

module.exports = validateSearch;
