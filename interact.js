let bullet=document.querySelector(".bullets .spans")
let myrequest=new XMLHttpRequest();
let question_area=document.querySelector(".quiz-area")
let answer_area=document.querySelector(".quiz-answer")
let mybutton=document.querySelector(".submit")
myrequest.open('GET',"/questions.json");
myrequest.send();
let currentindex=0;
let score=0;
let counter1;
myrequest.onreadystatechange=function(){
    if (myrequest.readyState === 4 && myrequest.status === 200){
        let jsopj=JSON.parse(myrequest.responseText);
        count=jsopj.length;
        createbullets(count);
        timecount(20);
        handlebullets();
        createquestion(jsopj[currentindex],count)
        // let right_answer=jsopj[currentindex]["right_answer"];
        document.querySelector(".count span").innerHTML=`${currentindex + 1}`;
        // checkanswer(jsopj[currentindex]);
        // checkanswer(jsopj[currentindex]);
        mybutton.onclick=function(){
            right_answer=jsopj[currentindex].right_answer;
            checkanswer(jsopj[currentindex]);
            currentindex ++;
            question_area.innerHTML=" ";
            answer_area.innerHTML=" ";
            document.querySelector(".count span").innerHTML=` ${currentindex + 1}`;
            createquestion(jsopj[currentindex],count);
            handlebullets();
            timecount(20);
            show_result(count);
        }
    }
};
function createbullets(count){
    for (let i=0 ;i<count;i++){
        let create_span=document.createElement("span");
        create_span.className="span";
        bullet.appendChild(create_span);
    };
}
function createquestion(obj,count){
    if(currentindex<count){    
        let heading=document.createElement("h1");
        let text1=document.createTextNode(obj["title"]);
        heading.appendChild(text1);
        question_area.appendChild(heading);
        heading.style.color="#009688";
        let rightanswer=obj['right_answer'];
        console.log(rightanswer);
        for(let i=1;i<=4;i++){
            let input_check=document.createElement("input");
            input_check.type="radio";
            input_check.name="answer";
            input_check.id=`answer_${i}`;
            input_check.dataset.answer=obj[`answer_${i}`];
            let label_check=document.createElement("label");
            let text2=document.createTextNode(obj[`answer_${i}`])
            label_check.appendChild(text2)
            let div_ele=document.createElement("div");
            div_ele.appendChild(input_check);
            div_ele.appendChild(label_check);
            answer_area.appendChild(div_ele);
            if (i===1){
            input_check.checked=true;
            }
    }
    }
    }
function checkanswer(){
    let input_radio=document.getElementsByName("answer");
    input_radio.forEach(function(element){
        if(element.checked){
            if(element.dataset.answer===right_answer){
                score++;
            }
        }
    })
}
function handlebullets(){
    let create_spans=document.querySelectorAll(".spans .span");
    create_spans.forEach(function(ele,index){
        if(currentindex===index){
            ele.classList.add("on")
        }
    })
}
// document.querySelector(".count span").innerHTML=`${currentindex + 1}`;
let resulting=document.querySelector(".results");
function show_result(count){
    if(currentindex==count){
        question_area.remove();
        answer_area.remove();
        mybutton.remove();
        document.querySelector(".spans").remove();
        document.querySelector(".quiz-info").remove();
        if ((score > count/2)&&(score<count)){
            resulting.classList.add("good");
        } else if(score === count){
            resulting.classList.add("perfect");
        } else if(score < count/2){
            resulting.classList.add("bad")
        }
        let text3=document.createTextNode(`you have scored ${score} of ${count}`)
        resulting.appendChild(text3)
        resulting.style.height="100px";
        resulting.style.display="flex";
        resulting.style.justifyContent="center";
        resulting.style.alignitems="center";
        resulting.style.color="white";
    }
}
function timecount(duration){
    if(currentindex<count){
        let counter1=setInterval(function(){
            duration --;
            let min;
            let sec=(parseInt(duration) % 60);
            if(duration>=60){
                min=(parseInt(duration) / 60);
            }else{
                min=0;
            }
            if(min<10){
                min=`0${min}`;
            }
            if(sec<10){
                min=`0${min}`;
            }
            if(duration==0){
                clear(counter1);
                // clearInterval(counter1);
                mybutton.click();
            }
            if (duration>0){
                mybutton.addEventListener("click",function(){
                    clear(counter1);
                })
            }
                // clear(counter1);
            // let text4=document.createTextNode(`${min} : ${sec}`);
            document.querySelector(".countdown").innerHTML=`${min} : ${sec}`;
            document.querySelector(".countdown").style.color="red";
    },1000);
    }
};
function clear(x){
    clearInterval(x);
}