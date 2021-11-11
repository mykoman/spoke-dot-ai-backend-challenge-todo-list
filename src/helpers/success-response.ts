export class SuccessResponse {
  message:string;
  status: string;
  data:object
  constructor({message, status="success", data={}}){
    this.status = status;
    this.message = message;
    this.data = data;
  }
}