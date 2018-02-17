describe('Date Mock', function() {

  it('should allow the hotwiring of \'new Date()\' to a specific hardcoded value', function() {
    mocks.usageInSetup();
    // An obvious example; 1 hour and two and half minutes passed midight on Jan 1 1970
    // 0 milliesconds + 30 seconds + 2 minutes + 1 hour (1000 * (30 + 120 + 3600))
    Date.mockNow = "Thu Jan 1 1970 01:02:30 GMT+0000 (GMT)";
    expect((new Date()).valueOf()).toEqual(3750000);
    Date.mockNow = "Fri Jun 6 2014 09:37:00 GMT+0100 (BST)";
    expect((new Date()).valueOf()).toEqual(1402043820000);
    mocks.usageInTeardown();
  });
  it('should be unobtrusive and allow  \'new Date()\' to do it\'s usual thing (i.e. return today\'s date if \'mockNow\' is not present', function() {
    mocks.usageInSetup();
    Date.mockNow = "Thu Jan 1 1970 01:02:30 GMT+0000 (GMT)";
    expect((new Date()).valueOf()).toEqual(3750000);
    delete Date.mockNow;
    var usual = new Date();
    expect(usual.getFullYear()).not.toBeLessThan(2018);
    mocks.usageInTeardown();
  });
  it('should allow an array input when hotwiring \'new Date()\' to a specific hardcoded value', function() {
    mocks.usageInSetup();
    // Where 86400000 milliseconds in a day
    Date.mockNow = [1970, 11, 31, 9, 10, 11];
    // The last day of the year (1970 is not a leap year so is 365 days length)
    // (86400000 * 364) + (9 * 3600 + 1000) + (10 * 6000) + (11 * 1000)
    expect((new Date()).valueOf()).toEqual(31482611000);
    mocks.usageInTeardown();
  });
  it('should be able to utilize all the usual Date instance methods despite being mocked', function() {
    var dateMethods = ['getDate', 'getDay', 'getFullYear', 'getHours', 'getMilliseconds', 'getMinutes', 'getMonth', 'getSeconds', 'getTime', 'getTimezoneOffset', 'getUTCDate', 'getUTCDay', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds'];
    var obj;
    mocks.usageInSetup();
    var date = new Date();
    obj = Object.getPrototypeOf ? Object.getPrototypeOf(date) : date;
    for (var i = 0; i < dateMethods.length; i++) {
      expect(date[dateMethods[i]]).toBeDefined();
    }
    mocks.usageInTeardown();
  });
  it('should be able to restore the native JavaScript Date object', function() {
    expect(Date.toString()).toMatch(/.*native code.*/i);
    mocks.usageInSetup();
    Date.mockNow = [1970, 0, 1, 1, 59, 59];
    expect(Date.toString()).not.toMatch(/.*native code.*/i);
    mocks.usageInTeardown();
    expect(Date.toString()).toMatch(/.*native code.*/i);
    expect(Date.mockNow).toBeUndefined();
  });
  it("should handle one argument being passed to the mocked constructor to make a date", function () {
    var arg1 = "Thu Jun 26 2014 00:37:00 GMT+0100 (BST)";
    var d1 = new Date(arg1);
    mocks.usageInSetup();
    var d2 = new Date(arg1);
    expect(d1.valueOf()).toEqual(d2.valueOf());
    mocks.usageInTeardown();
  });
  it("should handle two arguments being passed to the mocked constructor to make a date", function () {
    var arg1 = 2018,
        arg2 = 1;
    var d1 = new Date(arg1, arg2);
    mocks.usageInSetup();
    var d2 = new Date(arg1, arg2);
    expect(d1.valueOf()).toEqual(d2.valueOf());
    mocks.usageInTeardown();
  });
  it("should handle three arguments being passed to the mocked constructor to make a date", function () {
    var arg1 = 2018,
        arg2 = 1,
        arg3 = 14;
    var d1 = new Date(arg1, arg2, arg3);
    mocks.usageInSetup();
    var d2 = new Date(arg1, arg2, arg3);
    expect(d1.valueOf()).toEqual(d2.valueOf());
    mocks.usageInTeardown();
  });
  it("should handle four arguments being passed to the mocked constructor to make a date", function () {
    var arg1 = 2018,
        arg2 = 1,
        arg3 = 14,
        arg4 = 18;
    var d1 = new Date(arg1, arg2, arg3, arg4);
    mocks.usageInSetup();
    var d2 = new Date(arg1, arg2, arg3, arg4);
    expect(d1.valueOf()).toEqual(d2.valueOf());
    mocks.usageInTeardown();
  });
  it("should handle five arguments being passed to the mocked constructor to make a date", function () {
    var arg1 = 2018,
        arg2 = 1,
        arg3 = 14,
        arg4 = 18,
        arg5 = 30;
    var d1 = new Date(arg1, arg2, arg3, arg4, arg5);
    mocks.usageInSetup();
    var d2 = new Date(arg1, arg2, arg3, arg4, arg5);
    expect(d1.valueOf()).toEqual(d2.valueOf());
    mocks.usageInTeardown();
  });
  it("should handle six arguments being passed to the mocked constructor to make a date", function () {
    var arg1 = 2018,
        arg2 = 1,
        arg3 = 14,
        arg4 = 18,
        arg5 = 30,
        arg6 = 59;
    var d1 = new Date(arg1, arg2, arg3, arg4, arg5, arg6);
    mocks.usageInSetup();
    var d2 = new Date(arg1, arg2, arg3, arg4, arg5, arg6);
    expect(d1.valueOf()).toEqual(d2.valueOf());
    mocks.usageInTeardown();
  });
  it("should handle seven arguments being passed to the mocked constructor to make a date", function () {
    var arg1 = 2018,
        arg2 = 1,
        arg3 = 14,
        arg4 = 18,
        arg5 = 30,
        arg6 = 59,
        arg7 = 9999;
    var d1 = new Date(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
    mocks.usageInSetup();
    var d2 = new Date(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
    expect(d1.valueOf()).toEqual(d2.valueOf());
    mocks.usageInTeardown();
  });
});