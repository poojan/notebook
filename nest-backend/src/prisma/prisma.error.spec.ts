import { NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { handlePrismaError } from './prisma.error';

describe('handlePrismaError', () => {
  it('should return NotFoundException for PrismaClientKnownRequestError with code P2025', () => {
    const error = new PrismaClientKnownRequestError('Record not found.', {
      code: 'P2025',
      clientVersion: 'v1.0',
    });

    const result = handlePrismaError('Entity', error, 123);
    expect(result).toBeInstanceOf(NotFoundException);
    expect(result.getResponse()).toEqual({
      statusCode: 404,
      message: 'Entity with id: 123 not found',
      error: 'Not Found',
    });
  });

  it('should return null for other errors', () => {
    const error = new Error('General Error');

    const result = handlePrismaError('Entity', error);
    expect(result).toBeNull();
  });

  it('should return null for PrismaClientKnownRequestError with a different code', () => {
    const error = new PrismaClientKnownRequestError('Some other error.', {
      code: 'P2000', // Different error code
      clientVersion: 'v1.0',
    });

    const result = handlePrismaError('Entity', error);
    expect(result).toBeNull();
  });
});
