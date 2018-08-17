import db from './db';
import config from '../config/config';

export default (onError, onComplete) => {
    const connection = db(true);
    connection.query('CREATE DATABASE ' + process.env.DB_NAME, (error) => {
        if (error) {
            onError(error);
        } else {
            connection.query(
                'CREATE TABLE `' +
                    process.env.DB_NAME +
                    '`.`sources` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(50) NOT NULL , `servings` TINYINT NOT NULL , `caffeine_per_serving` SMALLINT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;',
                (tableError) => {
                    if (tableError) {
                        onError(tableError);
                    } else {
                        connection.query(
                            'INSERT INTO `caffeine`.`sources` (`id`, `name`, `servings`, `caffeine_per_serving`) VALUES ' +
                                config.SOURCES.map(
                                    (source) =>
                                        `(NULL, '${source.name}', '${source.servings}', '${
                                            source.caffeine
                                        }')`
                                ),
                            (insertError) => {
                                if (insertError) {
                                    onError(insertError);
                                } else {
                                    onComplete();
                                }
                            }
                        );
                    }
                }
            );
        }
    });
};
