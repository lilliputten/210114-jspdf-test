/* global jspdf */
/*
 * @see https://github.com/MrRio/jsPDF
 * @see http://raw.githack.com/MrRio/jsPDF/master/
 * @see https://stackoverflow.com/questions/742271/generating-pdf-files-with-javascript
 * @see https://cdnjs.com/libraries/jspdf
 * @see https://stackoverflow.com/questions/45780708/how-do-i-create-multiline-text-and-page-split-in-jspdf
 */
function onLoad() {
  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF();
  doc.setFontSize(20);
  doc.setTextColor(0, 255, 0);
  doc.text('This is a title', 20, 20);
  // doc.addPage();
  doc.setTextColor(150);
  doc.setFontSize(10);
  doc.text('This is some normal sized text underneath.', 20, 30);
  doc.text('This is next text line.', 20, 35);
  doc.save('a4.pdf');
  // doc.autoPrint();
}
