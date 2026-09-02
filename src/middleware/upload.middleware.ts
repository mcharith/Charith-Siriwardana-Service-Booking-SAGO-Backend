import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = path.join(
    process.cwd(),
    "uploads",
    "profiles"
);

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true,
    });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);

        const fileName = `profile-${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${extension}`;

        cb(null, fileName);
    },
});

const fileFilter: multer.Options["fileFilter"] = (
    req,
    file,
    cb
) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, PNG and WebP images are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default upload;