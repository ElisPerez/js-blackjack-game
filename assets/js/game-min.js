const myModule=(()=>{"use strict";let e=[],t=["C","D","H","S"],r=["A","J","Q","K"],l=[];document.querySelector("#btnNew");let s=document.querySelector("#btnTake"),n=document.querySelector("#btnStop"),d=document.querySelectorAll(".divCards"),a=document.querySelectorAll("small"),o=(t=2)=>{e=i(),l=[];for(let r=0;r<t;r++)l.push(0);a.forEach(e=>e.innerText=0),d.forEach(e=>e.innerHTML=""),s.disabled=!1,n.disabled=!1},i=()=>{e=[];for(let l=2;l<=10;l++)for(let s of t)e.push(l+s);for(let n of t)for(let d of r)e.push(d+n);return _.shuffle(e)},c=()=>{if(0===e.length)throw"Deck empty";return e.pop()},u=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},$=(e,t)=>(l[t]=l[t]+u(e),a[t].innerText=l[t],l[t]),b=(e,t)=>{let r=document.createElement("img");r.src=`assets/cards/${e}.png`,r.classList.add("card-custom"),r.alt=`card-${e}`,d[t].append(r)},f=()=>{let[e,t]=l;setTimeout(()=>{t===e?alert("Nobody wins \uD83E\uDD37\uD83C\uDFFB"):e>21?alert("Computer Wins \uD83D\uDE1B"):t>21?alert("Player Wins \uD83D\uDE0E"):alert("Computer Wins \uD83D\uDE1B")},100)},h=e=>{let t=0;do{let r=c();t=$(r,l.length-1),b(r,l.length-1)}while(t<e&&e<=21);f()};return s.addEventListener("click",()=>{let e=c(),t=$(e,0);b(e,0),t>21?(console.warn("Sorry, You Lost"),s.disabled=!0,n.disabled=!0,h(t)):21===t&&(console.warn("21, Great"),s.disabled=!0,n.disabled=!0,h(t))}),n.addEventListener("click",()=>{s.disabled=!0,n.disabled=!0,h(l[0])}),{newGame:o}})();