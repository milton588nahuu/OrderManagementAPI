import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
import { handler_s } from '../../../src/middleware/authentications';  
import { Request, Response, NextFunction } from 'express';
describe('Test middleware handler_s', () => {

  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();
  });

  it('debería devolver 401 si el error es UnauthorizedError', () => {
    const mockRequest: Partial<Request> = {
      headers: {},
      body: {},
      query: {},
      params: {},
    };


    const mockError = new UnauthorizedError('Invalid credentials');


    handler_s(mockError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);

    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Credenciales inválidas' });

    expect(mockNext).not.toHaveBeenCalled();
  });

});
