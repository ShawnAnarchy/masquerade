export default function buildWitness(witness){
  const buffLen = calculateBuffLen(witness);
  const buff = new ArrayBuffer(buffLen);
  const h = { dataView: new DataView(buff), offset: 0 };
  
  for (let i=0; i<witness.length; i++) {
      writeBigInt(h, witness[i]);
  }
  
  return Buffer.from(buff);  
}


/*
  UTILS
*/
function writeUint32(h, val) {
  h.dataView.setUint32(h.offset, val, true);
  h.offset += 4;
}

function writeBigInt(h, bi) {
  for (let i=0; i<8; i++) {
      const v = bi.shiftRight(i*32).and(0xFFFFFFFF).toJSNumber();
      writeUint32(h, v);
  }
}

function calculateBuffLen(witness) {
  let size = 0;
  // beta2, delta2
  size += witness.length * 32;
  return size;
}
