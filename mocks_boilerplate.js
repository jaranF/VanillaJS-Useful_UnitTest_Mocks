/**
 * @author jaranf
 * @description A Date Constructor Mock so instead of always returning today's date, new Date() can be set to a hardcoded date.
 */

var mocks = (function() {
  return {
    usageInSetup: function () {
      'use strict';

      if (typeof mocks.__Date !== "undefined") {
        return;
      }
      mocks.__Date = window.Date;
      window.Date = function (a, b, c, d, e, f, g) {
        var mockDateObject;
        var __D = mocks.__Date;
        var args = arguments;
        if (Date.mockNow !== undefined) {
          args = Object.prototype.toString.call(Date.mockNow) === '[object Array]' ? Date.mockNow : [Date.mockNow];
          a = args[0];
        }
        if (a === undefined) {
          mockDateObject = new __D();
        } else {
          mockDateObject = typeof a === 'string' ? new __D(__D.parse.apply({}, args)) : new __D(__D.UTC.apply({}, args));
        }
        return mockDateObject;
      };
      Date.UTC = function () {
        return __D.UTC();
      };
      Date.now = function () {
        var iMilliSecsSinceUNIXEpoch;
        if (Date.mockNow !== undefined) {
          iMilliSecsSinceUNIXEpoch = Date.parse(Date.mockNow);
        } else {
          iMilliSecsSinceUNIXEpoch = __D.now();
        }
        return iMilliSecsSinceUNIXEpoch;
      };
      Date.parse = function (a) {
        return __D.parse(a);
      };


    }
    ,
    usageInTeardown: function () {
      if (mocks.__Date) {
        window.Date = mocks.__Date;
        delete mocks.__Date;
      }
    }
  };
})();
//mocks.usageInSetup();
//Date.mockNow = [2000,01,02,03,04,05];
//console.log(new Date());