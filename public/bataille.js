document.addEventListener("DOMContentLoaded", function() {
    // socket ouverte vers le serveur
    let sock = io.connect();
    let gridPlace= document.querySelectorAll("p");
    //Top grid for other player
    gridPlace[0].after(creatHtmlGrid( "P2"));
    //bot grid for you <3
    gridPlace[1].after(creatHtmlGrid("P1"));
});

//Global variables for boat size
var lanceTorpilles = 0;
var contreTorpilleur = 0;
var sousMarin = 0;
var cuiRasse = 0;
var porteAvions = 0;
//Global variable for grid size
var grid_size = 10;

//maj number of boat
function majBoatNb(step, _class){
    if(!_class.localeCompare('lancetorpilles')){
        lanceTorpilles += step;
    }
    else if(!_class.localeCompare('contretorpilleur')){
        contreTorpilleur += step;
    }
    else if(!_class.localeCompare('sousmarin')){
        sousMarin += step;
    }
    else if(!_class.localeCompare('cuirasse')){
        cuiRasse += step;
    }
    else if(!_class.localeCompare('porteavions')){
        porteAvions += step;
    }
    console.log("Lance torpilles :"+lanceTorpilles);
    console.log("Contre torpilleur :"+contreTorpilleur);
    console.log("Sous-marin :"+sousMarin);
    console.log("Cuirassé :"+cuiRasse);
    console.log("Porte avions :"+porteAvions+"\n\n\n\n\n\n");

}

//return true if there is already cell with this type of boat on map
function hasAlreadyOne(){
    if(!getBoatClass().localeCompare('lancetorpilles')){
        return lanceTorpilles;
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        return contreTorpilleur;
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        return sousMarin;
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        return cuiRasse;
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        return porteAvions;
    }
}

//get value of radio buttons
function getBoatClass(){
    let inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].type == 'radio'){
            if(inputs[i].checked){
                return inputs[i].value;
            }
        }
    }
}

//Check if boat can be set
function availableBoatPosition(element){
    if(hasAlreadyOne() == 0)return true;
    //check element x y-1
    let pos;
    let element_test;

    pos = String.fromCharCode(element.id[0].charCodeAt()-1)+element.id[1];
    if(pos[0].charCodeAt()>= 'A'.charCodeAt()){
        element_test = document.getElementById(pos);
        if(element_test.classList.length != 0 && !getBoatClass().localeCompare(element_test.classList[0]))return true;
    }

    //check element x y+1
    pos = String.fromCharCode(element.id[0].charCodeAt()+1)+element.id[1];
    if(pos[0].charCodeAt()<= 'J'.charCodeAt()){
        element_test = document.getElementById(pos);
        if(element_test.classList.length != 0  && !getBoatClass().localeCompare(element_test.classList[0]))return true;
    }

    //check element x-1 y
    pos = element.id[0]+String(element.id[1]-1);
    if(pos[1]>=1){
        element_test = document.getElementById(pos);
        if(element_test.classList.length != 0  && !getBoatClass().localeCompare(element_test.classList[0]))return true;
    }

    //check element x+1 y
    pos = element.id[0]+String(Number(element.id[1])+1);
    if(pos[1]<=10){
        element_test = document.getElementById(pos);
        if(element_test.classList.length != 0  && !getBoatClass().localeCompare(element_test.classList[0]))return true;
    }
    return false;
}



//set color on cell
function colorizeGridCells(element){
    if(element.classList.length>0 && !getBoatClass().localeCompare(element.classList[0])){
        majBoatNb(-1, getBoatClass());
        element.removeAttribute('class');
        return true
    }
    else if(element.classList.length>0){
        alert("Attention cette case est déjà occupée");
        return false
    }
    else{
        if(availableBoatPosition(element)){
            element.classList.add(getBoatClass());
            majBoatNb(1,getBoatClass());
        }
        else{
            return false;
        }
    }
}

//Create play grid with click event to add boats
function creatHtmlGrid(player){
    let table = document.createElement('table');
    table.id = player;
    let body = document.createElement('tbody');
    for(let i =0; i<= grid_size; ++i){
        let tr = document.createElement('tr');
        for(let j =0; j <= grid_size; ++j){
            let td = document.createElement('td');
            if(i == 0 && j != 0){
                td.append(j);
            }
            if(i != 0 && j == 0){
                td.append(String.fromCharCode('A'.charCodeAt() + (i-1)));
            }
            if(i!=0 && j!=0 && player.localeCompare("P2")){
                //Each game cell has for id by its position on the grid
                td.id = String.fromCharCode('A'.charCodeAt() + (i-1))+j;
                td.addEventListener('click',()=>colorizeGridCells(td));
            }
            tr.append(td);
        }
        body.append(tr);
    }
    table.append(body);
    return table;
}

