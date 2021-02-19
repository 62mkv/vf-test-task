import * as fs from 'fs';
import { HttpException, HttpStatus } from "@nestjs/common";
import { FileDefinition } from "src/model/file-definition";

export function fileDeleteAfterCompletion(file: FileDefinition): void {
    console.log(`Removing path: ${file.path}`);
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