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
            handleButtonClick(id,text);
        });

        leftGrid.appendChild(newButton);
    }

    function writeTextInTextBar(text) {
        const textBar = document.querySelector("#input-text");

        var caretStart = textBar.selectionStart;
        var caretEnd = textBar.selectionEnd;

        var textValue = textBar.value;

        // Set the value of the input element to the provided text
        textBar.value = textValue.slice(0,caretStart) + text + textValue.slice(caretEnd);
        var newCaretPosition = caretStart + text.length;
        textBar.selectionStart = newCaretPosition;
        textBar.selectionEnd = newCaretPosition;

        if(textBar.value.length - newCaretPosition < 3){
            textBar.scrollLeft = textBar.scrollWidth;
        }
    }

    // Function to remove the last character from the text bar
    function removeLastInput() {
        const textBar = document.querySelector("#input-text");
        var caretStart = textBar.selectionStart;
        var caretEnd = textBar.selectionEnd;
        const currentText = textBar.value;

        if (caretStart > 0 || caretEnd > 0) {
            if (caretStart < caretEnd){
                var newText = currentText.slice(0,caretStart) + currentText.slice(caretEnd);
                textBar.value = newText;
                textBar.selectionStart = caretStart;
                textBar.selectionEnd = caretStart;
            }else{
                var newText = currentText.slice(0,caretStart-1) + currentText.slice(caretStart);
                textBar.value = newText;
                textBar.selectionStart = caretStart - 1;
                textBar.selectionEnd = caretStart - 1;
            }
        }
    }

    // Example usage of the writeTextInTextBar function

    const keypad1 = ["क..","च..","ट..","त..","प..","य..","श..","क्ष.."];
    const keypads1 = [["क","ख","ग","घ","ङ"],["च","छ","ज","झ","ञ"],["ट","ठ","ड","ढ","ण"],["त","थ","द","ध","न"],["प","फ","ब","भ","म"],["य","र","ल","व"],["श","ष","स","ह"],["क्ष","त्र","ज्ञ"]];
    const keypad2 = ["अ..","ा","१२३","123","$.."];
    const keypads2 = [["अ","आ","इ","ई","उ","ऊ","ऋ","ॠ","ए","ऐ","ओ","औ","अं","अः"],["ा","ि","ी","ु","ू","ृ","ॄ","े","ै","ो","ौ","्"],["१","२","३","४","५","६","७","८","९","०"],["1","2","3","4","5","6","7","8","9","0"],["ॐ","॰"]];

    const matras = ["","ा","ि","ी","ु","ू","ृ","ॄ","े","ै","ो","ौ","्"];
    
    for(let i=0; i<8; i++){
      addButtonToGrid(keypad1[i],i+1);
    }
    
    for(let i=0; i<5; i++){
      addButtonToGrid(keypad2[i],i+9);
    }

    function handleButtonClick(buttonId, text) {

        // Perform different actions based on the button's id parseInt(buttonId)
        if(gridState1===0 && gridState2===0){
          replaceButtons(buttonId,0);
        }else if(gridState2===0 && gridState1<9){
          //
          replaceButtons(gridState1,buttonId);
        }
        else if(gridState2===0 && gridState1>10){
          //
          writeTextInTextBar(text);
          //replaceButtons(0,0)
        }
        else{
          //
          writeTextInTextBar(text);
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
          
          for(let i=0; i<5; i++){
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
            writeTextInTextBar(text);
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
            if(altText==="space"){
                writeTextInTextBar("\u0020");
            }else{
                removeLastInput();
            }
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

});
