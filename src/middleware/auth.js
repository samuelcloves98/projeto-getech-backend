const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{const header=req.headers.authorization; if(!header||!header.startsWith('Bearer ')) return res.status(400).json({message:'Token de autorização ausente ou inválido'});
 try{req.auth=jwt.verify(header.slice(7),process.env.JWT_SECRET);next();}catch(e){return res.status(400).json({message:'Token inválido ou expirado'});}};
