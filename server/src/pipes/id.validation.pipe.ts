import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class idValidationPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if(metadata.type !== 'param') return value

    return value
  }
}