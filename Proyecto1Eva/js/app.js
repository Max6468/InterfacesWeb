window.addEventListener("load", (event) => {
    const body = document.querySelector('body');
  
    const createSnowflake = () => {
      let snowflake = document.createElement('i');
      snowflake.classList.add('i'); // Add a class for styling
  
      let x = innerWidth * Math.random();
      let size = (Math.random() * 8) + 2; // Random size between 2px and 10px
      let animationDelay = Math.random() * 10; // Random animation delay between 0 and 5 seconds
      let animationDuration = Math.random() * 10 + 5; // Random animation duration between 5 and 15 seconds
  
      snowflake.style.left = `${x}px`;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.animationDelay = `${animationDelay}s`;
      snowflake.style.animationDuration = `${animationDuration}s`;
      snowflake.style.position = 'absolute'; // Ensure absolute positioning
  
      body.appendChild(snowflake);
  
      // Handle removal after animation
      snowflake.addEventListener('animationend', () => {
        snowflake.remove();
      });
    };
  
    setInterval(createSnowflake, 800);
  });


  // app.js

// app.js

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active'); 
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const banner = document.querySelector('.bannerCalasanz');
  

  banner.addEventListener('click', function() {
      window.location.href = 'index.html'; 
  });
});


