/*******************************************************************************************
                                 variables needed
*******************************************************************************************/
//board spaces
var Space1 = document.getElementById('space1');
var Space2 = document.getElementById('space2');
var Space3 = document.getElementById('space3');
var Space4 = document.getElementById('space4');
var Space5 = document.getElementById('space5');
var Space6 = document.getElementById('space6');
var Space7 = document.getElementById('space7');
var Space8 = document.getElementById('space8');
var Space9 = document.getElementById('space9');
var Space10 = document.getElementById('space10');
var Space11 = document.getElementById('space11');
var Space12 = document.getElementById('space12');
var Space13 = document.getElementById('space13');
var Space14 = document.getElementById('space14');
var Space15 = document.getElementById('space15');
var Space16 = document.getElementById('space16');
var DiceSpace = document.getElementById('Dice');
var RiskSpace = document.getElementById('Risk');
var SafeArea = document.getElementById('Safe');
var TurnCounter = document.getElementById('turn');
var StatBlockP1 = document.getElementById('statBoxp1');
var StatBlockP2 = document.getElementById('statBoxp2');

DiceSpace.addEventListener("click", Roll);
RiskSpace.addEventListener("click", RiskCardDraw);
SafeArea.addEventListener("click", SafeCardDraw);

//player images 
var PlayerOne = "<img src='player1.png' class=player1 onclick='Showp1stats()'></img>";
var PlayerTwo = "<img src='player2.png' class=player2 onclick='Showp2stats()'></img>";

//dice images w/ onclick events hardcoded
var DieOne = "<img src='dice1.jpg' class='dice' ></img>";
var DieTwo = "<img src='dice2.jpg' class='dice'></img>";
var DieThree = "<img src='dice3.jpg' class='dice'></img>";
var DieFour = "<img src='dice4.jpg' class='dice'></img>";
var DieFive = "<img src='dice5.jpg' class='dice'></img>";
var DieSix = "<img src='dice6.jpg' class='dice'></img>";

//chance card images w/ onclick events hardcoded
var Risk = "<img src='Risk.png' class=spaces onclick='RiskCardDraw()' style='position: fixed;'></img>";
var Safe = "<img src='Safe.png' class=spaces style='position: fixed;'></img>";

//capstone/canvas square info
var Final = "<img src='Canvas.png' class=spaces style='position: fixed; z-index: 0;' onclick='FinalStretch()'></img>"

//Risk card class 
//I thought it may be easier to have an array of classes instead of multiple arrays
class RiskCard{
  constructor(RiskCDesc, RiskCPen, RiskCBoon){
      this.RiskCDesc = RiskCDesc;
      this.RiskCPen = RiskCPen;
      this.RiskCBoon = RiskCBoon;
  }
}
//the array of choices that the cards are pulled from
var RCardArry = [];
var RCard1 = new RiskCard('You skip class', 5, 1);
var RCard2 = new RiskCard('Your work calls you in early', 10, 2);
var RCard3 = new RiskCard('You get sick for a week', 15, 3);
var RCard4 = new RiskCard('You forget the requirements for an assighnment', 20, 4);
var RCard5 = new RiskCard('You pay someone for code', 25, 5);
RCardArry.push(RCard1);
RCardArry.push(RCard2);
RCardArry.push(RCard3);
RCardArry.push(RCard4);
RCardArry.push(RCard5);


//Safe card class with same creation methods as risk cards
class SafeCard{
  constructor(safeCDesc, safeCPen, safeCBoon){
      this.safeCDesc = safeCDesc;
      this.safeCPen = safeCPen;
      this.safeCBoon = safeCBoon;
  }
}
var SCardArry = [];
var SCard1 = new SafeCard('You study extra hard', 1, 5);
var SCard2 = new SafeCard('You study all night for an exam', 2, 10);
var SCard3 = new SafeCard('You get some tutoring', 3, 15);
var SCard4 = new SafeCard('You use your spare time to study', 4, 20);
var SCard5 = new SafeCard('Everything just clicks during a cram session', 5, 25);
SCardArry.push(SCard1);
SCardArry.push(SCard2);
SCardArry.push(SCard3);
SCardArry.push(SCard4);
SCardArry.push(SCard5);


