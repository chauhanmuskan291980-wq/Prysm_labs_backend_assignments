const validate = (schema) => (req, res, next) => {
  try {
    console.log("BODY RECEIVED:", req.body); // 👈 debug
    schema.parse(req.body);
    next();
  } catch (err) {
    console.log("VALIDATION ERROR:", err.errors); // 👈 debug
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors
    });
  }
};

module.exports = validate;
