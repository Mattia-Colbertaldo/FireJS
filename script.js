var character = document.getElementById("character");
var block = document.getElementById("block");
var counter=0;
var speed = 1; // Initial animation duration
var blockLeft = 100; // Initial position of the block
var lives = 0; // Initial number of lives

function jump(){
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },300);
}


function animate() {
    //console.log(blockLeft, speed, counter);
    blockLeft -= speed/5 ; // Move the block to the left
    block.style.left = blockLeft + '%';

    // If the block has moved off the screen, reset its position
    if (blockLeft <= -100) {
        blockLeft = 100;

    }

    // Get the dimensions of the character and block
    let characterRect = character.getBoundingClientRect();
    let blockRect = block.getBoundingClientRect();

    // Check if the rectangles overlap: Game Over
    if (characterRect.left < blockRect.right &&
        characterRect.right > blockRect.left &&
        characterRect.top < blockRect.bottom &&
        characterRect.bottom > blockRect.top) {
        // Collision detected
        lives--;
        blockLeft = 100;
        block.style.left = blockLeft + '%';
        // Remove one life emoji
        var emojis = document.querySelectorAll('.life-emoji');
        if (emojis.length > 0) {
            emojis[0].parentNode.removeChild(emojis[0]);
        }
        if(lives < 0){
            alert("Game Over. score: "+Math.floor(counter/100));
            counter=0;
            speed = 2;
            blockLeft = 100;
            lives = 1;
            block.style.left = blockLeft + '%';

            // Remove all fire emojis
            var emojis = document.querySelectorAll('.fire-emoji');
            for (var i = 0; i < emojis.length; i++) {
                emojis[i].parentNode.removeChild(emojis[i]);
            }
        }
    
    }else{

        counter++;

        if(counter % 2000 == 0){
            // earn 1 life every 20 points and put a hearth emoji randomly on the screen
            lives++;
            var emoji = document.createElement('div');
            emoji.textContent = '❤️';
            emoji.style.position = 'absolute';
            emoji.style.fontSize = '30px'; // Set a random font size between 10px and 30px
            emoji.style.left = Math.random() * window.innerWidth + 'px';
            emoji.style.top = Math.random() * (window.innerHeight - emoji.offsetHeight-50) + 'px';
            emoji.className = 'life-emoji';
            document.body.appendChild(emoji);
        }
            
            

        // Increase the score and add a fire emoji for every point
        if(counter % 200 == 0){
            speed += 0.02;
            document.getElementById("scoreSpan").innerHTML = Math.floor(counter/200);
            var emoji = document.createElement('div');
            emoji.textContent = '🔥';
            emoji.style.position = 'absolute';
            emoji.style.fontSize = Math.random() * 20 + 10 + 'px'; // Set a random font size between 10px and 30px
            emoji.style.left = Math.random() * window.innerWidth + 'px';
            emoji.style.top = Math.random() * (window.innerHeight - emoji.offsetHeight-50) + 'px';
            emoji.className = 'fire-emoji';
            document.body.appendChild(emoji);
        }
    }
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);