//bool variables for drawing and to see if the player is attempting to win
var AlreadyDrawn = false;
var WinAttempt = false;
var riskDrawTime = false;
var safeDrawTime = false;

//turn variables 
var Turn = 1;
var turnWait = false;
var player1turn = "<p class=p1turn>Player One's Turn</p>";
var player2turn = "<p class=p2turn>Player Two's Turn</p>";

//classes and grade references
var Classes = ['CIS-120','CIS-150','CIS-250','CIS-260']
var Grade = ['-','A', 'B', 'C', 'D', 'F']

//win bool
var Win = false;

//Player class construction and two derived players
class Player{
  constructor(pSpace, PLevel, PPassMod, PL1Grade, PL2Grade, PL3Grade, PL4Grade){
      this.pSpace = pSpace;
      this.PLevel = PLevel;
      this.PPassMod = PPassMod;
      this.PL1Grade = PL1Grade;
      this.PL2Grade = PL2Grade;
      this.PL3Grade = PL3Grade;
      this.PL4Grade = PL4Grade;
  }
}
var Player1 = new Player(1, 1, 0, 0, 0, 0, 0)
var Player2 = new Player(1, 1, 0, 0, 0, 0, 0)

/*******************************************************************************************
                      start of meat and potatos of the code
*******************************************************************************************/
window.onload = SetBoard;

//sets up the board, you can adjust where the risk and safe cards are/how many there are/ etc
function SetBoard(){
  Space1.innerHTML = PlayerOne+PlayerTwo+Final;
  DiceSpace.innerHTML = DieOne;
  SafeArea.innerHTML = Safe;
  TurnCounter.innerHTML = player1turn;
  RiskSpace.innerHTML = Risk;
  Space3.innerHTML = Safe,Space7.innerHTML = Safe,Space11.innerHTML = Safe,Space15.innerHTML = Safe;
  Space5.innerHTML = Risk,Space9.innerHTML = Risk,Space13.innerHTML = Risk;
}

function Roll() {
  if (turnWait != true) {
    AlreadyDrawn = false;
    var Diceroll = Math.floor((Math.random() * 6) + 1)

    SafeArea.innerHTML = Safe;
    RiskSpace.innerHTML = Risk;
    if (Win == false && WinAttempt == false) {
      if (Diceroll == 1) {
        DiceSpace.innerHTML = DieOne;
      }
      if (Diceroll == 2) {
        DiceSpace.innerHTML = DieTwo;
      }
      if (Diceroll == 3) {
        DiceSpace.innerHTML = DieThree;
      }
      if (Diceroll == 4) {
        DiceSpace.innerHTML = DieFour;
      }
      if (Diceroll == 5) {
        DiceSpace.innerHTML = DieFive;
      }
      if (Diceroll == 6) {
        DiceSpace.innerHTML = DieSix;
      }

      if (Turn == 1) {
        Player1.pSpace = Player1.pSpace + Diceroll;
      }
      else if (Turn == 2) {
        Player2.pSpace = Player2.pSpace + Diceroll;
      }

      Move();
      ChangeTurn()
    }
  }
}

