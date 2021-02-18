import { Body, Controller, HttpException, HttpStatus, Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { FileValidatingInterceptor } from './interceptor/file-validating.interceptor';
import { SignupResult, SignupUserDetails, Success } from './model/signup';

const IMAGE_MIN_SIZE = 1000;

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Post('signup')
  @ApiOperation({summary: "SignUp at CryptoWallet"})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('documentImage', {
        dest: './uploads',
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
        fileFilter: function(req, file, cb) {
            if (file?.mimetype?.endsWith("jpeg")) {
               cb(null, true);
            } else {
                cb(new HttpException("Image must be in JPEG format!", HttpStatus.BAD_REQUEST), false);
            }
        }
    }), 
    new FileValidatingInterceptor(file => {
        if (file?.size < IMAGE_MIN_SIZE) {
            throw new HttpException(`Image must be longer than ${IMAGE_MIN_SIZE}`, HttpStatus.BAD_REQUEST);
        }
    })
   )
  signup(
    @Body() userDetails: SignupUserDetails,
    @UploadedFile() documentImage: any
    ): SignupResult {
      this.logger.log(userDetails.firstName + ' ' +userDetails.lastName);
      this.logger.log(`Provided documentImage: ${JSON.stringify(documentImage)}`);
      let result: Success = { id: 1, kind: "success"};
      return result;
  }
}
