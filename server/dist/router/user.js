import { register, signIn, submitOTP } from '../controllers/userController.js';
export default (router) => {
    router.post('/register', register);
    router.post('/signin', signIn);
    router.post('/signin/:otp', submitOTP);
};
//# sourceMappingURL=user.js.map