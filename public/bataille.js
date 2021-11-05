document.addEventListener("DOMContentLoaded", function() {
    // socket ouverte vers le serveur
    let sock = io.connect();
    let gridPlace= document.querySelectorAll("p");
    //Top grid for other player
    gridPlace[0].after(creatHtmlGrid(10, "P2"));
    //bot grid for you <3
    gridPlace[1].after(creatHtmlGrid(10,"P1"));
});

//Global variables for boat size
var lanceTorpilles = 0;
var contreTorpilleur = 0;
var sousMarin = 0;
var cuiRasse = 0;
var porteAvions = 0;

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



//set color on cell
function colorizeGridCells(element){
    console.log(element.id);
    if(element.classList.length>0 && !getBoatClass().localeCompare(element.classList[0])){
        majBoatNb(-1, getBoatClass());
        element.removeAttribute('class');
    }
    else if(element.classList.length>0){
        alert("Attention cette case est déjà occupée");
    }
    else{
        element.classList.add(getBoatClass());
        majBoatNb(1,getBoatClass());

    }
}

//Create play grid with click event to add boats
function creatHtmlGrid(size, player){
    let table = document.createElement('table');
    table.id = player;
    let body = document.createElement('tbody');
    for(let i =0; i<= size; ++i){
        let tr = document.createElement('tr');
        for(let j =0; j <= size; ++j){
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

