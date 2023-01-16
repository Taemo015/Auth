export default class ErrorsInterceptor extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static BadRequest(status: number, message: string) {
    return new ErrorsInterceptor(status, message);
  }

  static UnAuthorized() {
    return new ErrorsInterceptor(401, "Пользователь не авторизован");
  }
}
