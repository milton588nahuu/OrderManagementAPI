import { Request, Response, NextFunction } from 'express';
import { categoryValidatorPartial } from '../../../src/middleware/partial.validator'; 
import { categoryValidOptional } from '../../../src/validator/categories'; 
import {category} from '../../../src/config/mongoConfig'
jest.mock('../../../src/validator/categories', () => ({
  categoryValidOptional: {
    safeParse: jest.fn(),
  },
}));

describe('categoryValidatorPartial middleware', () => {
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
    (categoryValidOptional.safeParse as jest.Mock).mockReturnValue({ success: true });

    mockRequest.body = category;
    await categoryValidatorPartial(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

 
});
