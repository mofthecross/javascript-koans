var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      productsICanEat = _(products).chain()
              .filter(function(product) {
                return !product.containsNuts })
              .filter(function(product) {
                return !_(product.ingredients)
                .any(function(ingredient) {
                  return ingredient === "mushrooms";
                })
              }).value();

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1000).reduce(function(prev,curr) {
      if(curr % 3 === 0 || curr % 5 === 0) {
        return prev + curr;
      }
      return prev;
    });    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    _(products).chain()
      .map(function(product) {
        return product.ingredients; }
        ).flatten()
      .reduce(function(prev, curr) {
        prev[curr] = (prev[curr] || 0) + 1;
        return prev;
      }, ingredientCount).value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR ADVANCED */
  
  it("should find the largest prime factor of a composite number", function () {

    var LargestPrimeFactor = function (number) {
      var LargestPrimeFactor = [];
      for (var i = 2; i <= number; i++) {
        while(number % i === 0) {
          number = number/i;
          LargestPrimeFactor.push(i);
        }
      }
      if (LargestPrimeFactor === []) {
        return number;
      } else {
        return _.max(LargestPrimeFactor);
      }
    }
    //expect(LargestPrimeFactor(10986232)).toBe(8747);
    expect(LargestPrimeFactor(36)).toBe(3);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    var isPalindrome = function(num) {
      return num.toString() === num.toString().split("").reverse().join("")
    }

   var largestPalindrome = function () {
    var result, product; palindromes = [];
    for (var i = 999; i > 99; i--) {
      for (var j = 999; j > 99; j--) {
        product = j * i;
        if (isPalindrome(product) && product.toString().length === 6) {
          palindromes.push(product);
        }
      }
    } 
    return _.max(palindromes);
  }
    
  expect(largestPalindrome()).toBe(906609);

  });

  // it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  // });

  // it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  // });

  // it("should find the 10001st prime", function () {

  // });
  
});
