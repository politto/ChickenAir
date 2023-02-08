let data = null
async function oldFn() {
    
    let response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    data = await response.json();
    console.log(data)
    console.log(typeof data)
    document.getElementById("demo").innerHTML =  data
}
const delegate = (fn, selector) => {
    return function handler(event) {
      const matchingEl = matches(event.target, selector, this);
      if (matchingEl != null) {
        fn.call(matchingEl, event);
      }
    };
  };
  
  const matches = (target, selector, boundElement) => {
    if (target === boundElement) {
      return null;
    }
    if (target.matches(selector)) {
      return target;
    }
    if (target.parentNode) {
      return matches(target.parentNode, selector, boundElement);
    }
    return null;
  };
  
  const handler = (event) => {
    console.log(Array.prototype.indexOf.call(event.currentTarget.children, event.target));
  }
  
  document.getElementById('parent')
    .addEventListener('click', delegate(handler, '.a'));