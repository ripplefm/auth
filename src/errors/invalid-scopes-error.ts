export default class InvalidScopesError extends Error {
  providedScopes: string[];
  requiredScopes: string[];

  constructor(providedScopes: string[], requiredScopes: string[]) {
    super('Missing or invalid scopes');
    this.providedScopes = providedScopes;
    this.requiredScopes = requiredScopes;
    Object.setPrototypeOf(this, InvalidScopesError.prototype);
  }
}
