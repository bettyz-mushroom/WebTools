window.showLabels = true;
let ahSlider = document.getElementById("ahInput");
let asSlider = document.getElementById("asInput");
let alSlider = document.getElementById("alInput");
let bhSlider = document.getElementById("bhInput");
let bsSlider = document.getElementById("bsInput");
let blSlider = document.getElementById("blInput");
ahSlider.addEventListener("input", onChange);
asSlider.addEventListener("input", onChange);
alSlider.addEventListener("input", onChange);
bhSlider.addEventListener("input", onChange);
bsSlider.addEventListener("input", onChange);
blSlider.addEventListener("input", onChange);
function onChange(ev) {
  window.ah = Number(ahSlider.value);
  window.as = Number(asSlider.value);
  window.al = Number(alSlider.value);
 window.bh = Number(bhSlider.value);
  window.bs = Number(bsSlider.value);
  window.bl = Number(blSlider.value);
  window.drawGradient();
}

document
  .getElementById("downloadButton")
  .addEventListener("click", downloadCanvasImage);

let labelButton = document.getElementById("labelButton");
labelButton.addEventListener("click", toggleLabels);

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
function toggleLabels() {
  window.showLabels = !window.showLabels;
  window.drawGradient();

  if (window.showLabels) {
    labelButton.textContent = "Hide Labels";
  } else {
    labelButton.textContent = "Show Labels";
  }
}

