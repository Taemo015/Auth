export default class ErrorsInterceptor extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  public static BadRequest(status: number, message: string) {
    return new ErrorsInterceptor(status, message);
  }

  public static UnAuthorized() {
    return new ErrorsInterceptor(401, "Пользователь не авторизован");
  }

  public static ServerError() {
    return new ErrorsInterceptor(500, "Internal Server Error");
  }
}
