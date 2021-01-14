/* global jsPDF */
/*
 * @see https://stackoverflow.com/questions/742271/generating-pdf-files-with-javascript
 */
function onLoad() {
  var doc = new jsPDF();
  doc.text('Hello world!', 10, 10);
  doc.save('a4.pdf');
}
