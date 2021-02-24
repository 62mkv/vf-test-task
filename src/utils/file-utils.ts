import * as fs from 'fs';
import { FileException } from 'src/model/error';
import { FileDefinition } from "src/model/file-definition";


export function fileDeleteAfterCompletion(file: FileDefinition): void {
    fs.unlinkSync(file.path);
}

export function fileSizeChecker(minSize: number): (file: FileDefinition) => void {
    return function(file: FileDefinition): void {
        if (!file) {
            throw new FileException("File is not attached!");
        }
    
        if (file.size < minSize) {
          throw new FileException(`Image document must be at least ${minSize} bytes long`);
        }
      }
}