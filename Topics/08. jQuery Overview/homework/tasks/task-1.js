/* globals $ */

/* 

Create a function that takes a selector and COUNT, then generates inside a UL with COUNT LIs:   
  * The UL must have a class `items-list`
  * Each of the LIs must:
    * have a class `list-item`
    * content "List item #INDEX"
      * The indices are zero-based
  * If the provided selector does not selects anything, do nothing
  * Throws if
    * COUNT is a `Number`, but is less than 1
    * COUNT is **missing**, or **not convertible** to `Number`
      * _Example:_
        * Valid COUNT values:
          * 1, 2, 3, '1', '4', '1123'
        * Invalid COUNT values:
          * '123px' 'John', {}, [] 
*/

function solve() {
    return function (selector, count) {
        if(Array.isArray(selector)){
            throw "error";
        }
        if(!selector) {
            throw "error";
        }
        if(count < 1) {
            throw "error";
        }
        if(!count) {
            throw "error";
        }
        if(isNaN(count)){
            throw "error";
        }
        let selection = $(selector);
        if(!selection.length){
            return;
        }
        selection.append($("<ul>").attr({class: "items-list"}));
        let list = $(".items-list");
        for (let i = 0; i < count; i++) {
            list.append($("<li>").attr({class: "list-item"}).text("List item #" + i));            
        }
    };
};

module.exports = solve;