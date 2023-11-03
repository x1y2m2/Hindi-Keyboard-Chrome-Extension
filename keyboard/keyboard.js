document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the copy button and input text
    var copyButton = document.getElementById("copy-button");
    var inputText = document.getElementById("input-text");

    // Function to change background color momentarily
    function changeBackgroundColor(color, duration) {
        var originalColor = copyButton.style.backgroundColor;
        copyButton.style.backgroundColor = color;
        setTimeout(function () {
            copyButton.style.backgroundColor = originalColor;
        }, duration);
    }

    // Copy text to clipboard when the copy button is clicked
    copyButton.addEventListener("click", function () {
        inputText.select();
        document.execCommand("copy");
        changeBackgroundColor("#87CEEB", 200);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the "Go Back" button
    var goBackButton = document.getElementById("go-back-button");

    // Function to handle the "Go Back" button click event
    goBackButton.addEventListener("click", function () {
        // Call your JavaScript function or define the logic here
        // Example: YourFunctionName();
        // Replace YourFunctionName with your actual function.
    });
});

document.addEventListener("DOMContentLoaded", function () {

    let gridState1 = 0;
    let gridState2 = 0;

    // Function to add a new button to the left grid
    function addButtonToGrid(text,id) {
        const leftGrid = document.querySelector(".left-grid");

        const newButton = document.createElement("button");
        newButton.className = "keyboard-button";
        newButton.textContent = text;

        newButton.dataset.buttonId = id;
        newButton.addEventListener("click", function () {
            document.querySelector("#input-text").focus();
        });

        leftGrid.appendChild(newButton);
    }

    function writeTextInTextBar(text) {
        const textBar = document.querySelector("#input-text");

        // Set the value of the input element to the provided text
        textBar.value = textBar.value + text;
    }

    // Function to remove the last character from the text bar
    function removeLastInput() {
        const textBar = document.querySelector("#input-text");
        const currentText = textBar.value;

        if (currentText.length > 0) {
            const newText = currentText.substring(0, currentText.length - 1);
            textBar.value = newText;
        }
    }

    // Example usage of the writeTextInTextBar function

    const keypad1 = ["क..","च..","ट..","त..","प..","य..","श..","क्ष.."];
    const keypads1 = [["क","ख","ग","घ","ङ"],["च","छ","ज","झ","ञ"],["ट","ठ","ड","ढ","ण"],["त","थ","द","ध","न"],["प","फ","ब","भ","म"],["य","र","ल","व"],["श","ष","स","ह"],["क्ष","त्र","ज्ञ"]];
    const keypad2 = ["अ..","१२३","123","$.."];
    const keypads2 = [["अ","आ","इ","ई","उ","ऊ","ऋ","ॠ","ए","ऐ","ओ","औ","अं","अः"],["१","२","३","४","५","६","७","८","९","०"],["1","2","3","4","5","6","7","8","9","0"],["ॐ","॰"]];

    const matras = ["","ा","ि","ी","ु","ू","ृ","ॄ","े","ै","ो","ौ","्"];
    
    for(let i=0; i<8; i++){
      addButtonToGrid(keypad1[i],i+1);
    }
    
    for(let i=0; i<4; i++){
      addButtonToGrid(keypad2[i],i+9);
    }

    function handleButtonClick(event) {
        const button = event.target;
        const buttonId = button.dataset.buttonId;

        if(buttonId===undefined){
          return
        }

        // Perform different actions based on the button's id
        if(gridState1===0 && gridState2===0){
          replaceButtons(parseInt(buttonId),0);
        }else if(gridState2===0 && gridState1<9){
          //
          replaceButtons(gridState1,parseInt(buttonId));
        }
        else if(gridState2===0 && gridState1>9){
          //
          writeTextInTextBar(button.textContent);
          //replaceButtons(0,0)
        }
        else{
          //
          writeTextInTextBar(button.textContent);
          replaceButtons(0,0);
        }
    }


    // Example: Remove all buttons from the left grid
    // removeAllButtons();
    function replaceButtons(a,b) {
        const leftGrid = document.querySelector("#left-grid");


        // Clear the left grid
        while (leftGrid.firstChild) {
            leftGrid.removeChild(leftGrid.firstChild);
        }

        // Add different buttons

        if(a===0 && b===0){
          for(let i=0; i<8; i++){
            addButtonToGrid(keypad1[i],i+1);
          }
          
          for(let i=0; i<4; i++){
            addButtonToGrid(keypad2[i],i+9);
          }
        }else if(a>0 && b===0){
          //
          if(a<9){
            for(let i=0;i<keypads1[a-1].length;i++){
              addButtonToGrid(keypads1[a-1][i],i+1);
            }
          }else{
            for(let i=0;i<keypads2[a-9].length;i++){
              addButtonToGrid(keypads2[a-9][i],i+1);
            }
          }
        }else{
          let t = keypads1[a-1][b-1];
          for (let i = 0; i < 13; i++) {
            addButtonToGrid(t+matras[i],i+1);
          }
        }
        gridState1 = a;
        gridState2 = b;
    }

    function addButtonToRightGrid(text) {
        const rightGrid = document.querySelector(".right-grid");

        const newButton = document.createElement("button");
        newButton.className = "keyboard-button";
        newButton.textContent = text;

        newButton.addEventListener("click", function () {
            document.querySelector("#input-text").focus();
        });

        rightGrid.appendChild(newButton);
    }

    function addButtonToRightGridWithImage(imageSrc, altText) {
        const rightGrid = document.querySelector(".right-grid");

        const newButton = document.createElement("button");
        newButton.className = "special-button";

        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = altText;

        newButton.addEventListener("click", function () {
            document.querySelector("#input-text").focus();
        });

        newButton.appendChild(imgElement);

        rightGrid.appendChild(newButton);
    }

    addButtonToRightGridWithImage("../images/space-icon.png", "space");
    addButtonToRightGridWithImage("../images/remove-icon.png", "remove");
    addButtonToRightGrid("\u0902");
    addButtonToRightGrid("\u0901");
    addButtonToRightGrid("\u0964");
    addButtonToRightGrid("\u0965");
    addButtonToRightGrid("\u002c");
    addButtonToRightGrid("\u003f");

    // Function to handle clicks on buttons in the right grid
    function handleRightGridButtonClick(event) {
        const button = event.target;

        // Check if the button has text content or an image
        if (button.className==="keyboard-button") {
            // Handle text content
            const buttonText = button.textContent;
            writeTextInTextBar(buttonText);
        } else {
            // Handle image content
            const imgElement = button.querySelector("img");
            const altText = button.alt;
            if(altText === "space"){
              writeTextInTextBar("\u0020");
            }else{
              removeLastInput();
            }
        }
    }

    // Add a click event listener to the "Go Back" button
    document.querySelector("#go-back-button").addEventListener("click", function () {
        // Replace buttons with a different set when the "Go Back" button is clicked
        if(gridState2>0){
          replaceButtons(gridState1,0);
        }else if(gridState1>0){
          replaceButtons(0,0);
        }
        document.querySelector("#input-text").focus();
    });

    document.querySelector("#left-grid").addEventListener("click", handleButtonClick);
    document.querySelector(".right-grid").addEventListener("click", handleRightGridButtonClick);
});
