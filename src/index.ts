import express from 'express';
import swaggerUi from 'swagger-ui-express'; 
import {swaggerSpecs as specs} from './docs/swagger';
import {router as routerCateg} from './routes/categories.routes.ts';
import { router as routerCust } from './routes/customers.routes.ts';
import { router as routerEmpl } from './routes/employees.routes.ts';
import { router as routerProd } from './routes/products.routes.ts';
import { router as routerShipp } from './routes/shippers.routes.ts';
import { router as routerSupp } from './routes/suppliers.routes.ts';
import { router as routerOrdDet } from './routes/orderdetails.routes.ts';
import { router as routerOrd } from './routes/orders.routes.ts';
import {ErrorNotFound} from './handlers/error.NotFout.ts'
import { oauthCheck,handler_s} from './middleware/authentications.ts';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
express.urlencoded({ extended: true });

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));
app.use("/api/v1",oauthCheck,handler_s,routerCateg);
app.use("/api/v1",oauthCheck,handler_s,routerCust);
app.use("/api/v1",oauthCheck,handler_s,routerEmpl);
app.use("/api/v1",oauthCheck,handler_s,routerShipp);
app.use("/api/v1",oauthCheck,handler_s,routerSupp);
app.use("/api/v1",oauthCheck,handler_s,routerProd);
app.use("/api/v1",oauthCheck,handler_s,routerOrdDet);
app.use("/api/v1",oauthCheck,handler_s,routerOrd);


app.use(ErrorNotFound);

export default app;





