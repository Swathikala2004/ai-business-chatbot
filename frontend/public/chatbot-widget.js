(function () {
  const box = document.createElement("div");

  box.innerHTML = `
    <div style="
      position:fixed;
      bottom:20px;
      right:20px;
      width:360px;
      height:520px;
      background:white;
      border-radius:20px;
      box-shadow:0 10px 40px rgba(0,0,0,0.25);
      overflow:hidden;
      z-index:99999;
      font-family:Arial;
    ">
      <div style="
        height:55px;
        background:#4f46e5;
        color:white;
        padding:16px;
        font-weight:bold;
        box-sizing:border-box;
      ">
        AI Business Chatbot
      </div>

      <iframe
        src="http://localhost:5173/widget-chat"
        style="width:100%;height:465px;border:none;display:block;"
      ></iframe>
    </div>
  `;

  document.body.appendChild(box);
})();