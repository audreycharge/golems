const statusEl = document.getElementById('status');
const logEl = document.getElementById('log');
const btn = document.getElementById('connect');
const gamebutton = document.getElementById('game');
var input_thing;
const decoder = new TextDecoder('utf-8');

function log(s){
  const d=document.createElement('div'); d.textContent=s; logEl.prepend(d);
  if (logEl.childElementCount>400) logEl.removeChild(logEl.lastChild);
}

async function readLoop(port){
  await port.open({ baudRate: 115200 });
  // statusEl.textContent = 'Status: connected @115200';
  const reader = port.readable.getReader();
  try{
    let buf = new Uint8Array(0);
    while(true){
      const { value, done } = await reader.read();
      if (done) break;
      if (!value) continue;

      var stringthing = decoder.decode(value);

      input_thing = stringthing;

      if (input_thing !== "\n") {
        console.log(input_thing)
        if (state == "title") {
          state = "battle"
          battleMusic.setVolume(0.3, 0, 0);
          battleMusic.play()
          selectMusic.stop()
          startScene()
          input_thing = null
        }
      }
    }
  } catch(e){
    log('Error: '+e);
  } finally {
    reader.releaseLock();
    await port.close();
    statusEl.textContent = 'Status: disconnected';
  }
}

async function getPort() {
  if (!('serial' in navigator)) { alert('Web Serial not supported in this browser'); return; }
  try{
    const port = await navigator.serial.requestPort();
    readLoop(port);
  } catch(e){
    console.log('Port open canceled/failed.');
  }
}

gamebutton.addEventListener('click', async ()=>{
  document.location = "game.html";
});
