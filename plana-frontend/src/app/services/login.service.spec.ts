import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });

    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API and save token and role to local storage', () => {
    const dummyResponse = {
      token: 'dummyToken123',
      Role: 'admin'
    };

    service.login('test@example.com', 'password123').subscribe(response => {
      expect(response).toEqual(dummyResponse);
      expect(localStorage.getItem('token')).toBe('dummyToken123');
      expect(localStorage.getItem('role')).toBe('admin');
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com', password: 'password123' });
    req.flush(dummyResponse);
  });

  it('should handle errors properly', () => {
    const errorMessage = 'Invalid credentials';

    service.login('test@example.com', 'wrongPassword').subscribe(
      () => fail('Expected an error, not a success'),
      (error) => {
        expect(error.error).toContain(errorMessage);
      }
    );

    const req = httpTestingController.expectOne('http://localhost:3000/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(errorMessage, { status: 401, statusText: 'Unauthorized' });
  });
});
