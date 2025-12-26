export interface AuthResponse {
    token: string;
}

export interface LoginRequest {
    email?: string;
    password?: string;
}

export interface RegisterRequest {
    email?: string;
    password?: string;
    fullName?: string;
    orgName?: string;
}

// Matches the JWT payload from your Java UserPrincipal
export interface UserTokenPayload {
    sub: string;       // email
    userId: string;
    orgId: string;
    role: string;
    exp: number;       // expiration
    iat: number;
}