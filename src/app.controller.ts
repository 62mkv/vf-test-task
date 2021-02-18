import { Body, Controller, Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SignupResult, SignupUserDetails, Success } from './model/signup';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Post('signup')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('documentImage', {dest: './uploads'})
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