function Move(){
  StatBlockP1.innerHTML= "";
  StatBlockP2.innerHTML= "";
  StatBlockP1.setAttribute('class','')
  StatBlockP2.setAttribute('class','')
  ///Loops around the board and calls to see if the player passed the current class
  if(Player1.pSpace > 16){
    Player1.pSpace= Player1.pSpace-16;
    ClassPass();
  }
  if(Player2.pSpace > 16){
    Player2.pSpace= Player2.pSpace-16;
    ClassPass();
  }

  for (let i = 0; i < 17; i++) {
      if (i == 1){
         Space1.innerHTML= Final;
      }else if (i == 2) {
          Space2.innerHTML='';
      }else if (i == 3) {
          Space3.innerHTML= Safe;
      }else if (i == 4) {
          Space4.innerHTML='';
      }else if (i == 5) {
          Space5.innerHTML= Risk;
      }else if (i == 6) {
          Space6.innerHTML='';
      }else if (i == 7) {
          Space7.innerHTML= Safe;
      }else if (i == 8) {
          Space8.innerHTML='';
      }else if (i == 9) {
          Space9.innerHTML= Risk;
      }else if (i == 10) {
          Space10.innerHTML='';
      }else if (i == 11) {
          Space11.innerHTML= Safe;
      }else if (i == 12) {
          Space12.innerHTML='';
      }else if (i == 13) {
          Space13.innerHTML= Risk;
      }else if (i == 14) {
          Space14.innerHTML='';
      }else if (i == 15) {
          Space15.innerHTML= Safe;
      }else {
          Space16.innerHTML='';
      }
    }
    ///Prevents the player from going counter clockwise
    if(Player1.pSpace <= 0){
      Player1.pSpace= 1;
    }
    if(Player2.pSpace <= 0){
      Player2.pSpace= 1;
    }

  if(Player1.pSpace == Player2.pSpace){
    if (Player1.pSpace == 1){
       Space1.innerHTML=PlayerOne+PlayerTwo + Final;
    } else if (Player1.pSpace == 2) {
        Space2.innerHTML=PlayerOne+PlayerTwo;
    } else if (Player1.pSpace == 3) {
        Space3.innerHTML=PlayerOne+PlayerTwo + Safe;
        if(AlreadyDrawn == false){
          safeDrawTime = true;
          turnWait = true;
          DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
        }
    } else if (Player1.pSpace == 4) {
        Space4.innerHTML=PlayerOne+PlayerTwo;
    }else if (Player1.pSpace == 5) {
        Space5.innerHTML=PlayerOne+PlayerTwo + Risk;
        if(AlreadyDrawn == false){
          riskDrawTime = true;
          turnWait = true;
          DiceSpace.innerHTML= "<p>Please draw a Risk Card</p>";
        }
    }else if (Player1.pSpace == 6) {
        Space6.innerHTML=PlayerOne+PlayerTwo;
    }else if (Player1.pSpace == 7) {
        Space7.innerHTML=PlayerOne+PlayerTwo + Safe;
        if(AlreadyDrawn == false){
          safeDrawTime = true;
          turnWait = true;
          DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
        }
    }else if (Player1.pSpace == 8) {
        Space8.innerHTML=PlayerOne+PlayerTwo;
    }else if (Player1.pSpace == 9) {
        Space9.innerHTML=PlayerOne+PlayerTwo + Risk;
        if(AlreadyDrawn == false){
          riskDrawTime = true;
          turnWait = true;
          DiceSpace.innerHTML= "<p>Please draw a Risk Card</p>";
        }
    }else if (Player1.pSpace == 10) {
        Space10.innerHTML=PlayerOne+PlayerTwo;
    }else if (Player1.pSpace == 11) {
        Space11.innerHTML=PlayerOne+PlayerTwo + Safe;
        if(AlreadyDrawn == false){
          safeDrawTime = true;
          turnWait = true;
          DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
        }
    }else if (Player1.pSpace == 12) {
        Space12.innerHTML=PlayerOne+PlayerTwo;
    }else if (Player1.pSpace == 13) {
        Space13.innerHTML=PlayerOne+PlayerTwo + Risk;
        if(AlreadyDrawn == false){
          riskDrawTime = true;
          turnWait = true;
          DiceSpace.innerHTML= "<p>Please draw a Risk Card</p>";
        }
    }else if (Player1.pSpace == 14) {
        Space14.innerHTML=PlayerOne+PlayerTwo;
    }else if (Player1.pSpace == 15) {
        Space15.innerHTML=PlayerOne+PlayerTwo + Safe;
        if(AlreadyDrawn == false){
          safeDrawTime = true;
          turnWait = true;
          DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
        }
    }else {
        Space16.innerHTML=PlayerOne+PlayerTwo;
    }
  }
  else{
   if (Player1.pSpace == 1){
      Space1.innerHTML=PlayerOne + Final;
   } else if (Player1.pSpace == 2) {
       Space2.innerHTML=PlayerOne;
   } else if (Player1.pSpace == 3) {
       Space3.innerHTML=PlayerOne + Safe;
       if(AlreadyDrawn == false && Turn == 1){
        safeDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
       }
   }else if (Player1.pSpace == 4) {
       Space4.innerHTML=PlayerOne;
   }else if (Player1.pSpace == 5) {
       Space5.innerHTML=PlayerOne + Risk;
       if(AlreadyDrawn == false && Turn == 1){
        riskDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Risk Card</p>";
       }
   }else if (Player1.pSpace == 6) {
       Space6.innerHTML=PlayerOne;
   }else if (Player1.pSpace == 7) {
       Space7.innerHTML=PlayerOne + Safe;
       if(AlreadyDrawn == false && Turn == 1){
        safeDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
       }
   }else if (Player1.pSpace == 8) {
       Space8.innerHTML=PlayerOne;
   }else if (Player1.pSpace == 9) {
       Space9.innerHTML=PlayerOne + Risk;
       if(AlreadyDrawn == false && Turn == 1){
        riskDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Risk Card</p>";
       }
   }else if (Player1.pSpace == 10) {
       Space10.innerHTML=PlayerOne;
   }else if (Player1.pSpace == 11) {
       Space11.innerHTML=PlayerOne + Safe;
       if(AlreadyDrawn == false && Turn == 1){
        safeDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
       }
   }else if (Player1.pSpace == 12) {
       Space12.innerHTML=PlayerOne;
   }else if (Player1.pSpace == 13) {
       Space13.innerHTML=PlayerOne + Risk;
       if(AlreadyDrawn == false && Turn == 1){
        riskDrawTime = true;
         DiceSpace.innerHTML= "<p>Please draw a Risk Card</p>";
       }
   }else if (Player1.pSpace == 14) {
       Space14.innerHTML=PlayerOne;
   }else if (Player1.pSpace == 15) {
       Space15.innerHTML=PlayerOne + Safe;
       if(AlreadyDrawn == false && Turn == 1){
        safeDrawTime = true;
        turnWait = true;
        DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
       }
   }else {
       Space16.innerHTML=PlayerOne;
   }

   if (Player2.pSpace == 1){
      Space1.innerHTML=PlayerTwo + Final;
   } else if (Player2.pSpace == 2) {
       Space2.innerHTML=PlayerTwo;
   } else if (Player2.pSpace == 3) {
       Space3.innerHTML=PlayerTwo + Safe;
       if(AlreadyDrawn == false && Turn == 2){
        safeDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
       }
   } else if (Player2.pSpace == 4) {
       Space4.innerHTML=PlayerTwo;
   }else if (Player2.pSpace == 5) {
       Space5.innerHTML=PlayerTwo + Risk;
       if(AlreadyDrawn == false && Turn == 2){
        riskDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Risk Card</p>";
       }
   }else if (Player2.pSpace == 6) {
       Space6.innerHTML=PlayerTwo;
   }else if (Player2.pSpace == 7) {
       Space7.innerHTML=PlayerTwo + Safe;
       if(AlreadyDrawn == false && Turn == 2){
        safeDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
       }
   }else if (Player2.pSpace == 8) {
       Space8.innerHTML=PlayerTwo;
   }else if (Player2.pSpace == 9) {
       Space9.innerHTML=PlayerTwo + Risk;
       if(AlreadyDrawn == false && Turn == 2){
        riskDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Risk Card</p>";
       }
   }else if (Player2.pSpace == 10) {
       Space10.innerHTML=PlayerTwo;
   }else if (Player2.pSpace == 11) {
       Space11.innerHTML=PlayerTwo + Safe;
       if(AlreadyDrawn == false && Turn == 2){
        safeDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
       }
   }else if (Player2.pSpace == 12) {
       Space12.innerHTML=PlayerTwo;
   }else if (Player2.pSpace == 13) {
       Space13.innerHTML=PlayerTwo + Risk;
       if(AlreadyDrawn == false && Turn == 2){
        riskDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Risk Card</p>";
       }
   }else if (Player2.pSpace == 14) {
       Space14.innerHTML=PlayerTwo;
   }else if (Player2.pSpace == 15) {
       Space15.innerHTML=PlayerTwo + Safe;
       if(AlreadyDrawn == false && Turn == 2){
        safeDrawTime = true;
        turnWait = true;
         DiceSpace.innerHTML= "<p>Please draw a Safe Card</p>";
       }
   }else {
       Space16.innerHTML=PlayerTwo;
   }
 }
}

