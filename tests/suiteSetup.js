import models from '../server/app/models';


afterAll(()=> models.sequelize.close())