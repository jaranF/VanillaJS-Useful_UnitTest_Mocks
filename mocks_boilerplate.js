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
        var mockDateObject;
        var __D = customDate.__NativeDate;
        var args = arguments;
        if (Date.mockNow !== undefined) {
          args = Object.prototype.toString.call(Date.mockNow) === '[object Array]' ? Date.mockNow : [Date.mockNow];
          a = args[0];
        }
        if (a === undefined) {
          mockDateObject = new customDate.__NativeDate();
        } else {
          mockDateObject = typeof a === 'string' ? new __D(__D.parse.apply({}, args)) : new __D(__D.UTC.apply({}, args));
        }
        return mockDateObject;
      };
      Date.UTC = function () {
        return customDate.__NativeDate.UTC.apply([], arguments);
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
//mocks.usageInSetup();
//Date.mockNow = [2000,01,02,03,04,05];
//console.log(new Date());