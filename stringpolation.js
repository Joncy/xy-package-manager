// Stringpolation.js
//==================
module.exports = {
  begin: function() {
    String.prototype.sp = function (o) {
      return this.replace(/{([^{}]*)}/g,
      function (a, b) {
        var r = o[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      }
    );
  };
}
};
