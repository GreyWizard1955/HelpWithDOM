var slSpcs = [0, 256, 128, 1];
var vals = [0, 0, 0, 0];
var rows = [50, 90];
var cols = [40, 72, 106, 136];
var labelNames = ["Red", "Green", "Blue", "Alpha"];
var labels = [];
var sliders = [];
var sliderMoved = -1;

var values = [];
// var table;
var data;
var rowColor = {};
var webColors = [];
var headings = [];

var sortedHex = [];

// var debugging = false;

function preload() {
  data = loadJSON("colors.json");
}

function setup() {
  for (var i = 0; i < 5; i++) {
    headings[i] = data.fields[i];
  }
  var s;
  for (var r = 0; r < data.data.length; r++) {
    rowColor = [];
    var dataValues = data.data[r];
    for (var c = 0; c < 5; c++) {
      s = dataValues[c];
      rowColor[c] = headings[c] + ":" + s;
    }
    webColors[r] = rowColor;
  }
  sortedHex = webColors;
  var name = "";
  var hexVal = "";
  createP('Select Current Color:');
  currentSelectedColor = createSelect();
  currentSelectedColor.option("");
  currentSelectedColor.style('width', '400px');
  selectButton = createButton('Select Current Color');
  selectButton.mousePressed(setCurrentColor);
  createP('');
  for (var i = 0; i < webColors.length; i++) {
    name = webColors[i][0].substring(5);
    hexVal = webColors[i][1].substring(4);
    currentSelectedColor.option(name + " -- " + hexVal);
  }
  createP('');
  createCanvas(300, 125);
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetColors)

  values = [128, 128, 128, 255];
  setupTheForm();
}

function draw() {
  for (var i = 0; i < labelNames.length; i++) {
    values[i] = sliders[i].value();
  }
  background(values[0], values[1], values[2], values[3]);
  textSize(32);
  fill(255);
  text('R G B A', cols[0], rows[0]);
  fill(values[0], 0, 0);
  text('R', cols[0], rows[1]);
  fill(0, values[1], 0);
  text('G', cols[1], rows[1]);
  fill(0, 0, values[2]);
  text('B', cols[2], rows[1]);
  fill(255, 255, 255, values[3]);
  text('A', cols[3], rows[1]);
}

function setupTheForm() {
  for (var i = 0; i < labelNames.length; i++) {
    labels[i] = setupPara(labelNames[i], labels[i]);
    sliders[i] = setupSlider(labelNames[i], sliders[i], values[i]);
  }
}

function removeTheForm() {
  for (var i = 0; i < labelNames.length; i++) {
    labels[i].remove();
    sliders[i].remove();
  }
}

function setupPara(tag, para) {
  para = createP(tag);
  return para;
}

function setupSlider(tag, slider, value) {
  var s = tag.toLowerCase();
  if (s != "alpha") {
    slider = createSlider(slSpcs[0], slSpcs[1], value, slSpcs[3]);
  } else {
    slider = createSlider(slSpcs[0], slSpcs[1], value, 1);
  }
  return slider;
}

function resetColors() {
  removeTheForm();
  values = [128, 128, 128, 256];
  setupTheForm();
}

function setCurrentColor() {
  var s = currentSelectedColor.value();
  console.log(s);
  if (s != "") {
    var h = s.substring(s.length - 6);
    console.log(h);
    values[0] = unhex(h.substring(0, 2));
    values[1] = unhex(h.substring(2, 4));
    values[2] = unhex(h.substring(4, 6));
  }
  removeTheForm();
  setupTheForm();
}