function RiskCardDraw(){
  if(AlreadyDrawn == false && riskDrawTime == true){
    DiceSpace.innerHTML = DieOne;
    AlreadyDrawn = true;
    riskDrawTime = false;
    var Diceroll = Math.floor((Math.random() * 5))
    if (Diceroll == 0){
      RiskSpace.innerHTML= "<p>"+RCardArry[Diceroll].RiskCDesc+", +1 move, -5% chance to pass</p>";
      if (Turn == 1){
        Player1.pSpace = Player1.pSpace + RCardArry[Diceroll].RiskCBoon;
        Player1.PPassMod = Player1.PPassMod - RCardArry[Diceroll].RiskCPen;
        Move();
      }else if (Turn == 2){
        Player2.pSpace = Player2.pSpace + RCardArry[Diceroll].RiskCBoon;
        Player2.PPassMod = Player2.PPassMod - RCardArry[Diceroll].RiskCPen;
        Move();
      }
    }
    else if (Diceroll == 1) {
        RiskSpace.innerHTML= "<p>"+RCardArry[Diceroll].RiskCDesc+", +2 move, -10% chance to pass</p>";
        if (Turn == 1){
          Player1.pSpace = Player1.pSpace + RCardArry[Diceroll].RiskCBoon;
          Player1.PPassMod = Player1.PPassMod - RCardArry[Diceroll].RiskCPen;
          Move();
        }else if (Turn == 2){
          Player2.pSpace = Player2.pSpace + RCardArry[Diceroll].RiskCBoon;
          Player2.PPassMod = Player2.PPassMod - RCardArry[Diceroll].RiskCPen;
          Move();
        }
    }
    else if (Diceroll == 2) {
        RiskSpace.innerHTML= "<p>"+RCardArry[Diceroll].RiskCDesc+", +3 move, -15% chance to pass</p>";
        if (Turn == 1){
          Player1.pSpace = Player1.pSpace + RCardArry[Diceroll].RiskCBoon;
          Player1.PPassMod = Player1.PPassMod - RCardArry[Diceroll].RiskCPen;
          Move();
        }else if (Turn == 2){
          Player2.pSpace = Player2.pSpace + RCardArry[Diceroll].RiskCBoon;
          Player2.PPassMod = Player2.PPassMod - RCardArry[Diceroll].RiskCPen;
          Move();
        }
    }
    else if (Diceroll == 3) {
        RiskSpace.innerHTML= "<p>"+RCardArry[Diceroll].RiskCDesc+", +4 move, -20% chance to pass</p>";
        if (Turn == 1){
          Player1.pSpace = Player1.pSpace + RCardArry[Diceroll].RiskCBoon;
          Player1.PPassMod = Player1.PPassMod - RCardArry[Diceroll].RiskCPen;
          Move();
        }else if (Turn == 2){
          Player2.pSpace = Player2.pSpace + RCardArry[Diceroll].RiskCBoon;
          Player2.PPassMod = Player2.PPassMod - RCardArry[Diceroll].RiskCPen;
          Move();
        }
    }
    else if (Diceroll == 4){
        RiskSpace.innerHTML= "<p>"+RCardArry[Diceroll].RiskCDesc+", +5 move, -25% chance to pass</p>";
        if (Turn == 1){
          Player1.pSpace = Player1.pSpace + RCardArry[Diceroll].RiskCBoon;
          Player1.PPassMod = Player1.PPassMod - RCardArry[Diceroll].RiskCPen;
          Move();
        }else if (Turn == 2){
          Player2.pSpace = Player2.pSpace + RCardArry[Diceroll].RiskCBoon;
          Player2.PPassMod = Player2.PPassMod - RCardArry[Diceroll].RiskCPen;
          Move();
        }
    }
    turnWait = false;
    ChangeTurn();
  }
}

