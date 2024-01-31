const { logger } = require('../../utils/logger');
const { createTableUsers: createTableUsersQuery } = require('../queries');
const { createTableAcademy: createTableAcademyQuery } = require('../queries');
const { createTableEnrollment: createTableEnrollmentQuery } = require('../queries');
const { createTableCourse: createTableCourseQuery } = require('../queries');
// const { createForeignKeys: createForeignKeysQuery } = require('../queries');

(() => {    
   require('../../config/db.config').query(createTableUsersQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table users created!');
    });
})();

(() => {    
    require('../../config/db.config').query(createTableAcademyQuery, (err, _) => {
         if (err) {
             logger.error(err.message);
             return;
         }
         logger.info('Table academy created!');
     });
 })();

 (() => {    
    require('../../config/db.config').query(createTableEnrollmentQuery, (err, _) => {
         if (err) {
             logger.error(err.message);
             return;
         }
         logger.info('Table enrollment created!');
     });
 })();

 (() => {    
    require('../../config/db.config').query(createTableCourseQuery, (err, _) => {
         if (err) {
             logger.error(err.message);
             return;
         }
         logger.info('Table Course created!');
         process.exit(0);
     });
 })();

//  (() => {    
//     require('../../config/db.config').query(createForeignKeysQuery, (err, _) => {
//          if (err) {
//              logger.error(err.message);
//              return;
//          }
//          logger.info('Foreign keys created!');
//          process.exit(0);
//      });
//  })();