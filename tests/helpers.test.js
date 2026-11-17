const {slugify}=require('../src/services/helpers');
test('gera slug sem acentos e com hífens',()=>{expect(slugify('Tênis de Corrida')).toBe('tenis-de-corrida');});
