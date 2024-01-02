export class CustomError extends Error {
    statusCode = 400;
  
    constructor(err: {message:string, status?:number}) {
        super(err.message );
        
        if(err.status) {
            this.statusCode = err.status;
        }
      Object.setPrototypeOf(this, CustomError.prototype);
    }
    
  
    getErrorMessage() {
      return 'Something went wrong: ' + this.message;
    }
}
  