import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth-service.service';
import { User } from './auth-service.service'; // Import the User interface

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  const mockUser: User = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
    Role: 'user'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    service.register(mockUser).subscribe(response => {
      expect(response).toEqual({ message: 'User registered successfully' });
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush({ message: 'User registered successfully' }); // Respond with mock data
  });
});
