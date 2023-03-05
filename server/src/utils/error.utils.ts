interface ErrorCode {
  getCode(): number;
}

class GeneralError extends Error implements ErrorCode {
  constructor({ message }: { message: string }) {
    super(message);
  }

  getCode(): number {
    return 400;
  }
}

class BadRequest extends GeneralError {
  constructor(message: string) {
    super({ message });
    this.name = 'Bad Request';
  }

  getCode(): number {
    return 400;
  }
}

class NotFound extends GeneralError {
  constructor(message: string) {
    super({ message });
    this.name = 'Not Found';
  }

  getCode(): number {
    return 404;
  }
}

export default { GeneralError, BadRequest, NotFound };
