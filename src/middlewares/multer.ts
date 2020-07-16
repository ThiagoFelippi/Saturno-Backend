import * as multer from 'multer'
import * as path from 'path'

export default {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads'))
        },
        filename: (req,file,cb) => {
            const filename = `${Date.now()}-${file.originalname}`
            cb(null, filename)
          }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    }
}
