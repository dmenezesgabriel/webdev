import { routes } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

describe('AuthRoutingModule', () => {
  it('should have route for SignIn with the correct configuration', () => {
    const signInRoute = routes.find((route) => route.path === 'sign-in');

    expect(signInRoute).toBeTruthy();

    expect(signInRoute?.component).toBe(SignInComponent);
  });

  it('should have route for SignUp with the correct configuration', () => {
    const signUpRoute = routes.find((route) => route.path === 'sign-up');

    expect(signUpRoute).toBeTruthy();

    expect(signUpRoute?.component).toBe(SignUpComponent);
  });
});
