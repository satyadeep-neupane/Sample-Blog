module.exports = (schema) => {
    return function(req, res, next){
        if(!req.body)
            return res.status(400).json({
                success: false,
                message: "No data provided"
            });

        const { error, value } = schema.validate(req.body, {abortEarly:false});
        if (error) {
            err = {}

            error.details.forEach(e => {
                err[e.path[0]] = e.message
            }) 

            let data = {
                success: false,
                message: "Validation failed",
                error: err,
                data: error._original,
            }
            return res.status(400).json(data);
        }
        next()
    }
}