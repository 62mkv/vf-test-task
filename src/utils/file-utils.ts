import * as fs from 'fs';

// TODO: these have to be changed to use custom exceptions + exception filter to convert into HTTP 400
import { HttpException, HttpStatus } from "@nestjs/common";
import { FileDefinition } from "src/model/file-definition";

export function fileDeleteAfterCompletion(file: FileDefinition): void {
    fs.unlinkSync(file.path);
}

export function fileSizeChecker(minSize: number): (file: FileDefinition) => void {
    return function(file: FileDefinition): void {
        if (!file) {
            throw new HttpException("file is undefined", HttpStatus.BAD_REQUEST);
        }
    
        if (file.size < minSize) {
          throw new HttpException(`Image document must be at least ${minSize} bytes long`, HttpStatus.BAD_REQUEST);
        }
      }
}