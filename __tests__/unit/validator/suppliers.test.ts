import { Request, Response, NextFunction } from 'express';
import { supplierValidatorPartial } from '../../../src/middleware/partial.validator';
import { supplierValidOptional } from '../../../src/validator/suppliers';
import { supplier } from '../../../src/config/mongoConfig'
jest.mock('../../../src/validator/suppliers', () => ({
  supplierValidOptional: {
    safeParse: jest.fn(),
  },
}));

describe('supplerValidatorPartial middleware', () => {
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
    (supplierValidOptional.safeParse as jest.Mock).mockReturnValue({ success: true });

    mockRequest.body = supplier;
    await supplierValidatorPartial(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });


});

