import { Router } from 'express';
import user from './user.js';
const router = Router();
export default () => {
    user(router);
    return router;
};
//# sourceMappingURL=index.js.map