function SafeCardDraw(){
  if(AlreadyDrawn == false && safeDrawTime == true){
    DiceSpace.innerHTML = DieOne;
    AlreadyDrawn = true;
    safeDrawTime = false;
    var Diceroll = Math.floor((Math.random() * 5))
    if (Diceroll == 0){
      SafeArea.innerHTML= "<p>"+SCardArry[Diceroll].safeCDesc+", -1 move, +5% chance to pass</p>";
      if (Turn == 1){
        Player1.pSpace = Player1.pSpace - SCardArry[Diceroll].safeCPen;
        Player1.PPassMod = Player1.PPassMod + SCardArry[Diceroll].safeCBoon;
        Move();
      }else if (Turn == 2){
        Player2.pSpace = Player2.pSpace - SCardArry[Diceroll].safeCPen;
        Player2.PPassMod = Player2.PPassMod + SCardArry[Diceroll].safeCBoon;
        Move();
      }
    }
    else if (Diceroll == 1) {
        SafeArea.innerHTML= "<p>"+SCardArry[Diceroll].safeCDesc+", -2 move, +10% chance to pass</p>";
        if (Turn == 1){
          Player1.pSpace = Player1.pSpace - SCardArry[Diceroll].safeCPen;
          Player1.PPassMod = Player1.PPassMod + SCardArry[Diceroll].safeCBoon;
          Move();
        }else if (Turn == 2){
          Player2.pSpace = Player2.pSpace - SCardArry[Diceroll].safeCPen;
          Player2.PPassMod = Player2.PPassMod + SCardArry[Diceroll].safeCBoon;
          Move();
        }
    }
    else if (Diceroll == 2) {
        SafeArea.innerHTML= "<p>"+SCardArry[Diceroll].safeCDesc+", -3 move, +15% chance to pass</p>";
        if (Turn == 1){
          Player1.pSpace = Player1.pSpace - SCardArry[Diceroll].safeCPen;
          Player1.PPassMod = Player1.PPassMod + SCardArry[Diceroll].safeCBoon;
          Move();
        }else if (Turn == 2){
          Player2.pSpace = Player2.pSpace - SCardArry[Diceroll].safeCPen;
          Player2.PPassMod = Player2.PPassMod + SCardArry[Diceroll].safeCBoon;
          Move();
        }
    }
    else if (Diceroll == 3) {
        SafeArea.innerHTML= "<p>"+SCardArry[Diceroll].safeCDesc+", -4 move, +20% chance to pass</p>";
        if (Turn == 1){
          Player1.pSpace = Player1.pSpace - SCardArry[Diceroll].safeCPen;
          Player1.PPassMod = Player1.PPassMod + SCardArry[Diceroll].safeCBoon;
          Move();
        }else if (Turn == 2){
          Player2.pSpace = Player2.pSpace - SCardArry[Diceroll].safeCPen;
          Player2.PPassMod = Player2.PPassMod + SCardArry[Diceroll].safeCBoon;
          Move();
        }
    }
    else if (Diceroll == 4){
        SafeArea.innerHTML= "<p>"+SCardArry[Diceroll].safeCDesc+", -5 move, +25% chance to pass</p>";
        if (Turn == 1){
          Player1.pSpace = Player1.pSpace - SCardArry[Diceroll].safeCPen;
          Player1.PPassMod = Player1.PPassMod + SCardArry[Diceroll].safeCBoon;
          Move();
        }else if (Turn == 2){
          Player2.pSpace = Player2.pSpace - SCardArry[Diceroll].safeCPen;
          Player2.PPassMod = Player2.PPassMod + SCardArry[Diceroll].safeCBoon;
          Move();
        }
    }
    turnWait = false;
    ChangeTurn();
  }
}

