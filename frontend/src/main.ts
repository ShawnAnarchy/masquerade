import {
  SampleProver,
  GoMasqueradeProver,
  bigintifyPkey, bigintifyVkey, bigintifyProof, bigintifyPublicSignals } from '../../sdk/index';
import { Graph } from './graph';

const isWasmSupported = (() => {
  try {
      if (typeof WebAssembly === "object"
          && typeof WebAssembly.instantiate === "function") {
          const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
          if (module instanceof WebAssembly.Module)
              return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
      }
  } catch (e) {
  }
  return false;
})();
const isWorkerSupported = 'serviceWorker' in navigator;
const isSecureContext = window.isSecureContext;
var sBrowser, sUsrAg = navigator.userAgent;
if (sUsrAg.indexOf("Firefox") > -1) {
  sBrowser = "Mozilla Firefox";
  // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
} else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
  sBrowser = "Samsung Internet";
  // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
} else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
  sBrowser = "Opera";
  // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
} else if (sUsrAg.indexOf("Trident") > -1) {
  sBrowser = "Microsoft Internet Explorer";
  // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
} else if (sUsrAg.indexOf("Edge") > -1) {
  sBrowser = "Microsoft Edge";
  // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
} else if (sUsrAg.indexOf("Chrome") > -1) {
  sBrowser = "Google Chrome or Chromium";
  // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
} else if (sUsrAg.indexOf("Safari") > -1) {
  sBrowser = "Apple Safari";
  // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
} else {
  sBrowser = "unknown";
}
const isWasmsnark = true;//(isWasmSupported && isWorkerSupported);
function workermsg(){
  let workermsg='';
  if(isSecureContext){
    if (isWorkerSupported){
      workermsg = "worker: supported";
    } else {
      workermsg = "worker: not supported";
    }
  } else {
    workermsg = "worker: can't identify worker availability under the insecure context";
  }
  return workermsg;
}

(async ()=>{

  let pkey = require("../../circuits/proving_key.json");
  let wasm = require("../../circuits/circuit.wasm");
  let input = require("../../circuits/input.json");
  let memory = {};
  let memlimit = (<any>performance).memory.jsHeapSizeLimit/(1000)**2;
  let memmax = (<any>performance).memory.totalJSHeapSize/(1000)**2;
  let count = 0;
  
  // let prover = new SampleProver(Buffer.from(wasm.data), pkey, isWasmsnark);
  let prover = new GoMasqueradeProver(Buffer.from(wasm.data), pkey, isWasmsnark);
  let graph = new Graph();


  window.onload = async () => {
    graph.line('memory', memory);

    const intervalId = setInterval(()=>{
      let mem = (<any>performance).memory.usedJSHeapSize/(1000)**2;
      document.getElementById('memoryongoingbox').innerHTML = `ongoingmem: ${mem}`;

      if(memlimit > mem){
        graph.add(count, mem);
        // memory[Date.now()] = mem;
      } else {
        graph.add(count, memlimit);
        // memory[Date.now()] = memlimit;
      }
      count++;
    }, 50);
  

    document.getElementById('browserbox').innerHTML = `browser:${sBrowser}`;
    document.getElementById('wasmbox').innerHTML = `wasm:${isWasmSupported}`;
    document.getElementById('workerbox').innerHTML = workermsg();
    document.getElementById('memorylimitbox').innerHTML = "memlimit: " + memlimit + "MB";
    document.getElementById('memorymaxbox').innerHTML = "memmax: " + memmax + "MB";
    
    let $box1 = document.getElementById('box1');
    $box1.innerHTML = "generating a proof...";
    let now = Date.now();
    
    try {
      let proof = await prover.prove(input);
      let diff = Date.now() - now;
      $box1.innerHTML = "gen proof time: " + diff;
    } catch (e) {
      let diff = Date.now() - now;
      $box1.innerHTML = `error time: ${diff} \n\n msg:${e.message}`;
    }

  }
})();

