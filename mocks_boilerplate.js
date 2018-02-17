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
        if (Date.mockNow !== undefined && a === undefined) {
          if (Object.prototype.toString.call(Date.mockNow) === '[object Array]') {
            mockDateObject = new __D(__D.UTC.apply({}, Date.mockNow));
          } else {
            mockDateObject = new __D(Date.mockNow);
          }
        } else {
          if (a === undefined) {
            mockDateObject = new __D();
          } else if (b === undefined) {
            mockDateObject = new __D(a);
          } else if (c === undefined) {
            mockDateObject = new __D(a, b);
          } else if (d === undefined) {
            mockDateObject = new __D(a, b, c);
          } else if (e === undefined) {
            mockDateObject = new __D(a, b, c, d);
          } else if (f === undefined) {
            mockDateObject = new __D(a, b, c, d, e);
          } else if (g === undefined) {
            mockDateObject = new __D(a, b, c, d, e, f);
          } else {
            mockDateObject = new __D(a, b, c, d, e, f, g);
          }
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