function ChangeTurn(){
  if (Turn == 1 && Win == false && turnWait == false)
     {
       TurnCounter.innerHTML = player2turn;
       if(Player2.PLevel == 4){
         WinAttempt = true;
       }
       Turn = 2;
     }
     else if (Turn == 2 && Win == false && turnWait == false)
     {
       if(Player1.PLevel == 4){
         WinAttempt = true;
       }
       TurnCounter.innerHTML = player1turn;
       Turn = 1;
     }
}

function ClassPass(){
     var Diceroll = Math.floor((Math.random() * 100) + 1)
     if (Turn == 1){
       Diceroll = Diceroll + Player1.PPassMod;
       if (Player1.PLevel == 1){
         if(Diceroll > 75)
         {
           Player1.PLevel++;
           Player1.PL1Grade = 1;
           Player1.PPassMod = 0;
         }else if(Diceroll > 50){
           Player1.PLevel++;
           Player1.PL1Grade = 2;
           Player1.PPassMod = 0;
         }else if(Diceroll > 25){
           Player1.PLevel++;
           Player1.PL1Grade = 3;
           Player1.PPassMod = 0;
         }else if(Diceroll > 10){
           Player1.PL1Grade = 4;
           Player1.PPassMod = 0;
         }else if(Diceroll <= 10){
           Player1.PL1Grade = 5;
           Player1.PPassMod = 0;
         }
       }else if (Player1.PLevel == 2){
         if(Diceroll > 90)
         {
           Player1.PL2Grade = 1;
           Player1.PLevel++;
           Player1.PPassMod = 0;
         }else if(Diceroll > 75){
           Player1.PL2Grade = 2;
           Player1.PLevel++;
           Player1.PPassMod = 0;
         }else if(Diceroll > 50){
           Player1.PL2Grade = 3;
           Player1.PLevel++;
           Player1.PPassMod = 0;
         }else if(Diceroll > 25){
           Player1.PL2Grade = 4;
           Player1.PPassMod = 0;
         }else if(Diceroll <= 25){
           Player1.PL2Grade = 5;
           Player1.PPassMod = 0;
         }
       }else if (Player1.PLevel == 3){
         if(Diceroll > 95)
         {
           Player1.PL3Grade = 1;
           Player1.PLevel++;
           Player1.PPassMod = 0;
         }else if(Diceroll > 85){
           Player1.PL3Grade = 2;
           Player1.PLevel++;
           Player1.PPassMod = 0;
         }else if(Diceroll > 65){
           Player1.PL3Grade = 3;
           Player1.PLevel++;
           Player1.PPassMod = 0;
         }else if(Diceroll > 50){
           Player1.PL3Grade = 4;
           Player1.PPassMod = 0;
         }else if(Diceroll <= 50){
           Player1.PL3Grade = 5;
           Player1.PPassMod = 0;
         }
       }
     }else if (Turn == 2){
       Diceroll = Diceroll + Player2.PPassMod;
       if (Player2.PLevel == 1){
         if(Diceroll > 75)
         {
           Player2.PL1Grade = 1;
           Player2.PLevel++;
           Player2.PPassMod = 0;
         }else if(Diceroll > 50){
           Player2.PL1Grade = 2;
           Player2.PLevel++;
           Player2.PPassMod = 0;
         }else if(Diceroll > 25){
           Player2.PL1Grade = 3;
           Player2.PPassMod = 0;
           Player2.PLevel++;
         }else if(Diceroll > 10){
           Player2.PL1Grade = 4;
           Player2.PPassMod = 0;
         }else if(Diceroll <= 10){
           Player2.PL1Grade = 5;
           Player2.PPassMod = 0;
         }
       }else if (Player2.PLevel == 2){
         if(Diceroll > 90)
         {
           Player2.PL2Grade = 1;
           Player2.PLevel++;
           Player2.PPassMod = 0;
         }else if(Diceroll > 75){
           Player2.PL2Grade = 2;
           Player2.PLevel++;
           Player2.PPassMod = 0;
         }else if(Diceroll > 50){
           Player2.PL2Grade = 3;
           Player2.PLevel++;
           Player2.PPassMod = 0;
         }else if(Diceroll > 25){
           Player2.PL2Grade = 4;
           Player2.PPassMod = 0;
         }else if(Diceroll <= 25){
           Player2.PL2Grade = 5;
           Player2.PPassMod = 0;
         }
       }else if (Player2.PLevel == 3){
         if(Diceroll > 95)
         {
           Player2.PL3Grade = 1;
           Player2.PLevel++;
           Player2.PPassMod = 0;
         }else if(Diceroll > 85){
           Player2.PL3Grade = 2;
           Player2.PLevel++;
           Player2.PPassMod = 0;
         }else if(Diceroll > 65){
           Player2.PL3Grade = 3;
           Player2.PLevel++;
           Player2.PPassMod = 0;
         }else if(Diceroll > 50){
           Player2.PL3Grade = 4;
           Player2.PPassMod = 0;
         }else if(Diceroll <= 50){
           Player2.PL3Grade = 5;
           Player2.PPassMod = 0;
         }
       }
   }
}

