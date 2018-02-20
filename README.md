# Useful Mocks / Utilities For Unit Testing
These tests don't make any assumptions about what  unit test assert framework you are using; being in VanillaJS they'll work equally well with something like Jasmine or a more traditional nUnit assert vocubulary which is typically used with jsTestDriver. The use cases covered are:

1. Mocking JavaScript's native Date constructor (see gist https://gist.github.com/jaranF/a32e994b93d763d92d98c15ed0db1fb3]
2. Allowing Your JavaScript tests to access inner, private functions programmatically

Point 1: Say, that the code you want to test has a `new Date()` in it; the date in your code changes each time it runs which means testing a transformation done by your code on said date becomes less clear because you cannot use a hardcoded value to assert against as the expected result.

 The use case for Point 2. is a little more niche. Say, you work somewhere where you have inherited a mess of a codebase with one crucial method nastily spanning over two hundred and fifty lines of code having been coded in a crappy non-modular way. At its's heart, the method does something eminiently testable (i.e. Maths transformations etc.) but that is tighly coupled with presentationl code and if you were to assert inputs against expected outputs once all those hundreds of lines of code have run then in effect you would have being running an integration test **not** a unit test. Add in further disadvantages that branching isn't an option so any non-Test related changes you make, for instance making a private method exposer in the code you want to test, will eventually wind their way up to production; and given that said workplace is so dysfunctional that things break unexpctedly in Production frequently (not surprise really when the team's database is Seibel and the fragmented code base means a lot of the site is a Visual Studio 2008 ASP.Net Solution) you really need a cast iron alibi that just because you wrote some code to test something it wasn't a breaking change. Hence the genesis of this private method exposer that you can bung into your "set up's" and "teardowns" that will dynamically change the method when the tests run so as to expose the private functions.

# Using The Code (For The Date Constructor Mock)
 As mentioned, just paste the code into your "set up" and "teardown"
## Jasmine Usage (Setup and Teardown)
```javascript
    describe("My Module", function() {

      var customDate = {};

      beforeEach(function () {

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

        // Other setup code you may have here ...

      } // End fn 'beforeEach()'

      afterEach(function() {
        window.Date = customDate.__NativeDate
      }

     //Tests go here

    }); //End describe





```

## nUnit Usage (Setup and Teardown)
```javascript
     var customDate = {};
     TestCase("My Test case",
       {
         setUp : function() {
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

                   // Other setup code you may have here ...
         }
         ,
         tearDown: function() {
                     window.Date = customDate.__NativeDate;
         }
         /* Tests Go here */
       }

```
## Setting Today's Date To a A Hardcoded Value In Your Test

      var Date.mockNow = [1970, 0, 1, 0, 0, 1];
      // or... (if you like specifying a date with  RFC2822 / IETF date-as-string synax)
      var Date.mockNow = "Thu Jun 26 2014 00:37:00 GMT+0100 (BST)"
      console.log(new Date()); // displays midnight Thursday Jan 1st, 1970 not the actual today's date.

# How To Run The Tests That Test The Date Mock
NB I don't have unit tests on the private method exposer since it doesn't really seem worthwhile given that it's use case is so niche.

The code is in 'mocks_boilerplate.js'. NodeJS and Yarn are also required to run the unit tests. On that subject, the commands below are good for Mac Terminal or Git Shell Command Line.
```Shell
git clone git@github.com:jaranF/VanillaJS-Useful_UnitTest_Mocks.git
cd VanillaJS-Useful_UnitTest_Mocks
yarn install
karma start karma.conf.js &
karma run
```

Note the last two commands assume that you have the 'karma-cli' NPM package installed globally already. If the karma commands above do not work it is probably because you haven't, so just put this in front of the karma command `./node_modules/karma/bin/`. Once you finished with the unit tests and you want to kill the karma process run these commands:
```Shell
ps -Aa | grep '.*karma start.*' # The number that appears in the left hand column is used for next command
kill -s HUP <number>
```

