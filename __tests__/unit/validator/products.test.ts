import { Request, Response, NextFunction } from 'express';
import { productValidatorPartial } from '../../../src/middleware/partial.validator';
import { productValidOptional } from '../../../src/validator/products';
import { product } from '../../../src/config/mongoConfig';
jest.mock('../../../src/validator/products', () => ({
  productValidOptional: {
    safeParse: jest.fn(),
  },
}));

describe('productValidatorPartial middleware', () => {
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
    (productValidOptional.safeParse as jest.Mock).mockReturnValue({ success: true });

    mockRequest.body = product;
    await productValidatorPartial(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });


});
