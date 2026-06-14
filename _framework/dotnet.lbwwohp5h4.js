//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"901ca941248413c79832d2fdbd709da0c4386353",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "CouncilWebApp",
  "resources": {
    "hash": "sha256-GTXcHp62Kt1libwIlMIdx1yQVi3U90Vj7DzttXvywPU=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.diw21dl6d9.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.a6jcqbs390.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.sotzuytvc5.wasm",
        "hash": "sha256-9Egtb9Q8mZ2e8fKdXvZ9ACo0MnQ5R0dKXJSbIxhrGG0=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "hash": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "hash": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "hash": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.uzoakn3mog.wasm",
        "hash": "sha256-Cp2bQOeRFVxMIA/IQbNc6pVyPdKopwM4EnwXZAse2KM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.gous2qw2hs.wasm",
        "hash": "sha256-UPQL5FnHvtojtrgg40o2KwmUpgAcDerkku5R0NDwhvU=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "Azure.Core.wasm",
        "name": "Azure.Core.8xk79iv8nh.wasm",
        "hash": "sha256-VHkkFYKYsVX/ZTjRxW7egFcHCk1KjpB9tl7Gwdo37/M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Azure.Identity.wasm",
        "name": "Azure.Identity.q3kp98qd6v.wasm",
        "hash": "sha256-+iQf3yduYHqsIbO5lcB9t6jQxHAjKTlfWKHrm/nJn1U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Authorization.syab7cjmlf.wasm",
        "hash": "sha256-vCyMieG0WduqAP5230YCnnEO6Jt5lR5wcyuPx7BXgv0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.7lcia0t06k.wasm",
        "hash": "sha256-Oyro8gUZoe9zenwbuAdQ+vrCh2iSa2Fl8g091WhSvV8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Components.Authorization.1uh7hs0g6y.wasm",
        "hash": "sha256-Cfe0kL/10AdXcfURmF+K/cIaCnDnZlhWxkGtR3rFvyM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.47nzqsfz34.wasm",
        "hash": "sha256-0KWaSgJm0U3sTZ0wvCvgcsrR7QuHefnADlyKSwtbVKI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.jukah5oenw.wasm",
        "hash": "sha256-9ZJ3rUa1hWLd0byGJeS1qVl5qSONxdZ9upGwzdQY/4I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.06ym7lbmmj.wasm",
        "hash": "sha256-iJ4LlGpnZPnQopQYokb5tvFpGJnB4MLKeXY/EYsybVI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Http.Abstractions.4pucu9jwqe.wasm",
        "hash": "sha256-aPjR8YQYZRQOCbPYFnx/tOBYEqSXaAF/F/Cd883tTH4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Features.wasm",
        "name": "Microsoft.AspNetCore.Http.Features.4kfzemgx1u.wasm",
        "hash": "sha256-hF86nD892lo0u26YKc0I78W2vbzPNsSJRdXv/fpfy60=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Metadata.wasm",
        "name": "Microsoft.AspNetCore.Metadata.8t0g6je4cu.wasm",
        "hash": "sha256-HDof6DD8xtU65Q/RhVPKVaW2y00xd8I2g3gxAneot/k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Data.SqlClient.wasm",
        "name": "Microsoft.Data.SqlClient.3806qc8pna.wasm",
        "hash": "sha256-Xe9VStEe3aONRlO3BZMB/VDCNJHsw1TCMsZ+z6lcCzA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.wasm",
        "name": "Microsoft.EntityFrameworkCore.0jmstfwrox.wasm",
        "hash": "sha256-DPqJ1DzXzrBqnQPsrgR9OnIxPPzoflY9qheOifzx9QQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.Abstractions.wasm",
        "name": "Microsoft.EntityFrameworkCore.Abstractions.bikd07jaw7.wasm",
        "hash": "sha256-E9UcDpV3VUBYW2GncvDnpz/l1rBbYx/P9aJZi2SVCHs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.Relational.wasm",
        "name": "Microsoft.EntityFrameworkCore.Relational.ujnp3lyh53.wasm",
        "hash": "sha256-hgVe+Wskn0/RBgvSXBEkL7UHUyZX6c5Ap82nx8HNUFs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.SqlServer.wasm",
        "name": "Microsoft.EntityFrameworkCore.SqlServer.ab5wxh4vji.wasm",
        "hash": "sha256-GnjFQHrTfHiH/QA5EDIgMSE9NtdKIrcAc0qgEu2nmcI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Abstractions.wasm",
        "name": "Microsoft.Extensions.Caching.Abstractions.l3n1dyrmj0.wasm",
        "hash": "sha256-z6/0mfqt+5zSVBfn1Xyf1Z1xC1Tj4jop4cXgbGe98N8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Memory.wasm",
        "name": "Microsoft.Extensions.Caching.Memory.62vm8fo69n.wasm",
        "hash": "sha256-QhV/fRFH8kb2aHWWM7C4rwgcmz9YM0DNGNPWLLpAbgw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.rtb2ggva4a.wasm",
        "hash": "sha256-X2gDP/Ix561XPkOfbYyYEdx+MfPC0ifHQnrAZtr72Tg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.5pna2hyfg3.wasm",
        "hash": "sha256-h2PuSogIh3zoE92J0jv/IatwEhm4pxAaBt274yHhSlI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.v8qqhbr59g.wasm",
        "hash": "sha256-X7TShXPosSxjEYpa1FOHbXgIm+K5HiPV7d+0/M2w00U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.vejc7kiu4g.wasm",
        "hash": "sha256-R8Rvf+ufvlMX05PSWGUXwGm3hty6uCI9EtqBH2FpDIQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.vm9y6cs0ro.wasm",
        "hash": "sha256-uWQ9SjwUIjbqxUie0XT15P10/e5Xqz+wyx24sWiPCfs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.rb4ugu8x6i.wasm",
        "hash": "sha256-Z3kr4l8296kH5GefC9OcnHLl0styoPKLAJV3SyxcbOY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.bba307b5bn.wasm",
        "hash": "sha256-98KQRZr9w7MHE1gtXgScbI/snaA8ogs4Zcnnk9ZhsMQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.2uffu1oll3.wasm",
        "hash": "sha256-FsDD1xCAGbahHPs4EM8NfzzGXatQxfOTX7m8HL6nC0s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Http.wasm",
        "name": "Microsoft.Extensions.Http.3eyjl4y6p9.wasm",
        "hash": "sha256-JWa6iuXi76fzWmjEdt9ESU6UgdmirMVbtxi54Fh3hV8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.otn4vw5v8p.wasm",
        "hash": "sha256-nGDzvN1cSo81dmmteEUy16UoV8JWCj4YSV3abQL3kW0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.vz6t52jbdu.wasm",
        "hash": "sha256-qyUq/Xsc6isYanz3cXHxnovrZ9mbVXTBIeo9KRIHKt0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.uj2skkfzid.wasm",
        "hash": "sha256-6g+EYKpGaJxzsRmZTykgd/G3J5WmMqNb9kF5yTabxZc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.fjwb9iywg5.wasm",
        "hash": "sha256-e8pa9v/HA7FJ+t6pnQSEeesvIdyX4g0GbaBvIV/rHL4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.9q24f4ufiz.wasm",
        "hash": "sha256-L3o6ScQiBNjoEsgB31VKNkW9rtDoCuWxpDnaZmdLG9Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Identity.Client.wasm",
        "name": "Microsoft.Identity.Client.8rbne2a4wx.wasm",
        "hash": "sha256-RFGwA1PJTYRy5nkiYV+SoFxzaZB/qbyGRaCnR/IcnOk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Identity.Client.Extensions.Msal.wasm",
        "name": "Microsoft.Identity.Client.Extensions.Msal.ks83314uaf.wasm",
        "hash": "sha256-RJYXAvD3aph/JuaxKK4rxebMm8FZcEvnd8JMBd/d5hE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Abstractions.wasm",
        "name": "Microsoft.IdentityModel.Abstractions.0m6h741tyv.wasm",
        "hash": "sha256-SH0rUt6k82z9Cz4KOL4WFMA29XasrcRmSmTq4rxmhjQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.JsonWebTokens.wasm",
        "name": "Microsoft.IdentityModel.JsonWebTokens.cxyxl1fpw4.wasm",
        "hash": "sha256-EDjT0oUctyIFx92oz/BslCa3kmLMKgUoNbKvEHaadg8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Logging.wasm",
        "name": "Microsoft.IdentityModel.Logging.sh90tggp8e.wasm",
        "hash": "sha256-8BLJOclzuhb6NG21DK6eyfBDr99iHUktqw0hKVCOkEk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Protocols.wasm",
        "name": "Microsoft.IdentityModel.Protocols.homtf5mctj.wasm",
        "hash": "sha256-ERvqChyVYiFjNDbPkS0sOag9BFOOIe8nWTEiBVLRbeA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Protocols.OpenIdConnect.wasm",
        "name": "Microsoft.IdentityModel.Protocols.OpenIdConnect.45hz3ik893.wasm",
        "hash": "sha256-iOxZiIbSNsoZ8tto2rBtzh77EzkRa0YcPb36KYr6IdE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Tokens.wasm",
        "name": "Microsoft.IdentityModel.Tokens.2wpk0uxouu.wasm",
        "hash": "sha256-7vcEr6jIbsLxtJsjKqRaUjlXzJK74GyMDqcqitijPxY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.l4xclch662.wasm",
        "hash": "sha256-S1jJv+AZDuSVz9qBKOY7vdHxN0s5Syn5tGKhTHFjca0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.nsfh695mwg.wasm",
        "hash": "sha256-N8RKL2Eil4ZFxIkWa6Uig12+nRHOstda562q7GCs9fE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.SqlServer.Server.wasm",
        "name": "Microsoft.SqlServer.Server.yamodpu5qp.wasm",
        "hash": "sha256-Fig+5hq00gGQlXAgSnyFlUlWyhlx9f+yPJb4INt3gNc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Npgsql.wasm",
        "name": "Npgsql.5fl66z1ctz.wasm",
        "hash": "sha256-DwxKKOjrc+/MXjYoU1S3TE15Rr80FE2HRU89ysZ6k/s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Npgsql.EntityFrameworkCore.PostgreSQL.wasm",
        "name": "Npgsql.EntityFrameworkCore.PostgreSQL.cupklhiqjo.wasm",
        "hash": "sha256-1HjiMYBr190JgmDDJTRDX3FiTrjioMTrNi+Rnzd7FA0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Radzen.Blazor.wasm",
        "name": "Radzen.Blazor.h573efuu5x.wasm",
        "hash": "sha256-9RDxFqlwwEYJMCMCSrVHOx0dlrBeTNSn8B/izhAPG2o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ClientModel.wasm",
        "name": "System.ClientModel.dhw1jmor6y.wasm",
        "hash": "sha256-T1pFREfxhQaqFL6Vw2apj9rx9kFq+3Z3Ogf2bplL0hw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Configuration.ConfigurationManager.wasm",
        "name": "System.Configuration.ConfigurationManager.h4r5q8xowu.wasm",
        "hash": "sha256-b12tS5PK3J7aZQf8ndpxprZkG3L77KegByXvugeqqlc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.EventLog.wasm",
        "name": "System.Diagnostics.EventLog.yy9ehxokrt.wasm",
        "hash": "sha256-BoHdJ8SQpDvjLLQgL0QaF0swZpTPczHyn3YSE7GnG2c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IdentityModel.Tokens.Jwt.wasm",
        "name": "System.IdentityModel.Tokens.Jwt.28de5g3cun.wasm",
        "hash": "sha256-jjAptokOXSXKs5qsKrmqiqE1SuTQT3MMuEZf2+qUlgc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.Data.wasm",
        "name": "System.Memory.Data.0l4fa57vc1.wasm",
        "hash": "sha256-9HJzi9HTlbVv4UJOpWjMcL4XHstwjkbQdwxxP+dUHfQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.ProtectedData.wasm",
        "name": "System.Security.Cryptography.ProtectedData.mhm09hjv4f.wasm",
        "hash": "sha256-2u7Te336De8AXpatvqOYyTAxt1+kUT5fYgpQONuApG4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.ao8xcxuy5t.wasm",
        "hash": "sha256-Krob7DskJOpLaZWhAiSUthmfF5e2aGw28rwtp8AJ+/Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.uj9314zref.wasm",
        "hash": "sha256-GnRA4+zcKZIrtYPDtPGbNP5vA+ED1PwJmByTxUNhh1w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.lzpg3fl6uo.wasm",
        "hash": "sha256-kTaIO1DAQKUUpZvMeVki+3lc78hV+U60AKHfMAJxiwc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.fhzs3bmg5t.wasm",
        "hash": "sha256-o/HOsAVZ19gV3+XMKNbg7qjEihoeU3PUzMnbsqLeXE4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.eu2e9cepqv.wasm",
        "hash": "sha256-GoHimo8HIqGd6EfWzMZ5ptnu4SB65+BcemBGMH5rQY8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.dy1va9duga.wasm",
        "hash": "sha256-pXkdRaghZTkIgaj7K44T1em+dVsGRXLEw3XhhEWMkw0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.pgs05titxs.wasm",
        "hash": "sha256-Gamy9tmUoiQCh/ZZIXj/FrBxtdV6qapLAxiFlgtt4NU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.ctwegl9r7k.wasm",
        "hash": "sha256-oHHjOknnsdYQoL8G4HzXekMViF4cciul9ZsnLuySBEU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.4wpj70kond.wasm",
        "hash": "sha256-1LDP0tecMt9tL/QdoiDr+gbx6x0sXbOQ/46QjeCMpjA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.lq0winj0n3.wasm",
        "hash": "sha256-vQlaU5rai0wyETIE6r1avrqcvnpiUXBRIGlYkZBS4o4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.aydjeji7lp.wasm",
        "hash": "sha256-nlgFnIeeN2vaUn/K1HFaQLjkzPiywW66S5h5cjdY8BM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.uq1utwjjcf.wasm",
        "hash": "sha256-VhHmtl72aCJvIzLmLpmknsb6dmJUFbumCxP/hPbK1LY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.vkph4sefmh.wasm",
        "hash": "sha256-v69fvMyRw2MLYdCm6c8qEDEkwXngA3Mc83Q+EdySs3s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.qkkniebxiw.wasm",
        "hash": "sha256-6gFBZjR+DFMaK0cB+6J8MxAhIEdkGeNBdFFzM3ztGQE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.esccyrvqzf.wasm",
        "hash": "sha256-vunjWecyHAw9p3AK2FH1tYQZQink8dRJqJxigB6ATpo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.3he78sx09e.wasm",
        "hash": "sha256-+bJxcJhLqPLIK1o9qXjJVW2RFNnUg7izY/ZIW5x9MCI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.0jeguu0qcn.wasm",
        "hash": "sha256-dLxpmosjnWTGuLNyq7f/gaDMXla5Fkl99smB5JxFnNY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.12yh6ow89m.wasm",
        "hash": "sha256-VxPVPdjUTSOgEpYof4Xt6A7zYsRh1BrraqHgf42fQTk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.vc8xujuom9.wasm",
        "hash": "sha256-cW25zeEQ36K1AbKYGYrPXkG1Sjo6oceUppL/Hhse6Gc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.eoy605btoz.wasm",
        "hash": "sha256-8ua+qdd9cIeWu2a4JhkFYRQWaM2MqBzWkb6OG+LkhIE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.4rg1969tw2.wasm",
        "hash": "sha256-EFyUvWxxTXJTGqJ9+t+y7DFW3GvITwCOLKTh5J3grHQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.u2yalkg4b6.wasm",
        "hash": "sha256-+i9M56pVn/GMPC9adMYhiqJnUwVUVA/TNNHIFiqY5cM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.x3tbi2ovby.wasm",
        "hash": "sha256-472OuJe467nreO+5d9kqh4VlGedAq+U3blBK8xxRP9c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.5dprdqxysk.wasm",
        "hash": "sha256-KR4XQLWxBfglktCxNf/H+AJA89MLVJMOO6Yf5B2b6lU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.oalavirtk5.wasm",
        "hash": "sha256-sH5i6ec85HmlHUx+6jhI4ZRLMgvMtNiMhiJ13cUX7ww=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.cwve1noz5c.wasm",
        "hash": "sha256-/DXapAE451Y69J36O7ZWTcwJYDybleuD7nYhM00LzF4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.oilugtpbul.wasm",
        "hash": "sha256-kEPU5H/i+7iJmo975f5GKaaDlfZEh56IuRA+jOZTxQQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.sly5as9fvq.wasm",
        "hash": "sha256-cMiCymfILOwfpSpM1XVT6EWpk4+qZ0djyeZE+xuHjbg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.07by3jgqle.wasm",
        "hash": "sha256-LPyPH6L+Wd8g2tocBxopNgP88V/pEK6/QosScJt/4jk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.1b4s6p00v9.wasm",
        "hash": "sha256-zc5KGlP1rAJ6kJJrlLLHHU8z5pyIHq6hIvBhiIcChcs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.ctysavw5h3.wasm",
        "hash": "sha256-QAU1ee052SRus2JcoASHru/WsnU8stWaYe3ZcRPXNlk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.0h9kcny7fs.wasm",
        "hash": "sha256-DGsGX/JNxcWvLgewnk4ZNVx79HPFi0OXgWcaOaHDsHo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.6neldakfv7.wasm",
        "hash": "sha256-ni1bga8i4seiNb0Phw1ryvW/BFMsHjQw2Z43b82xLTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.mchmjemecu.wasm",
        "hash": "sha256-VswidE/5lUxJi4WjGMZu1Teh10p6LjGr4irg7TyssHY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.f8ij89n26g.wasm",
        "hash": "sha256-8WCYEzD9s07qIJEQPSlGdoNH+XurZSC5U2uxrw034i8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.p8bc5k32gq.wasm",
        "hash": "sha256-F5eQ5w7cgGD0AiLhZocDO5eoCZEuRO0w/HAx9lCyYco=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.auzwyxwdg7.wasm",
        "hash": "sha256-jrx6HPA0MdjKUx9fRgZ3rJTLURIXZV2HxbG8ahK75mU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.pxtl9yjxq3.wasm",
        "hash": "sha256-zWuKkSBvG/NzrnNdWMwE3g2ng7FnuGJ+zzkhg7mKqjs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.burmbufzbm.wasm",
        "hash": "sha256-jfa+QDLuOC27g4CAwJuS6t7bjLjOvfWA2A9n8RXS/Jg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.uuplxm7r15.wasm",
        "hash": "sha256-Jn+2QXjDjbNORixwFknQqQmVSZ0Gfl/DrjUuLUj5Nwk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.ll3o4r17c1.wasm",
        "hash": "sha256-OcgZzRUJNNIQUPMZlTewVYMyOHAStupZzbXx78XCKKE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.mkgzsrk700.wasm",
        "hash": "sha256-piYXQ8Kmh58K/2PfTyuXAuVs0mOZK2DRrD5qSetwqNE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.vxs69ehjyg.wasm",
        "hash": "sha256-A0kRUl9AxLEFLNn0K9Y8GSNc4rcDcpAm5+EPJDJktiY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.zj7mpaqlc6.wasm",
        "hash": "sha256-QS8OcYLNl+PQyqmmsM+PRrKalfgbZ9kDhfEvjsn3Uuc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.0bedp1bmrm.wasm",
        "hash": "sha256-VOn4SCPm1wzV3gRPq+izf1wwF/h5JWHx1gsPImccxR8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.5fawipt7hm.wasm",
        "hash": "sha256-Px0g9BzMi6iOecOEItBvVk4XzqfO/q0OyyMeBfTboYg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.5zrci05qf4.wasm",
        "hash": "sha256-X8VMkL78f8zl8gs6RfALZaHdm057P+9K8z2TrNbbqSE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.08517zwm68.wasm",
        "hash": "sha256-sCNaE26yFeJyyqn2pmn+DmvHOW6W1c5r8p8wki66HwU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.65rsbezu43.wasm",
        "hash": "sha256-lvQRu8HVW0Oi/FFIOhFbm8Rh91NbibGtoCWYsjtHfho=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.bghff553sg.wasm",
        "hash": "sha256-5UbtPbBPm9eIiSJhDYGvb2uTymbeneVCUzEyfqZvx4k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.b7d9srq0hq.wasm",
        "hash": "sha256-FzNkahvtMm4zY+FPbOB9OTR8P9ebbepzW/duTyxYo8g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.spm7na80oq.wasm",
        "hash": "sha256-wM2FkHfdU4YGIgOoVkabq+L7fxj9cAhSPggxLJh6WHg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.hjcnb9o09w.wasm",
        "hash": "sha256-Pc6Mvz9NMJNfRP8uxUmVYlfvd7BMBFQq+5EDIY8HAfk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.m8f5h2sb3p.wasm",
        "hash": "sha256-ZlU2mYyLZlFgxTwtyhuZ0Es1fvOgoLzFc53Nxt5DjEU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.zm770pe3y5.wasm",
        "hash": "sha256-a8ZytIDhJNUTP2643R+/zhKtfscjsObKjK4UkztK6XI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.arw9zq9t9o.wasm",
        "hash": "sha256-FokKipZKz5Y3JB/ItAa/xnx7aDo9xahoNUxZ+idMEhk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.b8plukqgiq.wasm",
        "hash": "sha256-+8CKsGmxuqELYqH7he67zJpXZ9ZabnaJseavrRjgNOY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.pqlypl51wy.wasm",
        "hash": "sha256-kV86NFNe2SptrFRQrMo1md3ySyaUgfnoLkbeX90iYI0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.fqpamw3bsl.wasm",
        "hash": "sha256-x+bJLhDBGPZOZ/H4Sb+OO5agpeWtODaT6KDfvTSGHdQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.fsprrwmbw2.wasm",
        "hash": "sha256-T1YsfPo4bD1ozLpTzTaDslc/bNwb4MvV5WrdQyRorBM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.9nei3qybrq.wasm",
        "hash": "sha256-W3rBzUL01VSs3268RkgNP3yC5hHVtYwqeV8wu0nG964=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.iolwqnqp4j.wasm",
        "hash": "sha256-PtTNM/M+70Tmv1A1VS9RoiTkhKHnw89rfPYNlCa60iU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.ujjmlrd69p.wasm",
        "hash": "sha256-hiLgFJjsPpzhkK/WGprDk04MTy1t9WE/8ElZ1joZUgs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.n2r022ff79.wasm",
        "hash": "sha256-D8PL2Zicdm4VkczjoWiI+bEKrlHPAM48KYI3Uoq7uVY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.tlc60g1gn1.wasm",
        "hash": "sha256-rypjgkbCbLKGk1uXxXQlI25SI/irOCNfbF26PnGve4E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.v92a8shsad.wasm",
        "hash": "sha256-/c3k4DddsfTkctWfiqSEupb8ygRAN4IPO7uZ1kjzYH4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.7qmldn65vo.wasm",
        "hash": "sha256-T+9RdfUBfnlvro21wk8VmmYe3ZDfKiYEBbJPCfLiuds=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.kftezwapia.wasm",
        "hash": "sha256-gBAr2Wx3Mba43y96xGTJ9V6RmeGQah5J2yr4TJ7cpHY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.ksuf1hjtja.wasm",
        "hash": "sha256-pD7ge1k9rqQMlX9mRsueYn/w8GG+neR4URVFGJkpUuA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.lcdml4737j.wasm",
        "hash": "sha256-6x1Ee5nZSIC2dof82bxIUVz8nkqvY06l09PWXl3ZPTI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.nnqvudo0vd.wasm",
        "hash": "sha256-TbXBiQa38E2TrjWSwZYk9l9sTztp8pQ4MLJyVPBpaEk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.ohvaji2zg9.wasm",
        "hash": "sha256-7BiDrhwsQFNWptOu3vURxMW7gcRT3YSVLo5lECha1Dw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Accounting.Shared.Core.wasm",
        "name": "Accounting.Shared.Core.i6rup29rfs.wasm",
        "hash": "sha256-5skMzs+GHTjn0cO7uC/6RpaZqg6pxt5Fook4L3LyIcs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Component.Budgeting.wasm",
        "name": "CompanyApp.Component.Budgeting.vew9or5ipn.wasm",
        "hash": "sha256-V0DeM8ZitcIQOnQTc4waCfGwMcBBe7wOL1ocv4sX9jk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Component.Council.Activity.wasm",
        "name": "CompanyApp.Component.Council.Activity.equs2zgvmd.wasm",
        "hash": "sha256-agfPivn71jPz1G31/HNzJ0t5Sqkz936AeCnzPwOk5XU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Component.Council.Dashboard.wasm",
        "name": "CompanyApp.Component.Council.Dashboard.pk9zu1cg1u.wasm",
        "hash": "sha256-OV326VkV8/kesV9uvyrn7KUyBrfLy+ay28Huzg4s9yw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Component.Council.Finance.wasm",
        "name": "CompanyApp.Component.Council.Finance.44w4sa3xfy.wasm",
        "hash": "sha256-bBBaSmX1BWmNgtF4ae4JBaMQfIqbgAb5+hfMhN5nAno=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Component.CouncilCdf.wasm",
        "name": "CompanyApp.Component.CouncilCdf.hv95uwgl09.wasm",
        "hash": "sha256-PV+Z+q8VBUIxcvdvuF69DX1bzFPXsEMAYblSTqJ7n+w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Component.Integrated.Plans.wasm",
        "name": "CompanyApp.Component.Integrated.Plans.hu5veeifeu.wasm",
        "hash": "sha256-WdXMouB/0yBFNHnd75ZW5iu/s8fStqIZVsFKn2WvRT8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Component.Integration.wasm",
        "name": "CompanyApp.Component.Integration.ycapwelr7f.wasm",
        "hash": "sha256-sijLHAbz8Vd5DUm/BHpR/s+qXtnrGFpLVCTDT1WJ0wo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Component.Map.wasm",
        "name": "CompanyApp.Component.Map.2myvoqxbzs.wasm",
        "hash": "sha256-Bq8cflnrHivL6biP1ksLWRnclvZJIr7eitHK5qVkt8M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Component.Tenders.wasm",
        "name": "CompanyApp.Component.Tenders.287cechta5.wasm",
        "hash": "sha256-kn0aAOhSsx0UQ2wr8g4ebv3bjmeS7sgNwDLZnhCo1SM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Component.Urban.Plan.wasm",
        "name": "CompanyApp.Component.Urban.Plan.l1x8hc32wm.wasm",
        "hash": "sha256-SWoLNXlVqUdYB5yYIWyX2G5+waDprXB59MEzIRvkRo8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Component.Zoning.wasm",
        "name": "CompanyApp.Component.Zoning.9rbd770jm5.wasm",
        "hash": "sha256-xR9Q1o1xgE9Y4/7MTe8zphnAb+ECvsDCvgPpZqBEdr0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Components.ComplianceControls.wasm",
        "name": "CompanyApp.Components.ComplianceControls.5wkj5j66oe.wasm",
        "hash": "sha256-e97X8vaySL/6XBzQGvc/JPoac4f+16Phd/g+EyWY3pE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.DynamicForms.wasm",
        "name": "CompanyApp.DynamicForms.aymv25vd11.wasm",
        "hash": "sha256-8iuA170ZSaV/twV+6poAtk9KCts7WcHUBzH5s6AuaOw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Integration.Contracts.wasm",
        "name": "CompanyApp.Integration.Contracts.vv4ua8eoy9.wasm",
        "hash": "sha256-O74pMvWi3sAxUSC0MKpvpfXTaC7G75JcfJ0DO6Yw/ZI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Shared.Authorization.wasm",
        "name": "CompanyApp.Shared.Authorization.oxbie2wz3q.wasm",
        "hash": "sha256-FB2Xoj+Ucf2s6rnxvQnxjuqwB140KpNVrL4nrZuYOs4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CompanyApp.Shared.Filters.wasm",
        "name": "CompanyApp.Shared.Filters.usmudjlunz.wasm",
        "hash": "sha256-7veHz274Aj9VJuVb5PiCieKwxrz2l0w32kb78SGqHQo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Land.Property.Service.Model.wasm",
        "name": "Land.Property.Service.Model.4dppqb14y3.wasm",
        "hash": "sha256-WD2Ycm9DEMDtI0FwUPYKiv4QqmNYczQPA9CYex01vFA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CouncilWebApp.wasm",
        "name": "CouncilWebApp.3svbkv49kd.wasm",
        "hash": "sha256-XZrIeuRbv8/+0dWkOVgCu7ls36sbBzXwTKGd19ynugE=",
        "cache": "force-cache"
      }
    ],
    "satelliteResources": {
      "cs": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.vjudo1cua3.wasm",
          "hash": "sha256-FSi+F84+H7Hk1z5JPe82Px+mBi/k8J0Ycv+hMzsJ+fc=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.nfz5myq13k.wasm",
          "hash": "sha256-o8BKau5ps7cf4itFVzwtUT76WXP3XehZw+lbFpr9iUk=",
          "cache": "force-cache"
        }
      ],
      "es": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.7e021n5o5n.wasm",
          "hash": "sha256-fxsSpnxfv3Yd0i8pFwbWiPXpOjKQXTQM49O4G9kn5a4=",
          "cache": "force-cache"
        }
      ],
      "fr": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.vd5zj5snlp.wasm",
          "hash": "sha256-/VLEHLeiBKmN2SECeotijHB0LOt4P9s+4CIgotkcGlQ=",
          "cache": "force-cache"
        }
      ],
      "it": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.w99pdtvsr6.wasm",
          "hash": "sha256-zFMHAWepw0f8oIc3z5BAPPmIYcGZ5KnB+JZSQLQi+Pg=",
          "cache": "force-cache"
        }
      ],
      "ja": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.d96ga19on9.wasm",
          "hash": "sha256-T/6gpI0JikjkT84l4puHA/W2uiaVExbIZ68Lm12X3os=",
          "cache": "force-cache"
        }
      ],
      "ko": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.arkfoxc6k6.wasm",
          "hash": "sha256-Km3YZBl53Xr0pyLJdPahjvATvXtU8F2dxzDz+tkxnBk=",
          "cache": "force-cache"
        }
      ],
      "pl": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.00y9kt52i4.wasm",
          "hash": "sha256-YAxGdZY6uqxpWKQqOxqEREcPhpPL0Imhx9c6RneoW0Y=",
          "cache": "force-cache"
        }
      ],
      "pt-BR": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.m3ku9s19ra.wasm",
          "hash": "sha256-Qqo4wloD+eML9m33bDDEkuzedosZujF4ITrtwNtvoMU=",
          "cache": "force-cache"
        }
      ],
      "ru": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.jqczzrbiuu.wasm",
          "hash": "sha256-xVWqf+QUPN+Bo1s+GoMhlwlRy5P4SIB6Puny4fEc8IQ=",
          "cache": "force-cache"
        }
      ],
      "tr": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.jhesb0um5v.wasm",
          "hash": "sha256-V4McUi1vbdwEu3qdlkXXm0kIT3L66LlMP182hmxG0Xw=",
          "cache": "force-cache"
        }
      ],
      "zh-Hans": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.utbpxdep3k.wasm",
          "hash": "sha256-Ij0EJyXmEzkjeIBxPTxAvjF2BxeO39fVI8kdei3Ae/4=",
          "cache": "force-cache"
        }
      ],
      "zh-Hant": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.9forqk3e94.wasm",
          "hash": "sha256-ZY6wmJdtCgsbTG9YTW04eGc14VVKhDdGXE7uqTIRSEo=",
          "cache": "force-cache"
        }
      ]
    }
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "appsettings": [
    "../appsettings.json"
  ],
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Reflection.NullabilityInfoContext.IsSupported": true,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
