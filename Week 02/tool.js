let arSlider = document.getElementById("arInput");
let agSlider = document.getElementById("agInput");
let abSlider = document.getElementById("abInput");
let brSlider = document.getElementById("brInput");
let bgSlider = document.getElementById("bgInput");
let bbSlider = document.getElementById("bbInput");
arSlider.addEventListener("input", onChange);
agSlider.addEventListener("input", onChange);
abSlider.addEventListener("input", onChange);
brSlider.addEventListener("input", onChange);
bgSlider.addEventListener("input", onChange);
bbSlider.addEventListener("input", onChange);
function onChange(ev) {
  window.ar = Number(arSlider.value);
  window.ag = Number(agSlider.value);
  window.ab = Number(abSlider.value);
 window.br = Number(brSlider.value);
  window.bg = Number(bgSlider.value);
  window.bb = Number(bbSlider.value);
  window.drawGradient();
}

document
  .getElementById("downloadButton")
  .addEventListener("click", downloadCanvasImage);

function downloadCanvasImage() {
  let allCanvasesInThisDocument = document.getElementsByTagName("canvas");
  let p5Canvas = allCanvasesInThisDocument[0];

  p5Canvas.toBlob((blob) => {
    const imageUrl = URL.createObjectURL(blob);

    // create a link (anchor) element
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "image.png"; // Sets the default file name

    // add that link to the document's body and click on it
    document.body.appendChild(a);
    a.click();

    // remove the link the element and the URL
    document.body.removeChild(a);
    URL.revokeObjectURL(imageUrl);
  });
}

