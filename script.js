// I should remember that whenever i will compare with the winningArrays , i should first arrange them in sorted manner and then store it another variable so that my actual array of component does not changes.

var count = 1; //this will be used to know about the turn of two components;
var winningArrays = [[0,1,2],[0,3,6],[6,7,8],[2,5,8],[0,4,8],[2,4,6],[3,4,5],[1,4,7]];
var A = [];
var B = [];

function msg(element){
    var elementIndex = +( element.getAttribute('data-serial') );
    let status = checkForAlreadyOne(element,elementIndex);
    

    if(status!=false){

        if(count%2==0){ //Turn of B
            if(A.length==3){
                makingLastItemBlur(A);   //it is turn of 2nd componenet i.e. B but we make the item blur for the component A. since A is the next one to have turn thus wants to know which is his first inserted element.
            }
            element.innerHTML = "<h1> O </h1>"; 
            callForB(element, elementIndex);
            count++;
        }
        else{   // Turn of A
            if(B.length==3){
                makingLastItemBlur(B);
            }
            element.innerHTML = "<h1> X </h1>"; 
            callForA(element,elementIndex);
            count++;
        }
    }
    else{
        console.log("this is already occupied..");
    }
}

function callForA(element,elementIndex){   
    if(A.length<3){
        A.push(elementIndex);
    checkForWin(A);
}
    else{
        var poped =  A.shift(); //removing first element;
    eleminatingPopedOne(poped);
        A.push(elementIndex);
    checkForWin(A);
}
}

function callForB(element,elementIndex){
    if(B.length<3){
        B.push(elementIndex);
        checkForWin(B);
        }
    else{
        var poped =  B.shift(); //removing first element;
        eleminatingPopedOne(poped);
        // document.getAttribute('data-serial')
        B.push(elementIndex);
        checkForWin(B);
    }
    }
    

function checkForWin(arr){
    let arrToCheck = arr.slice();
    arrToCheck.sort((a,b)=>a-b);
    console.log("sorted one:",arrToCheck);
    console.log("original One:",arr);

    winningArrays.forEach(function(winarr){
        let result = checkEquality(winarr,arrToCheck);
        if(result==true){
            if(count%2==0){
                winningMsg("O won..!");

            }
            else{
                winningMsg("X won...!");
            }
        }
    });

}

function checkEquality(arr1,arr2){
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}


function winningMsg(componentWins){
    let h2 = document.createElement("h2");
    h2.textContent = componentWins;
    document.body.append(h2);
    setTimeout(function(){
        // let block = document.getElementsByClassName("block");       resetting the all elements
        // for (let i = 0; i < block.length; i++) {
        // block[i].innerHTML = '';
        // }
        // A=[];
        // B=[];
        // h2.textContent = "";
        // count=0;    
        location.reload();

    },2000);
    
}
    

function eleminatingPopedOne(poped){
       let divs = document.querySelectorAll('.block');

       for(let i=0;i<divs.length;i++){
        if(divs[i].getAttribute('data-serial')==poped.toString()){
            divs[i].innerHTML = '';
        }
       }

}

function makingLastItemBlur(arr){
    let firstItem = arr[0];
    console.log("first element", firstItem);
    let divs = document.querySelectorAll('.block');

       for(let i=0;i<divs.length;i++){
        if(divs[i].getAttribute('data-serial')==firstItem.toString()){

            let heading =  divs[i].querySelector('h1');
            heading.style.color = 'red';
        }
       }

}


function checkForAlreadyOne(element,elementIndex){
    // console.log("checking for already one..!",elementIndex);
    let elementInnerHTML = element.innerHTML;
    if(elementInnerHTML=="<h1> O </h1>" || elementInnerHTML=="<h1> X </h1>" || elementInnerHTML =='<h1 style="color: red;"> X </h1>' || elementInnerHTML =='<h1 style="color: red;"> O </h1>' ){
        return false;
    }
    else{
        console.log("already not occupied..!");
        console.log("the innerHTML is : ", element.innerHTML);
        return true;
    }

}













    // console.log("A presses index number:" , elementIndex );
    // element.innerHTML= "<h1> hii </h1>";