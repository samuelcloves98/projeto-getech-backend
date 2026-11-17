const router=require('express').Router();const auth=require('../middleware/auth');const wrap=require('../services/helpers').asyncHandler;const u=require('../controllers/userController'),c=require('../controllers/categoryController'),p=require('../controllers/productController');
// Rotas públicas para cadastro, consulta e emissão inicial do token.
router.get('/user/:id',wrap(u.get));router.post('/user',wrap(u.create));router.post('/user/token',wrap(u.token));
router.put('/user/:id',auth,wrap(u.update));router.delete('/user/:id',auth,wrap(u.remove));
router.get('/category/search',wrap(c.search));router.get('/category/:id',wrap(c.get));router.post('/category',auth,wrap(c.create));router.put('/category/:id',auth,wrap(c.update));router.delete('/category/:id',auth,wrap(c.remove));
router.get('/product/search',wrap(p.search));router.get('/product/:id',wrap(p.get));router.post('/product',auth,wrap(p.create));router.put('/product/:id',auth,wrap(p.update));router.delete('/product/:id',auth,wrap(p.remove));
module.exports=router;
