import { Request, Response, NextFunction } from 'express';
import { orderValidatorPartial } from '../../../src/middleware/partial.validator';
import { orderValidOptional } from '../../../src/validator/orders';
import { order } from '../../../src/config/mongoConfig'
jest.mock('../../../src/validator/orders', () => ({
  orderValidOptional: {
    safeParse: jest.fn(),
  },
}));


describe('orderValidatorPartial middleware', () => {
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
    (orderValidOptional.safeParse as jest.Mock).mockReturnValue({ success: true });

    mockRequest.body = order;
    await orderValidatorPartial(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });


});
