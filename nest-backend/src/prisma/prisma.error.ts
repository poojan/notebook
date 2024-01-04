import { NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handlePrismaError(entityName: string, error: any, id: number) {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      return new NotFoundException(`${entityName} with id: ${id} not found`);
    }
  }
  return null;
}
