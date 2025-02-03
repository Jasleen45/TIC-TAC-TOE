let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO=true; // when turn of player who will write O in the game.
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
       if(turnO){
        box.innerText="O";
        turnO=false;
       } 
       else{
        box.innerText="X";
        turnO=true;
       }
       box.disabled=true;
       checkWinner();
       checkDraw();

    } );
});

const disableBox =()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBox =()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const resetGame = () => {
    turnO=true; 
    enableBox();
    msgContainer.classList.add("hide");

};
const showWinner= (winner) =>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox();
};

const showDraw= () =>{
    msg.innerText="MATCH IS A DRAW!";
    msgContainer.classList.remove("hide");
    disableBox();
};



const checkDraw=()=>{
    let isBoardFull=true;
    for(let box of boxes){
        if(box.innerText===""){
            isBoardFull=false;
            break;
        }
    }
    if(isBoardFull){
        let isWinningPattern=false;
        for(let pattern of winPatterns){
            const [a,b,c]=pattern;
            if(
                boxes[a].innerText!=="" &&
                boxes[a].innerText===boxes[b].innerText &&
                boxes[b].innerText!=="" &&
                boxes[b].innerText===boxes[c].innerText
            ){
                isWinningPattern=true;
                break;
            }
        }

        if(!isWinningPattern){
            showDraw();
        }
    }
   
};
const checkWinner= () => {
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
