import app from './app'
import config from './config/config'
import logger from './utils/logger';

const server = app.listen(config.PORT)

;(() => {
    try {
        logger.info("Rate_Limiter_Started")
        logger.info(`Application Started`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
        
    } catch (error) {
        logger.error(`Application error`, {
            meta: { error }
        })

        server.close((error) => {
            if (error) {
                logger.error(`Application error`, {
                    meta: { error }
                })
            }
            process.exit(1);
        })
    }
})()
