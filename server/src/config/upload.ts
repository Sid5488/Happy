import multer from 'multer';
import { join } from 'path';

export default {
    storage: multer.diskStorage({
        destination: join(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (request, file, callback) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            callback(null, fileName);
        }
    })
};
