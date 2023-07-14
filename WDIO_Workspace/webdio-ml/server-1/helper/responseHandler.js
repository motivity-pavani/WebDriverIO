module.exports.errorResponse = (res, error, commonErrorMessage = "") => {
    let errorMessage = error.message || error;
    res.json({
        status: 400,
        success: false,
        message: commonErrorMessage || errorMessage,
        error: error.message || error
    })
}
module.exports.successResponse = (res, data, message = "Success") => {
    res.json({
        status: 200,
        success: true,
        data: data,
        message: message
    })
}
