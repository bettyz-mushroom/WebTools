function setup() {
  let canvas = createCanvas(400, 400);
canvas.parent("canvas-area");
  colorMode(HSL);
  noStroke();
  textFont("Space Grotesk");
  describe(
    'Horizontal stripes fading between light green at the top and dark blue at the bottom. The top stripe is labeled Color A, and the bottom stripe is labeled Color B.'
  );
  
drawGradient();
}

  // Top color
function drawGradient(){
  let colorA = color(window.ah, window.as, window.al);

  // Bottom color

  let colorB = color(window.bh, window.bs, window.bl);

  // Number of stripes
  let stripeCount = 12;

  // Divide height of canvas by number of stripes
  let stripeHeight = height / stripeCount;

  // Start at top of canvas,
  // repeat until at the bottom
  // move down by stripeHeight each time,
  for (let y = 0; y < height; y += stripeHeight) {
    // Convert y position to number between
    // 0 (top of canvas) and 1 (bottom of canvas)
    let fadeAmount = y / height;

    // Interpolate color
    let betweenColor = lerpColor(colorA, colorB, fadeAmount);

  // Draw stripe
    fill(betweenColor);
    rect(0, y, width, stripeHeight);
}
    
  

  // Draw text labels
  if (window.showLabels) {
  let margin = 5;
  let boxWidth = 60;
  let cornerRadius = 5;
  textAlign(CENTER, CENTER);
  fill(255);
  rect(margin, margin, boxWidth, stripeHeight - margin * 2, cornerRadius);
  fill(0);
  text('Color A', margin, margin, boxWidth, stripeHeight - margin * 2);
  fill(255);
  rect(
    5,
    height - stripeHeight + margin,
    boxWidth,
    stripeHeight - margin * 2,
    cornerRadius
  );
  fill(0);
  text(
    'Color B',
    5,
    height - stripeHeight + margin,
    60,
    stripeHeight - margin * 2
  );
}
}
window.drawGradient = drawGradient;
