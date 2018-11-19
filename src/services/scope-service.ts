import { Scope } from '../types/scope';

class ScopeService {
  // If the array contains multiple scopes for the same item
  // the normalize function will only use the 'stronger' scope.
  // i.e ['stations:read', 'stations:write'] will be normalized to
  // ['stations:write'] since the write scope allows reading too.
  public normalize(scopes: string[]) {
    const normalized = new Map();
    scopes
      .map(scope => new Scope(scope))
      .filter(scope => scope.isValid())
      .forEach(scope => {
        const subject = scope.getSubject();
        if (
          !normalized.has(subject) ||
          (normalized.has(subject) &&
            normalized.get(subject).getValue() < scope.getValue())
        ) {
          normalized.set(subject, scope);
        }
      });
    const normalizedScopes: string[] = [];
    normalized.forEach((val, key) =>
      normalizedScopes.push(`${key}:${val.getAction()}`)
    );
    return normalizedScopes;
  }
}
export default new ScopeService();
