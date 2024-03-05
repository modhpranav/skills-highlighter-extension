const checkbox = document.getElementById("checkbox");
const button = document.querySelector(".button");

document.getElementById('showContentBtn').addEventListener('click', function() {
  this.textContent = "Applied"; // Change text on single click
});

// When the floating button is clicked, show the content
document.getElementById('showContentBtn').addEventListener('dblclick', function(event) {
  var content = document.getElementById('root');
  var btn = this;
  
  // Calculate the top position for the content. Adjust '+ 30' to change the spacing as needed
  var topPos = btn.offsetTop + btn.offsetHeight + 30;
  
  content.style.position = 'absolute';
  content.style.top = topPos + 'px';
  content.style.right = '5px';
  content.style.display = 'block'; // Show the content
  btn.style.display = 'none'; // Hide the button
  
  event.stopPropagation(); // Prevent the click from propagating to the document
});

// Prevent hiding when clicking inside the content
document.getElementById('root').addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent click inside content from hiding it
});

// When anywhere on the document is clicked,  hide the content
document.addEventListener('click', function() {
  var content = document.getElementById('root');
  content.style.display = 'none'; // Hide the content
  document.getElementById('showContentBtn').style.display = 'block'; // Show the button
});

checkbox.addEventListener("change", function() {
  if (this.checked) {
    button.textContent = "Checked!";
  } else {
    button.textContent = "Click me";
  }
});
