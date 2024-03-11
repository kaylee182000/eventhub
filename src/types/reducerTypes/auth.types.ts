export interface AuthState {
  isAuthorized: boolean;
  storedEmail: string;
  userData: UserData;
}

export interface UserData {
  username: string;
  email: string;
  photoUrl: string;
}