function Showp1stats(){
 StatBlockP1.innerHTML= "";
 StatBlockP1.setAttribute('class','StatContainer')
 if(Player1.PPassMod >= 0){
  StatBlockP1.innerHTML = "<p>Player One's Stats</p><p>Pass Chance +"+Player1.PPassMod+"</p><p>"+Classes[0]+": "+Grade[Player1.PL1Grade]+"</p><p>"+Classes[1]+": "+Grade[Player1.PL2Grade]+"</p><p>"+Classes[2]+": "+Grade[Player1.PL3Grade]+"</p><p>"+Classes[3]+": "+Grade[Player1.PL4Grade]+"</p>";
 }
 else{
  StatBlockP1.innerHTML = "<p>Player One's Stats</p><p>Pass Chance "+Player1.PPassMod+"</p><p>"+Classes[0]+": "+Grade[Player1.PL1Grade]+"</p><p>"+Classes[1]+": "+Grade[Player1.PL2Grade]+"</p><p>"+Classes[2]+": "+Grade[Player1.PL3Grade]+"</p><p>"+Classes[3]+": "+Grade[Player1.PL4Grade]+"</p>";
 }
}

function Showp2stats(){
 StatBlockP2.innerHTML = "";
 StatBlockP2.setAttribute('class','StatContainer')
 if(Player2.PPassMod >= 0){
  StatBlockP2.innerHTML = "<p>Player Two's Stats</p><p>Pass Chance +"+Player2.PPassMod+"</p><p>"+Classes[0]+": "+Grade[Player2.PL1Grade]+"</p><p>"+Classes[1]+": "+Grade[Player2.PL2Grade]+"</p><p>"+Classes[2]+": "+Grade[Player2.PL3Grade]+"</p><p>"+Classes[3]+": "+Grade[Player2.PL4Grade]+"</p>";
 }
 else{
  StatBlockP2.innerHTML = "<p>Player Two's Stats</p><p>Pass Chance "+Player2.PPassMod+"</p><p>"+Classes[0]+": "+Grade[Player2.PL1Grade]+"</p><p>"+Classes[1]+": "+Grade[Player2.PL2Grade]+"</p><p>"+Classes[2]+": "+Grade[Player2.PL3Grade]+"</p><p>"+Classes[3]+": "+Grade[Player2.PL4Grade]+"</p>";
 }
 
}

