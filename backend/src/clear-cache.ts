import { flushAll } from './services/redis.service';

// Clear Redis cache
flushAll()
    .then(() => {
        console.log('Cache cleared successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error clearing cache:', error);
        process.exit(1);
    });
