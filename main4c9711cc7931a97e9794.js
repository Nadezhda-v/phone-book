!function(){"use strict";var e={d:function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r:function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{renderContacts:function(){return r},renderPhoneBook:function(){return d}});const n=e=>JSON.parse(localStorage.getItem(e))||[],o=e=>{localStorage.setItem("contacts",JSON.stringify(e))},a=(e,t)=>{const a=n("contacts"),c=a.findIndex((t=>t.phone===e));-1!==c&&(a[c].name=t.querySelector(".cell-name").textContent,a[c].surname=t.querySelector(".cell-surname").textContent,a[c].phone=t.querySelector(".cell-phone a").textContent,o(a))},c=e=>{const t=document.createElement("div");return t.classList.add("container"),e&&t.classList.add(e),t},s=e=>{const t=document.createElement("div");t.classList.add("btn-wrapper");const n=e.map((e=>{let{className:t,type:n,text:o,svg:a}=e;const c=document.createElement("button");if(c.className=t,c.type=n,a){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.innerHTML=a,c.appendChild(e)}else c.textContent=o;return c}));return t.append(...n),{btnWrapper:t,buttons:n}},l=e=>{let{name:t,surname:n,phone:o}=e;const a=document.createElement("tr");a.classList.add("contact");const c=document.createElement("td");c.classList.add("delete");const l=document.createElement("button");l.classList.add("del-icon"),c.append(l);const r=document.createElement("td");r.classList.add("cell-name"),r.textContent=t;const d=document.createElement("td");d.classList.add("cell-surname"),d.textContent=n;const i=document.createElement("td");i.classList.add("cell-phone");const m=document.createElement("a");m.classList.add("d-block"),m.href=`${o}`,m.textContent=o;const u=document.createElement("td");a.phoneLink=m;const p=s([{className:"btn btn-edit",type:"button",svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"\n        xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="linear-gradient"\n        gradientUnits="userSpaceOnUse"\n        x1="2" x2="29.478" y1="16.276" y2="16.276">\n        <stop offset="0" stop-color="#0fdcdd"></stop>\n        <stop offset="1" stop-color="#46a1e8"></stop>\n        </linearGradient>\n        <g id="_23_Edit" data-name="23 Edit">\n        <path d="m28.6 4.17-.77-.77a3.075 3.075 0 0 0 -4.24 0l-4.6 4.6\n        h-13.99a3.009 3.009 0 0 0 -3 3v16a3.009 3.009 0 0 0 3 3\n        h16a3.009 3.009 0 0 0 3-3v-13.99l4.6-4.6a3 3 0 0 0 0-4.24\n        zm-2.18.64.77.77a1.008 1.008 0 0 1 0 1.42l-.353.353-2.19-2.19.353-.353\n        a1.047 1.047 0 0 1 1.42 0zm-3.188 1.768 2.19 2.19-11.522 11.523\n        -2.19-2.19zm-12.663 13.211 1.542 1.542-2.831 1.079zm11.431 7.211\n        a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1-1v-16a1 1 0 0 1 1-1\n        h11.99l-7.39 7.388-.01.012-.008.012-.012.012a.831.831 0 0 0 \n        -.19.26l-3.03 6.136a1 1 0 0 0 1.26 1.37l6.62-2.53a.929.929 0 0 0 .35\n        -.23l.012-.012.012-.008.008-.012 7.388-7.388z" \n        fill="url(#linear-gradient)" style="fill: rgb(87, 137, 122);">\n        </path></g></svg>'}]);return u.append(...p.buttons),i.append(m),a.append(c,r,d,i,u),a},r=(e,t)=>{const n=t.map(l);e.append(...n)},d=(e,t)=>{const n=(()=>{const e=document.createElement("header");e.classList.add("header");const t=c();return e.append(t),e.headerContainer=t,e})(),o=(e=>{const t=document.createElement("h1");return t.classList.add("logo"),t.textContent=`Телефонный справочник ${e}`,t})(t),a=(()=>{const e=document.createElement("main"),t=c("main__container");return e.append(t),e.mainContainer=t,e})(),l=s([{className:"btn mr-3 btn-add",type:"button",text:"Добавить"},{className:"btn btn-del",type:"button",text:"Удалить"}]),r=(()=>{const e=document.createElement("table");e.classList.add("table","table-striped");const t=document.createElement("thead");t.insertAdjacentHTML("beforeend",'\n    <tr>\n      <th class=\'delete\'>Удалить</th>\n      <th class="col-3 th-cell cell-name">Имя</th>\n      <th class="col-3 th-cell cell-surname">Фамилия</th>\n      <th class="col-3">Телефон</th>\n      <th class="col-3">Действия</th>\n    </tr>\n  ');const n=document.createElement("tbody");return e.append(t,n),e.tbody=n,e.thead=t,e})(),{form:d,overlay:i}=(()=>{const e=document.createElement("div");e.classList.add("form-overlay");const t=document.createElement("form");t.classList.add("form"),t.insertAdjacentHTML("beforeend",'\n    <button class="close" type="button"></button>\n    <h2 class="form-title">Добавить контакт</h2>\n\n    <div class="form-group">\n      <label class="form-label" for="name">Имя:</label>\n      <input class="form-input" name="name" \n        id="name" type="text" maxlength="15" required>\n    </div>\n\n    <div class="form-group">\n      <label class="form-label" for="surname">Фамилия:</label>\n      <input class="form-input" name="surname" \n        id="surname" type="text" maxlength="15" required>\n    </div>\n\n    <div class="form-group">\n      <label class="form-label" for="phone">Телефон:</label>\n      <input class="form-input" name="phone" \n        id="phone" type="text" required>\n    </div>\n  ');const n=s([{className:"btn btn-add mr-3",type:"submit",text:"Добавить"},{className:"btn btn-cancel",type:"reset",text:"Отмена"}]);return e.append(t),t.append(...n.buttons),{overlay:e,form:t}})(),m=(e=>{const t=document.createElement("footer");t.classList.add("footer");const n=c(),o=document.createElement("span");return o.textContent=`Все права защищены ©${e}`,t.append(n),n.append(o),t})(t);return e.append(n,a,m),n.headerContainer.append(o),a.mainContainer.append(l.btnWrapper,r,i),{list:r.tbody,logo:o,buttonAdd:l.buttons[0],formOverlay:i,form:d,buttonDel:l.buttons[1],headerList:r.thead}},i=e=>/^[а-яА-ЯёЁ]+$/.test(e),m=(e,t)=>{const n=t.textContent;e.forEach((e=>{e.addEventListener("mouseenter",(()=>{t.textContent=e.phoneLink.textContent})),e.addEventListener("mouseleave",(()=>{t.textContent=n}))}))},u=(e,t,n)=>{const o=[];e&&[...t.querySelectorAll(".contact")].forEach((t=>{const n=t.querySelector(e).textContent;o.push({data:n,row:t})}));const a=void 0===n||n;o.sort(((e,t)=>a?e.data.localeCompare(t.data):t.data.localeCompare(e.data)));const c=o.map((e=>e.row));t.innerHTML="",t.append(...c),((e,t)=>{const n={column:e,isAscending:t};localStorage.setItem("sortContacts",JSON.stringify(n))})(e,a)},p=(e,t)=>{const n=e.target;"Backspace"===e.key&&0===n.textContent.length&&e.preventDefault(),n.textContent.length>=t&&"Backspace"!==e.key&&e.preventDefault()};var h={hoverRow:m,sortContacts:u,handleSortContacts:(e,t)=>{let n=!1;e.addEventListener("click",(e=>{const o=e.target.closest("th");if(o.classList.contains("cell-name")||o.classList.contains("cell-surname")){const e="."+o.classList[2];n=!n,u(e,t,n)}}))},modalControl:(e,t)=>{const n=()=>{t.classList.remove("is-visible")};return e.addEventListener("click",(()=>{t.classList.add("is-visible"),(()=>{const e=document.querySelector("#name"),t=document.querySelector("#surname"),n=document.querySelector("#phone");e.addEventListener("input",(()=>{e.value=e.value.replace(/[^а-яА-ЯёЁ]/g,"")})),t.addEventListener("input",(()=>{t.value=t.value.replace(/[^а-яА-ЯёЁ]/g,"")})),n.addEventListener("input",(()=>{let e=n.value.replace(/[^+\d]/g,"");e.includes("+")&&(e=e.replace(/\+/g,""),e=e.replace(e.slice(0,1),7),e="+"+e),e.includes("+")?n.value=e.length>12?e.slice(0,12):e:n.value=e.length>11?e.slice(0,11):e}))})()})),t.addEventListener("click",(e=>{const o=e.target;(o===t||o.closest(".close")||o.closest(".btn-cancel"))&&n()})),{closeModal:n}},deleateControl:(e,t)=>{e.addEventListener("click",(()=>{document.querySelectorAll(".delete").forEach((e=>{e.classList.toggle("is-visible")}))})),document.addEventListener("click",(n=>{const o=n.target;o.classList.contains("del-icon")||t.contains(o)||e.contains(o)||document.querySelectorAll(".delete").forEach((e=>{e.classList.remove("is-visible")}))})),t.addEventListener("click",(e=>{const t=e.target;if(t.classList.contains("del-icon")){const e=t.closest(".contact"),a=e.querySelector(".cell-phone a").textContent;e.remove(),(e=>{const t=n("contacts"),a=t.findIndex((t=>t.phone===e));t.splice(a,1),o(t)})(a)}}))},formControl:(e,t,a,c)=>{e.addEventListener("submit",(s=>{s.preventDefault();const r=new FormData(s.target);((e,t,a)=>{const c=l(e);t.append(c),m([c],a),(e=>{const t=n("contacts");t.push(e),o(t)})(e)})(Object.fromEntries(r),t,c),e.reset(),a()}))},editContactControl:e=>{e.addEventListener("click",(e=>{e.target.closest(".btn-edit")&&(e=>{const t=e.target.closest(".contact"),o=t.querySelector(".cell-phone"),c=t.querySelector(".cell-name"),s=t.querySelector(".cell-surname"),l=t.querySelector(".cell-phone a"),r=c.textContent,d=s.textContent,m=l.textContent;t.classList.add("select-line"),c.contentEditable=!0,s.contentEditable=!0,o.contentEditable=!0,l.contentEditable=!0,c.addEventListener("keydown",(e=>p(e,15))),s.addEventListener("keydown",(e=>p(e,15))),o.addEventListener("keydown",(e=>p(e,12))),t.prevData={name:r,surname:d,phone:m};const u=e=>{t.contains(e.target)||((e=>{const t=e.querySelector(".cell-phone"),o=e.querySelector(".cell-name"),c=e.querySelector(".cell-surname"),s=e.querySelector(".cell-phone a"),l=o.textContent,r=c.textContent,d=s.textContent;s.setAttribute("href",d);const m=i(l),u=i(r),p=(e=>{if(!/^\+?\d{11}$/.test(e))return!1;const t=n("contacts").findIndex((t=>t.phone===e));return-1===t||(console.log(t),!1)})(d);e.classList.remove("select-line"),o.contentEditable=!1,c.contentEditable=!1,t.contentEditable=!1,s.contentEditable=!1,p?a(e.prevData.phone,e):(s.textContent=e.prevData.phone,s.setAttribute("href",e.prevData.phone)),m&&u?a(e.prevData.phone,e):(o.textContent=e.prevData.name,c.textContent=e.prevData.surname)})(t),document.removeEventListener("click",u))};document.addEventListener("click",u)})(e)}))}};const{renderPhoneBook:v,renderContacts:b}=t,{modalControl:f,deleateControl:g,formControl:y,sortContacts:E,handleSortContacts:L,hoverRow:C,editContactControl:x}=h;((e,t)=>{const o=document.querySelector("#app"),a=n("contacts"),{column:c,isAscending:s}=JSON.parse(localStorage.getItem("sortContacts"))||{column:"",isAscending:""},{list:l,logo:r,buttonAdd:d,formOverlay:i,buttonDel:m,headerList:u,form:p}=v(o,"");b(l,a);const{closeModal:h}=f(d,i);g(m,l),y(p,l,h,r),L(u,l),E(c,l,s),C(l.querySelectorAll(".contact"),r),x(l)})()}();