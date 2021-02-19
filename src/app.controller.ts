import { Body, Controller, HttpException, HttpStatus, Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { FileFinalizingInterceptor } from './interceptor/file-finalizing.interceptor';
import { SignupResult, SignupUserDetails, Success } from './model/signup';
import { fileDeleteAfterCompletion, fileSizeChecker } from './utils/file-utils';

const IMAGE_MIN_SIZE = 1000;
const IMAGE_MAX_SIZE = 5 * 1024 * 1024;

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
            fileSize: IMAGE_MAX_SIZE,
        },
        fileFilter: function(req, file, cb) {
            if (file?.mimetype?.endsWith("jpeg")) {
               cb(null, true);
            } else {
                cb(new HttpException("Image must be in JPEG format!", HttpStatus.BAD_REQUEST), false);
            }
        }
    }),
    new FileFinalizingInterceptor((file) => {}, fileDeleteAfterCompletion), 
    new FileFinalizingInterceptor(fileSizeChecker(IMAGE_MIN_SIZE), (file) => {})    
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
