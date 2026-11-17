const slugify=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const asyncHandler=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
const notFound=(res,msg='Registro não encontrado')=>res.status(404).json({message:msg});
module.exports={slugify,asyncHandler,notFound};
