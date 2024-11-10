class TokenService {
  private token: string | null = null;

  // Method to set the token
  setToken(newToken: string) {
    this.token = newToken;
  }

  // Method to get the token
  getToken(): string | null {
    return this.token;
  }
}

// Create an instance of the TokenService
export const tokenService = new TokenService();
