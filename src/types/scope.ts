export class Scope {
  private VALID_SCOPES: string[] = [
    'user:read',
    'user:email:read',
    'stations:read',
    'stations:write',
    'playlists:read',
    'playlists:write'
  ];

  // indices correspond to scope in VALID_SCOPES
  private VALID_SCOPE_VALUES = [0, 1, 0, 1, 0, 1];

  private subject: string;
  private action: string;
  private value: number;

  constructor(scope: string) {
    this.subject = scope.substring(0, scope.indexOf(':'));
    this.action = scope.substring(scope.indexOf(':') + 1, scope.length);
    const valueIndex = this.VALID_SCOPES.findIndex(s => s === scope);
    this.value = this.VALID_SCOPE_VALUES[valueIndex];
  }

  public isValid() {
    const scope = `${this.subject}:${this.action}`;
    return this.VALID_SCOPES.find(s => s === scope) !== undefined;
  }

  public getSubject() {
    return this.subject;
  }

  public getAction() {
    return this.action;
  }

  public getValue() {
    return this.value;
  }
}
