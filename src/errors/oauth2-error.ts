export default class OAuth2Error extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, OAuth2Error.prototype);
  }
}
