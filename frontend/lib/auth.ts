const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const USER_KEY = "auth_user";

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  username?: string;
  role?: string;
  default_role_id?: number | string | null;
  roles?: Array<string | { id: number | string; name: string }>;
}

export function setAccessToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
}

export function setRefreshToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
}

export function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
}

export function getRefreshToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return null;
}

export function removeTokens(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

export function setUserInfo(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function getUser(): User | null {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem(USER_KEY);
    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch (error) {
      console.warn("Invalid user data in storage, clearing it.", error);
      localStorage.removeItem(USER_KEY);
      return null;
    }
  }
  return null;
}

export function clearAuth(): void {
  removeTokens();
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
  }
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function logout(): void {
  clearAuth();
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
}

// Backward-compatible aliases for existing imports
export const setToken = setAccessToken;
export const getToken = getAccessToken;
export const removeToken = removeTokens;
export const setUser = setUserInfo;