function FinalStretch(){
  var Diceroll = Math.floor((Math.random() * 100) + 1)
  if (Turn == 1){
    Diceroll = Diceroll + Player1.PPassMod;
    if (Player1.PLevel == 4){
      if(Diceroll > 100)
      {
        Player1.PL4Grade = 1;
        WinnerWinner(1);
      }else if(Diceroll > 95){
        Player1.PL4Grade = 2;
        WinnerWinner(1);
      }else if(Diceroll > 85){
        Player1.PL4Grade = 3;
        WinnerWinner(1);
      }else if(Diceroll > 70){
        Player1.PL4Grade = 4;
        Player1.PPassMod = Player1.PPassMod + 5;
        WinAttempt = false;
        Turn = 2;
      }else if(Diceroll <= 70){
        Player1.PL4Grade = 5;
        Player1.PPassMod = Player1.PPassMod + 5;
        WinAttempt = false;
        Turn = 2;
      }
      ChangeTurn();
    }
  }else if (Turn == 2){
    if (Player2.PLevel == 4){
      if(Diceroll > 100)
      {
        Player2.PL4Grade = 1;
        WinnerWinner(2);
        Player2.PPassMod = 0;
      }else if(Diceroll > 95){
        Player2.PL4Grade = 2;
        WinnerWinner(2);
        Player2.PPassMod = 0;
      }else if(Diceroll > 85){
        Player2.PL4Grade = 3;
        WinnerWinner(2);
        Player2.PPassMod = 0;
      }else if(Diceroll > 70){
        Player2.PL4Grade = 4;
        Player2.PPassMod = Player2.PPassMod + 5;
        WinAttempt = false;
        Turn = 2;
      }else if(Diceroll <= 70){
        Player2.PL4Grade = 5;
        Player2.PPassMod = Player2.PPassMod + 5;
        WinAttempt = false;
        Turn = 1;
      }
      ChangeTurn();
  }
  }
}

function WinnerWinner(Winner){
  if(Winner == 1)
  {
    TurnCounter.innerHTML = "<p class=p1turn>Player One Wins!</p>";
    Win = true;
  }else if(Winner == 2)
  {
      TurnCounter.innerHTML = "<p class=p2turn>Player Two Wins!</p>";
      Win = true;
  }
}
