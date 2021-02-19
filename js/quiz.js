class Quiz{
    constructor(){
        
    }
    getState(){
        var gameStateRef = database.ref("gameState")
        gameStateRef.on("value",(data)=>{
            gameState = data.val();
        })
    }
    update(state){
        database.ref("/").update({
            gameState:state
        })
    }
    async start(){
        if(gameState==0){
            contestant = new Contestant();
            var contestantCountRef = await database.ref("contestantCount").once("value")
            if(contestantCountRef.exists()){
                contestantCount = contestantCountRef.val()
                contestant.getCount();
            }
            question = new Question();
            question.display();
        }
    }
    play(){
        question.hide();
        textSize(25);
        text("Result of the quiz",340,50);
        Contestant.getcontestantInfo();
        if(allContestants!==undefined){
            debugger
            var display_answers=230;
            fill("blue");
            textSize(20);
            text("Note: contestant who answered correct are highlighted in green colour",130,230);
            for(var plr in allContestants){
                debugger
                var correctAnswer = "3"
                if(correctAnswer === allContestants[plr].answer)
                fill("green")
                else
                fill("red");
                display_answers += 30
                textSize(20);
                text(allContestants[plr].name+":"+allContestants[plr].answer,250,display_answers)
            }
        }
    }
}