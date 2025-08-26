1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll

getElementById → Used to select a single element by its id. Id is unique, so it only gives one element.

getElementsByClassName → Used to select multiple elements that have the same class name. It returns a collection of elements.

querySelector → Selects the first element that matches a CSS style selector (id, class, tag, etc.).

querySelectorAll → Selects all the elements that match the CSS selector and returns them in a list.

2. How to create and insert a new element into the DOM
To add a new element, I first create it with document.createElement().
Then I put some text or attributes inside it.
Finally, I add it to the page using methods like appendChild() or prepend().

3. What is Event Bubbling and how does it work?
Event bubbling means when an event happens on a child element, it does not stop there. The event first runs on that element, then goes up to its parent, then to the grandparent, and so on until the top (document).
For example: If I click a button inside a div, first the button’s click runs, then the div’s, then the body’s.

4. What is Event Delegation in JavaScript? Why is it useful?
Event delegation means putting the event listener on a parent element instead of every child.
When I click on a child element, the event bubbles up to the parent, and inside the parent’s listener I can check which child was clicked.

It is useful because:

We don’t need to add listeners to every small element.

It still works even when new child elements are added later.

5. Difference between preventDefault() and stopPropagation()

preventDefault() → Stops the default action of an element (like stopping a form from submitting or a link from opening).

stopPropagation() → Stops the event from going upwards to parent elements.