"use strict";
(function(){
  const DB_NAME="nourbest-os",DB_VERSION=2,STORE="state";
  let dbPromise;
  function open(){if(!("indexedDB" in window))return Promise.resolve(null);if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{const request=indexedDB.open(DB_NAME,DB_VERSION);request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE);};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});return dbPromise;}
  async function get(key){const db=await open();if(!db)return undefined;return new Promise((resolve,reject)=>{const request=db.transaction(STORE,"readonly").objectStore(STORE).get(key);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
  async function set(key,value){const db=await open();if(!db)return;return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).put(value,key);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}
  async function hydrate(keys){const entries=await Promise.all(keys.map(async key=>[key,await get(key)]));return Object.fromEntries(entries.filter(([,value])=>value!==undefined));}
  async function clear(){const db=await open();if(!db)return;return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).clear();tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}
  window.NourDB={open,get,set,hydrate,clear,version:DB_VERSION};
})();
