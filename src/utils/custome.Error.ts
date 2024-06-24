

class CustomeError extends Error{
    public status:number;
    constructor(_status:number,message:string){
        super(message)
        this.status=_status;
        Error.captureStackTrace(this,this.constructor)
    }
}

export default CustomeError