class ErrorResponse extends Error {
    constructor(message,statusCode){
        super(message);
        this.statuCode=statusCode;
    }
}
module.exports =ErrorResponse;