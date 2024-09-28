import { Request, Response, NextFunction } from 'express';
import { employeeValidatorPartial } from './../../../src/middleware/partial.validator';
import { employeeValidOptional } from '../../../src/validator/employees';
import { employee } from '../../../src/config/mongoConfig';

jest.mock('../../../src/validator/employees', () => ({
  employeeValidOptional: {
    safeParse: jest.fn(),
  },
}));

describe('employeeValidatorPartial middleware', () => {
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
    (employeeValidOptional.safeParse as jest.Mock).mockReturnValue({ success: true });

    mockRequest.body = employee;
    await employeeValidatorPartial(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });


});
