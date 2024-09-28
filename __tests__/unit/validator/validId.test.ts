import { validateID } from '../../../src/middleware/id.validator'; 
import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

jest.mock('mongoose', () => ({
  isValidObjectId: jest.fn(),
}));

describe('Test middleware validateID', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      params: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();
  });

  it('debería llamar a next() cuando el ID es válido', async () => {
   
    (isValidObjectId as jest.Mock).mockReturnValue(true);

    mockRequest.params = { id: 'validMongoID' };

    await validateID(mockRequest as Request, mockResponse as Response, mockNext);

   
    expect(mockNext).toHaveBeenCalled();
   
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it('debería devolver 400 cuando el ID es inválido', async () => {

    (isValidObjectId as jest.Mock).mockReturnValue(false);

    mockRequest.params = { id: 'invalidMongoID' };

    await validateID(mockRequest as Request, mockResponse as Response, mockNext);


    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'invalid params' });

    expect(mockNext).not.toHaveBeenCalled();
  });
});
