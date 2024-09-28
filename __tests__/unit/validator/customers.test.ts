import { Request, Response, NextFunction } from 'express';
import { customerValidatorPartial } from '../../../src/middleware/partial.validator'; 
import { customerValidOptional } from '../../../src/validator/customers'; 
import {customer} from '../../../src/config/mongoConfig'
jest.mock('../../../src/validator/customers', () => ({
  customerValidOptional : {
    safeParse: jest.fn(),
  },
}));

describe('customerValidatorPartial middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = { body: {} };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();
  });

  it('should call next() when data is valid', async () => {
    (customerValidOptional.safeParse as jest.Mock).mockReturnValue({ success: true });

    mockRequest.body = customer;
    await customerValidatorPartial(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

 
});