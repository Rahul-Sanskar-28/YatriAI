import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directories exist
const recipesDir = path.join(process.cwd(), 'uploads', 'recipes');
const pattachitraDir = path.join(process.cwd(), 'uploads', 'pattachitra');
const artisansDir = path.join(process.cwd(), 'uploads', 'artisans');

if (!fs.existsSync(recipesDir)) {
  fs.mkdirSync(recipesDir, { recursive: true });
}

if (!fs.existsSync(pattachitraDir)) {
  fs.mkdirSync(pattachitraDir, { recursive: true });
}

if (!fs.existsSync(artisansDir)) {
  fs.mkdirSync(artisansDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine destination based on the route
    const isRecipeUpload = req.originalUrl.includes('/recipes/');
    const isPattachitraUpload = req.originalUrl.includes('/pattachitra/');
    const isArtisanUpload = req.originalUrl.includes('/artisans/');
    
    if (isRecipeUpload) {
      cb(null, recipesDir);
    } else if (isPattachitraUpload) {
      cb(null, pattachitraDir);
    } else if (isArtisanUpload) {
      cb(null, artisansDir);
    } else {
      // Default to recipes for backward compatibility
      cb(null, recipesDir);
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename based on upload type
    const userId = req.user?.userId || 'anonymous';
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    
    const isRecipeUpload = req.originalUrl.includes('/recipes/');
    const isPattachitraUpload = req.originalUrl.includes('/pattachitra/');
    const isArtisanUpload = req.originalUrl.includes('/artisans/');
    
    let filename: string;
    if (isRecipeUpload) {
      filename = `recipe_${userId}_${timestamp}${ext}`;
    } else if (isPattachitraUpload) {
      filename = `pattachitra_${userId}_${timestamp}${ext}`;
    } else if (isArtisanUpload) {
      filename = `artisan_${userId}_${timestamp}${ext}`;
    } else {
      // Default naming
      filename = `upload_${userId}_${timestamp}${ext}`;
    }
    
    cb(null, filename);
  }
});

// File filter to only allow images
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Configure multer
export const uploadRecipeImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Middleware to handle single image upload
export const uploadSingle = uploadRecipeImage.single('recipeImage');

// Error handling middleware for multer
export const handleUploadError = (error: any, req: any, res: any, next: any) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${error.message}`
    });
  }
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  next();
};