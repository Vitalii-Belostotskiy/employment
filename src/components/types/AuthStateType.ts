export interface AuthState {
  authorized: boolean;
}

export interface RootStatement {
  auth: AuthState;
}
