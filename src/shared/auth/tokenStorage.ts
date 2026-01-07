// Token storage utilities
export const tokenStorage = {
  get: (): string | null => {
    return localStorage.getItem("jwtToken");
  },
  
  set: (token: string): void => {
    localStorage.setItem("jwtToken", token);
  },
  
  remove: (): void => {
    localStorage.removeItem("jwtToken");
  },
  
  has: (): boolean => {
    return !!localStorage.getItem("jwtToken");
  }
};
