import { Request, Response, NextFunction } from 'express';
import { shipperValidatorPartial } from '../../../src/middleware/partial.validator';
import { shipperValidOptional } from '../../../src/validator/shippers';
import { shipper } from '../../../src/config/mongoConfig';
jest.mock('../../../src/validator/shippers', () => ({
  shipperValidOptional: {
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
    (shipperValidOptional.safeParse as jest.Mock).mockReturnValue({ success: true });

    mockRequest.body = shipper;
    await shipperValidatorPartial(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });


});
