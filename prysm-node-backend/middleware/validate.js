const validate = (schema) => (req, res, next) => {
  try {
    console.log("BODY RECEIVED:", req.body);
    schema.parse(req.body);
    next();
  } catch (err) {
    console.log("ZOD ERROR:", err.issues);   

    return res.status(400).json({
      message: "Validation error",
      errors: err.issues.map(e => ({
        field: e.path[0],
        message: e.message
      }))
    });
  }
};

module.exports = validate;
