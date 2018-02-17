# Useful Mocks / Utilities For Unit Testing
These tests don't make any assumptions about what  unit test assert framework you are using; being in VanillaJS they'll work equally well with something like Jasmine or a more traditional nUnit assert vocubulary which is typically used with jsTestDriver. The use cases covered are:

1. Mocking JavaScript's native Date constructor
2. Allowing Your JavaScript tests to access inner, private functions programmatically

Point 1: The code you want to test has a `new Date()` in it; the date in your code changes each time it runs which means testing a transformation done by your code on said date becomes less clear because you cannot use a hardcoded value to assert against as the expected result.
 The use case for Point 2. is a little more niche. Say, you work somewhere where you have inherited a mess of a codebase with one crucial method nastily spanning over two hundred and fifty lines of code having been coded in a crappy non-modular way. At its's heart, the method does something eminiently testable (i.e. Maths transformations etc.) but that is tighly coupled with presentationl code and if you were to assert inputs against expected outputs once all those hundreds of lines of code have run then in effect you would have being running an integration test **not** a unit test. Add in further disadvantages that branching isn't an option so any non-Test related changes you make, for instance making a private method exposer in the code you want to test, will eventually wind their way up to production; and given that said workplace is so dysfunctional that things break unexpctedly in Production frequently (not surprise really when the team's database is Seibel and the fragmented code base means a lot of the site is a Visual Studio 2008 ASP.Net Solution) you really need a cast iron alibi that just because you wrote some code to test something it wasn't a breaking change. Hence the genesis of this private method exposer that you can bung into your "set up's" and "teardowns" that will dynamically chnage the method when the tests run so as to expose the private functions.

# Using The Code (For The Date Constructor Mock)
 As mentioned, just paste the code into your "set up" and "teardown"
## Jasmine Usage
```

 ...
```javascript
    describe('My Module, function() {

        beforeEach(function () {
            if (Date.OldDateConstructor !== undefined) { return; }
            var OldDate = Date;

            window.Date = function (a, b, c, d, e, f, g) {
                var mockDateObject;
                if (Date.mockNow !== undefined && a === undefined) {
                    mockDateObject = new OldDate(Date.mockNow);
                } else {
                if (a === undefined) {
                    mockDateObject = new OldDate();
                } else if (a === undefined) {
                    mockDateObject = new OldDate(a);
                } else if (c === undefined) {
                    mockDateObject = new OldDate(a, b);
                } else if (d === undefined) {
                    mockDateObject = new OldDate(a, b, c);
                } else if (e === undefined) {
                    mockDateObject = new OldDate(a, b, c, d);
                } else if (f === undefined) {
                    mockDateObject = new OldDate(a, b, c, d, e);
                } else if (g === undefined) {
                    mockDateObject = new OldDate(a, b, c, d, e, f);
                } else {
                    mockDateObject = new OldDate(a, b, c, d, e, f, g);
                }

              }
              return mockDateObject;
          };
          //The above override handles allowing our mocked Date object to inherit methods that work with instances of Date via
          //'new Date()' but we also need to wire up the native Date static methods onto our mock object as well (done below).
          Date.UTC = function() { return OldDate.UTC(); };
          Date.now = function() {
              var iMilliSecsSinceUNIXEpoch;
              if (Date.mockNow !== undefined) {
                  iMilliSecsSinceUNIXEpoch = Date.parse(Date.mockNow);
              } else {
                  iMilliSecsSinceUNIXEpoch = OldDate.now();
              }
              return iMilliSecsSinceUNIXEpoch;
          };
          Date.parse = function (a) { return OldDate.parse(a); };
          Date.OldDateConstructor = OldDate;
      });
      afterEach(function () {
          window.Date = Date.OldDateConstructor;
      });
     {
      ...  standard View stuff ...
     }, makeEventPipe());
}
