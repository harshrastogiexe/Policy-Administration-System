import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpStatusCode } from 'src/utils/HttpStatusCode';

type Credential = {
  userName: string;
  password: string;
};

type SignUpCredential = Credential & { name: string; email: string };

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  static isSignedIn: boolean = false;

  static get IsSignedIn() {
    return AuthenticationService.isSignedIn;
  }

  static BaseAuthUri = environment.serviceUri.auth;

  static requestPath = {
    SIGNUP: `${AuthenticationService.BaseAuthUri}/api/auth/agent/signup`,
    VALIDATE: `${AuthenticationService.BaseAuthUri}/api/auth/agent/validate`,
    LOGIN: `${AuthenticationService.BaseAuthUri}/api/auth/agent/login`,
  };

  constructor() {}

  get isLoggedIn(): boolean {
    return AuthenticationService.isSignedIn;
  }

  async signup(credential: SignUpCredential) {
    const response = await fetch(AuthenticationService.requestPath.SIGNUP, {
      method: 'POST',
      body: JSON.stringify(credential),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
    });

    if (response.status === HttpStatusCode.Created) {
      const { auth_token: token } = await response.json();
      localStorage.setItem('token', token);
      AuthenticationService.isSignedIn = true;
    }
  }

  async login(credential: Credential): Promise<boolean> {
    const response = await fetch(AuthenticationService.requestPath.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credential),
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', accept: '*/*' },
    });

    const { auth_token: token } = await response.json();
    localStorage.setItem('token', token);
    AuthenticationService.isSignedIn = true;
    return true;
  }

  async signout() {
    localStorage.removeItem('token');
    AuthenticationService.isSignedIn = false;
  }

  async validate(): Promise<true | false> {
    const response = await fetch(AuthenticationService.requestPath.VALIDATE, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token') ?? '',
      }),
    });

    const isValidated = response.status === HttpStatusCode.Ok ? true : false;

    if (isValidated) {
      AuthenticationService.isSignedIn = true;
    } else {
      AuthenticationService.isSignedIn = false;
      localStorage.removeItem('token');
    }

    return isValidated;
  }
}
