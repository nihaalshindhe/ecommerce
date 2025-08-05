import dotenv from 'dotenv';

dotenv.config();

const checkEnv = () => {
    const requiredEnvVars = [
        'MONGO_URI',
        'JWT_SECRET',
        'STRIPE_SECRET_KEY',
        'CLOUDINARY_CLOUD_NAME',
        'CLOUDINARY_API_KEY',
        'CLOUDINARY_API_SECRET'
    ];

    requiredEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            throw new Error(`Environment variable ${varName} is missing`);
        }
    });
};

export default checkEnv;