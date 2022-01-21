/**
 * @author jaranf
 * @description A Date Constructor Mock so instead of always returning today's date, new Date() can be set to a hardcoded date.
 */

var customDate = (function() {
  return {
    usageInSetup: function () {
      'use strict';

      if (typeof customDate.__NativeDate !== "undefined") {
        return;
      }
      customDate.__NativeDate = window.Date;
      window.Date = function (a) {
        let args = Array.from(arguments);
        if (Date.mockNow !== undefined) {
          args = Array.isArray(Date.mockNow) ? Date.mockNow : [Date.mockNow];
          a = args[0];
        }
        return new customDate.__NativeDate(...args);
      };
      Date.UTC = function () {
        return customDate.__NativeDate.UTC(...arguments);
      };
      Date.now = function () {
        return Date.mockNow !== undefined ? (new Date()).valueOf() : customDate.__NativeDate.now();
      };
      Date.parse = function (a) {
        return customDate.__NativeDate.parse(a);
      };


    }
    ,
    usageInTeardown: function () {
      if (customDate.__NativeDate) {
        window.Date = customDate.__NativeDate;
        delete customDate.__NativeDate;
      }
    }
  };
})();
