(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const m={API_KEY:"rc_e0a26190dd18d531dbf9d5a030aab50462cf8398f64ba53e691b4daf30140199",MODEL:"Qwen/Qwen2.5-7B-Instruct",MAX_TOKENS:1e3,API_URL:"https://api.featherless.ai/v1/chat/completions"},s={messages:[],mode:"chat",loading:!1},E=`You are ClimaChat, a friendly and knowledgeable climate science tutor designed specifically for students aged 13–20. Your job is to make climate science exciting, clear, and approachable.

Guidelines:
- Use simple, engaging language appropriate for teenagers
- Use relatable analogies and real-world examples
- Be encouraging and curious in tone — like a cool science teacher
- Keep answers concise (3–5 sentences for simple questions, a bit longer for complex ones)
- Use emojis sparingly but effectively to make responses lively
- When relevant, offer a follow-up "Did you know?" fun fact
- In MYTH BUSTER mode: clearly label the claim as TRUE, FALSE, or PARTLY TRUE, then explain why with evidence

You care deeply about the planet and want students to feel empowered, not hopeless.`,L=[{emoji:"🌡️",label:"Global Warming",question:"What actually causes global warming, and why does it matter?"},{emoji:"🌊",label:"Rising Seas",question:"Why are sea levels rising and which places are most at risk?"},{emoji:"🌿",label:"Carbon Sinks",question:"What are carbon sinks and why are forests so important?"},{emoji:"⚡",label:"Clean Energy",question:"How does solar energy work and can it power the whole world?"},{emoji:"🐝",label:"Biodiversity",question:"How does climate change affect animals and ecosystems?"},{emoji:"🌾",label:"Food & Farming",question:"How does climate change threaten our food supply?"}],M=["Climate change is natural and has nothing to do with humans.","It's too cold outside, so global warming isn't real.","CO2 is plant food, so more of it is actually good.","Scientists disagree about whether climate change is happening."];async function T(e){var n,o,l;const t=[{role:"system",content:E},...e.map(f=>({role:f.role,content:f.content}))],r=await(await fetch(m.API_URL,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m.API_KEY}`},body:JSON.stringify({model:m.MODEL,max_tokens:m.MAX_TOKENS,messages:t})})).json();if(r.error)throw new Error(r.error.message||"Unknown API error");return((l=(o=(n=r.choices)==null?void 0:n[0])==null?void 0:o.message)==null?void 0:l.content)||"Sorry, I couldn't get a response."}const i=e=>document.getElementById(e);function u(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function p(e){S(),A();const t=i("body-area");s.messages.length===0?(t.innerHTML=I(),t.querySelectorAll("[data-question]").forEach(a=>{a.addEventListener("click",()=>e(a.dataset.question))})):i("messages-list")||(t.innerHTML='<div class="messages" id="messages-list"></div>',s.messages.forEach(a=>b(a)))}function g(e){v(),b(e),w()}function $(){v();const e=i("messages-list");if(i("typing-indicator"))return;const t=document.createElement("div");t.id="typing-indicator",t.className="msg-row bot",t.innerHTML=`
    <div class="avatar">🌍</div>
    <div class="typing-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `,e.appendChild(t),w()}function y(){var e;(e=i("typing-indicator"))==null||e.remove()}function h(){const e=i("chat-input"),t=i("send-btn");!e||!t||(t.disabled=s.loading||!e.value.trim())}function v(){i("messages-list")||(i("body-area").innerHTML='<div class="messages" id="messages-list"></div>')}function b(e){const t=i("messages-list"),a=document.createElement("div");a.className=`msg-row ${e.role==="user"?"user":"bot"}`,a.innerHTML=`
    ${e.role==="assistant"?'<div class="avatar">🌍</div>':""}
    <div class="bubble ${e.role==="user"?"user":"bot"}">${u(e.display)}</div>
  `,t.appendChild(a)}function w(){const e=i("messages-list");e&&(e.scrollTop=e.scrollHeight);const t=i("body-area");t&&(t.scrollTop=t.scrollHeight)}function S(){i("btn-chat").classList.toggle("active",s.mode==="chat"),i("btn-myth").classList.toggle("active",s.mode==="myth")}function A(){const e=i("chat-input"),t=i("send-btn"),a=s.mode==="myth";e.placeholder=a?'Paste a climate claim, e.g. "Electric cars are worse for the environment"':"Ask anything about climate science...",e.classList.toggle("myth-mode",a),t.classList.toggle("myth-mode",a),t.textContent=a?"🔍 Check":"↑",t.disabled=s.loading||!e.value.trim()}function I(){const e=s.mode==="myth";return`
    <div class="empty-state">
      <div class="empty-hero">
        <div class="hero-emoji">${e?"🔍":"🌱"}</div>
        <h1>${e?"Bust a Climate Myth":"What's on your mind?"}</h1>
        <p>${e?"Paste a climate claim you've heard — I'll tell you if it's TRUE, FALSE, or somewhere in between.":"Ask me anything about climate science. No question is too big or too small."}</p>
      </div>
      ${e?C():P()}
    </div>
  `}function P(){return`
    <div class="section-label">Start with a topic</div>
    <div class="topic-grid">${L.map(t=>`
    <button class="topic-card" data-question="${u(t.question)}">
      <div class="card-emoji">${t.emoji}</div>
      <div class="card-label">${t.label}</div>
      <div class="card-desc">${u(t.question)}</div>
    </button>
  `).join("")}</div>
  `}function C(){return`
    <div class="section-label">Try one of these</div>
    <div class="myth-list">${M.map(t=>`
    <button class="myth-card" data-question="${u(t)}">
      <span>💬</span> "${u(t)}"
    </button>
  `).join("")}</div>
  `}const c=e=>document.getElementById(e);async function d(e){if(!e.trim()||s.loading)return;const t=s.mode==="myth"?`[MYTH BUSTER MODE] Please fact-check this climate claim: "${e}"`:e,a={role:"user",display:e,content:t};s.messages.push(a),s.loading=!0,c("chat-input").value="",h(),g(a),$();try{const r=await T(s.messages),n={role:"assistant",display:r,content:r};s.messages.push(n),y(),g(n)}catch(r){const n=r.message.includes("403")?"💡 403 = model not available on your plan. Try a smaller model in src/config.js.":"💡 Check your VITE_API_KEY in .env is correct.",o={role:"assistant",display:`❌ ${r.message}

${n}`,content:""};s.messages.push(o),y(),g(o)}s.loading=!1,h()}function k(){c("btn-chat").addEventListener("click",()=>{s.mode!=="chat"&&(s.mode="chat",s.messages=[],s.loading=!1,p(d))}),c("btn-myth").addEventListener("click",()=>{s.mode!=="myth"&&(s.mode="myth",s.messages=[],s.loading=!1,p(d))}),c("send-btn").addEventListener("click",()=>d(c("chat-input").value)),c("chat-input").addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),d(c("chat-input").value))}),c("chat-input").addEventListener("input",h),p(d)}k();
