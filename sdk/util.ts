export function bigintifyPkey(pkey){
  pkey.A = pkey.A.map(arr => arr.map(num=> BigInt(num) ) );
  pkey.B1 = pkey.B1.map(arr => arr.map(num=> BigInt(num) ) );
  pkey.B2 = pkey.B2.map(arr=> arr.map(arr2=> arr2.map(num=> BigInt(num) ) ) )
  pkey.C = pkey.C.map(arr => [null,'null'].includes(arr) ? arr : arr.map(num=> BigInt(num) ) );
  pkey.vk_alfa_1 = pkey.vk_alfa_1.map(num => BigInt(num) );
  pkey.vk_beta_1 = pkey.vk_beta_1.map(num => BigInt(num) );
  pkey.vk_delta_1 = pkey.vk_delta_1.map(num => BigInt(num) );
  pkey.vk_beta_2 = pkey.vk_beta_2.map(arr => arr.map(num=> BigInt(num) ) );
  pkey.vk_delta_2 = pkey.vk_delta_2.map(arr => arr.map(num=> BigInt(num) ) );
  pkey.hExps = pkey.hExps.map(arr => arr.map(num=> BigInt(num) ) );
  let polsMap = (obj)=>{
    obj=>{
      if(obj !== {}){
        obj[Object.keys(obj)[0]] = BigInt(obj[Object.keys(obj)[0]]);
      }
      return obj;
    }
  }
  pkey.polsA = pkey.polsA.map(polsMap);
  pkey.polsB = pkey.polsB.map(polsMap);
  pkey.polsC = pkey.polsC.map(polsMap);
  return pkey;
}
export function bigintifyVkey(vk){
  vk.IC = vk.IC.map(icArr=> icArr.map(icItem=> BigInt(icItem) ) )
  vk.vk_alfabeta_12 = vk.vk_alfabeta_12.map(arr=> arr.map(arr2=> arr2.map(num=> BigInt(num) ) ) )
  vk.vk_gamma_2 = vk.vk_gamma_2.map(arr=> arr.map(num=> BigInt(num) ) )
  vk.vk_delta_2 = vk.vk_delta_2.map(arr=> arr.map(num=> BigInt(num) ) )
  return vk;
}

export function bigintifyProof(proof){
  proof.pi_a = proof.pi_a.map(num => BigInt(num) );
  proof.pi_b = proof.pi_b.map(arr => arr.map(num=> BigInt(num) ) );
  proof.pi_c = proof.pi_c.map(num => BigInt(num) );
  return proof;
}

export function bigintifyPublicSignals(signals){
  return <any> signals.map(num => BigInt(num) );
}