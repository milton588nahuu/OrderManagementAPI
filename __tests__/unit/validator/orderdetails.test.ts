import { Request, Response, NextFunction } from 'express';
import { orderdetailValidatorPartial } from '../../../src/middleware/partial.validator';
import { orderdetailValidOptional } from '../../../src/validator/orderdetails';
import { orderdetail } from '../../../src/config/mongoConfig'
jest.mock('../../../src/validator/orderdetails', () => ({
  orderdetailValidOptional: {
    safeParse: jest.fn(),
  },
}));


describe('orderdetails ValidatorPartial middleware', () => {
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
      (orderdetailValidOptional.safeParse as jest.Mock).mockReturnValue({ success: true });
  
      mockRequest.body = orderdetail;
      await orderdetailValidatorPartial(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  
  
  });
  