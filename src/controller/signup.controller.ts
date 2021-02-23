import { Body, Controller, HttpException, HttpStatus, Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControlMode, FileControlInterceptor } from 'src/interceptor/file-control.interceptor';
import { SignupResult, SignupUserDetails, Success } from 'src/model/signup';
import { SignupService } from 'src/service/signup.service';
import { fileDeleteAfterCompletion, fileSizeChecker } from 'src/utils/file-utils';

const IMAGE_MIN_SIZE = 1000;
const IMAGE_MAX_SIZE = 5 * 1024 * 1024;

@ApiTags('signup')
@Controller('api/signup')
export class SignupController {
    constructor(
        private signupService: SignupService
    ) { }

    private readonly logger = new Logger(SignupController.name);

    @Post('signup')
    @ApiOperation({ summary: "Sign up at CryptoWallet" })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileInterceptor('documentImage', {
            dest: './uploads',
            limits: {
                fileSize: IMAGE_MAX_SIZE,
            },
            fileFilter: function (req, file, cb) {
                if (file?.mimetype?.endsWith("jpeg")) {
                    cb(null, true);
                } else {
                    cb(new HttpException("Image must be in JPEG format!", HttpStatus.BAD_REQUEST), false);
                }
            }
        }),
        new FileControlInterceptor(fileDeleteAfterCompletion, ControlMode.FINALLY),
        new FileControlInterceptor(fileSizeChecker(IMAGE_MIN_SIZE), ControlMode.BEFORE),
    )
    async signup(
        @Body() userDetails: SignupUserDetails,
        @UploadedFile() documentImage: any
    ): Promise<SignupResult> {
        this.logger.log(userDetails.firstName + ' ' + userDetails.lastName);
        userDetails.documentImage = documentImage;
        this.logger.log(`Provided documentImage: ${JSON.stringify(userDetails.documentImage)}`);
        const sessionId = await this.signupService.startSignupProcess(userDetails);
        return { sessionId: sessionId, kind: "success" };
    }

}
