//#1 aggiungi un nuovo todo dalla classe add #1
const addForm = document.querySelector('.add');
//prendiamo il UL dove metteremo dentro il template generato ##########10
const list = document.querySelector('.todos');
//aggiungere il for search per poter cercare nella lista ###############15
const search = document.querySelector('.search input');


//#6 Creare una funzione che aggiungerà html nel browser dinamicamente  ######6
const generateTemplate = (todo) => {
    //#######passiamo dentro il todo #######7

    //generiamo il template con un template string #9
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <!-- left -->
        <span>${todo}</span>
        <!-- right -->
        <i class="far fa-trash-alt delete"></i>
      </li>
    `;
/*########## mettiamo += perche cosi possiamo aggiungere sempre uno nuovo e non cancelliamo
    quello che ce gia
    se invece metto = soprascrive sempre quello vecchio con quello nuovo ##########11
*/
    list.innerHTML += html;

};

//#2 aggiungi un eventlistener per fare submit nel form ##2
addForm.addEventListener('submit', e => {
    //###prevenire che la pagina carichi ###3
    e.preventDefault();

    /*#### prendere quello che ha scritto l'utente  ####4
    #####5 aggiungiamo .trim() per prevenire i spazzi vuoti tra i caratteri #####5 */

    const todo = addForm.add.value.trim();
    // console.log(todo)

    // verifichiamo che ci sia del testo e dentro ciamiamo generateTemplate ############12
    if(todo.length){
        // chiamiamo la funzione 8#
        generateTemplate(todo);
        //ressetare tutti i campi input in form #############13
        addForm.reset();
    }
});

/* cancellare i TODO  ##############14
usiamo event delegation su ul e cerchiamo se ha il button del cestino,
se ce l'ha allora posiamo cancellare se invece nu ingoriamo tutto il resto,
e piu efficace in performance e non abbiamo bisogno di event listeners su tutti LI*/

list.addEventListener('click', e => {
    //guardiamo se classlist contiene la classe delete
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});

/*################16
filtrare le ricerche quando l'utente inserisce le parole: una funzione che sara responsabile del 
guardare e di cercare di confrontare il testo che c'è nella lista.
se abbiamo un match, non vogliamo fare nulla perche vogliamo vedere il risultato,
se non abbiamo un match, vogliamo nascondere il resto del todo aplicando una classe che non e uguale
 */
//##################18
const filterTodos = (term) =>{
    //ogni volta che si aggiunge un carattere si cerca
    //convertiamo in un array che andra in tutta la lista con tutti i todo e trovera
    // la risposta per ciascuna
    //filter ci ritornera un nuovo array e quell array sara qualsiasi elemento teniamo dentro i todo
    Array.from(list.children)
    // console.log(todo.textContent)
        // return true
        //il return sara vero se la cosa che cerchiamo avra il termine che scriviamo
        //return todo.textContent.includes(term)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
         // console.log(todo.textContent)
        // return true
        //il return sara vero se la cosa che cerchiamo avra il termine che scriviamo
        //return todo.textContent.includes(term)
    
        //applicheremo una classe per ogni valore
    .forEach((todo)=> todo.classList.add('filtered'))


    //rimoviamo
    Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo)=> todo.classList.remove('filtered'))
};

//#################17
search.addEventListener('keyup', () => {
    //prima cosa dobbiamo prendere il termine che usa l'input in quell preciso momento
    const term = search.value.trim().toLowerCase();

    filterTodos(term);

});
