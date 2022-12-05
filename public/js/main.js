(()=>{"use strict";var e,t,s;e=new class{constructor(){this.listFile=document.querySelector("#dataisi"),this.loading=document.querySelector("#loading"),this.numberend=0}getlistFile=()=>this.listFile;getnode=e=>{const t=document.createElement("div");let s=e.file_size/1024/1024<1?`${(e.file_size/1024).toFixed(2)} KB`:`${(e.file_size/1024/1024).toFixed(2)} MB`;return t.className="col",t.innerHTML=`\n      <div class="card shadow-sm">\n            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>${e.file_type}</title><rect width="100%" height="100%" fill="#db67fa"/><text x="50%" y="50%" fill="#fff" dy=".3em" class="text-break">${e.file_type}</text></svg>\n            <div class="card-body">\n                <p class="card-text">${e.file_name}</p>\n                <div class="d-flex justify-content-between align-items-center">\n                    <div class="btn-group">\n                        <a href="/files/get-file-by-id/${e.file_id}" class="btn btn-sm btn-outline-ungu"><i class="fas fa-download"></i></a>\n                        \x3c!-- <a href="/files/get-file-by-id/${e.file_id}" class="btn btn-sm btn-outline-secondary"><i class="fas fa-trash"></i></a> --\x3e\n                    </div>\n                    <small class="text-muted">${s}</small>\n                </div>\n            </div>\n        </div>\n    `,t};getAwal=async()=>{this.listFile&&await fetch("/files",{method:"GET"}).then((e=>e.json())).then((e=>{const t=e.data;t.forEach((e=>{this.listFile.appendChild(this.getnode(e))})),console.log(t)}))};fetchSearch=async e=>{this.loading.classList.remove("visually-hidden"),this.listFile.innerHTML="";const t=""===e?"/files":`/files/get-json-by-name/${e}`;await fetch(t,{method:"GET"}).then((e=>e.json())).then((e=>{this.loading.classList.add("visually-hidden");const t=e.data;console.log(t),t.forEach((e=>{this.listFile.appendChild(this.getnode(e))})),console.log(t)}))}},t=new class{constructor(){this.form=document.querySelector("#search"),this.value_search=document.querySelector('input[name="file_name"]')}getValueSearch=()=>this.value_search.value;onSubmit=e=>{this.form&&this.form.addEventListener("submit",e)}},s=new class{constructor(){this.listFilenew=document.querySelector("#dataisi"),this.form=document.querySelector("form#upload"),this.fileInput=document.querySelector(".file-input"),this.progressArea=document.querySelector(".progress-area"),this.uploadedArea=document.querySelector(".uploaded-area")}getnodenew=e=>{const t=document.createElement("div");let s=e.file_size/1024/1024<1?`${(e.file_size/1024).toFixed(2)} KB`:`${(e.file_size/1024/1024).toFixed(2)} MB`;return t.className="col",t.innerHTML=`\n      <div class="card shadow-sm">\n            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>${e.file_type}</title><rect width="100%" height="100%" fill="#db67fa"/><text x="50%" y="50%" fill="#fff" dy=".3em" class="text-break">${e.file_type}</text></svg>\n            <div class="card-body">\n                <p class="card-text">${e.file_name}</p>\n                <div class="d-flex justify-content-between align-items-center">\n                    <div class="btn-group">\n                        <a href="/files/get-file-by-id/${e.file_id}" class="btn btn-sm btn-outline-ungu"><i class="fas fa-download"></i></a>\n                        \x3c!-- <a href="/files/get-file-by-id/${e.file_id}" class="btn btn-sm btn-outline-secondary"><i class="fas fa-trash"></i></a> --\x3e\n                    </div>\n                    <small class="text-muted">${s}</small>\n                </div>\n            </div>\n        </div>\n    `,t};uploadFile=e=>{if(!this.form)return;let t=new XMLHttpRequest;t.open("POST","/files",!0),t.addEventListener("load",(e=>{console.log("hahahahahah",JSON.parse(t.response)),this.listFilenew.insertBefore(this.getnodenew(JSON.parse(t.response).data),this.listFilenew.children[0])})),t.upload.addEventListener("progress",(t=>{const{loaded:s,total:l}=t;console.log("di upload",t);let i,a=Math.floor(s/l*100),n=Math.floor(l/1e3);i=n<1024?n+" KB":(s/1048576).toFixed(2)+" MB";let o=`<li class="row">\n                            <i class="fas fa-file-alt"></i>\n                            <div class="content">\n                              <div class="details">\n                                <span class="name">${e} • Uploading</span>\n                                <span class="percent">${a}%</span>\n                              </div>\n                              <div class="progress-bar">\n                                <div class="progress" style="width: ${a}%"></div>\n                              </div>\n                            </div>\n                          </li>`;if(this.uploadedArea.classList.add("onprogress"),this.progressArea.innerHTML=o,s==l){this.progressArea.innerHTML="";let t=`<li class="row">\n                              <div class="content upload">\n                                <i class="fas fa-file-alt"></i>\n                                <div class="details">\n                                  <span class="name">${e} • Uploaded</span>\n                                  <span class="size">${i}</span>\n                                </div>\n                              </div>\n                              <i class="fas fa-check"></i>\n                            </li>`;this.uploadedArea.classList.remove("onprogress"),this.uploadedArea.insertAdjacentHTML("afterbegin",t)}}));let s=new FormData(this.form);t.send(s)};click=()=>{this.form&&this.fileInput&&this.form.addEventListener("click",(()=>{this.fileInput.click()}))};filechange=()=>{this.form&&this.fileInput&&(this.fileInput.onchange=({target:e})=>{console.log("oncahange");let t=e.files[0];if(t){if(console.log(t),t.size>=52428800)return alert("gabisa tolol maksimal 50MB");let e=t.name;if(e.length>=12){let t=e.split(".");e=t[0].substring(0,13)+"... ."+t[1]}this.uploadFile(e)}})}},e.getAwal(),t.onSubmit((s=>{s.preventDefault(),e.fetchSearch(t.getValueSearch())})),s.filechange(),s.click()})();