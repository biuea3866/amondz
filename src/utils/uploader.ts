import multer from 'multer';
import { UPLOAD_PATH } from '../config/env.variable';
import path from 'path';

class Uploader {
    public uploadFiles() {
        const storage = multer.diskStorage({
            destination: (request, file, callback) => {
                callback(null, path.join(`${__dirname}/../../${UPLOAD_PATH}`));
            },
            filename: (request, file, callback) => {
                const uniqueName = Date.now() + '' + Math.round(Math.random() * 1E9);

                console.log(file);

                callback(null, `${uniqueName}`);
            }
        });

        return multer({ storage }).array("files", 10);
    }
}

export { Uploader };