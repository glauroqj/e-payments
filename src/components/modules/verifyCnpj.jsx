function verifyCnpj(cnpj) {
  console.log(cnpj)
  var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];

  if((cnpj = cnpj.replace(/[^\d]/g,"")).length !== 14)
      return false;
  
  if(/0{14}/.test(cnpj))
      return false;
  
  for (var i = 0, n = 0; i < 12; n += cnpj[i] * b[++i]);
  if(cnpj[12] != (((n %= 11) < 2) ? 0 : 11 - n))
      return false;
  
  for (var i2 = 0, n2 = 0; i2 <= 12; n2 += cnpj[i2] * b[i2++]);
  if(cnpj[13] != (((n2 %= 11) < 2) ? 0 : 11 - n2))
      return false;
  
  return true;
}

module.exports = {verifyCnpj}