// importo i dati
const { error } = require("console");
const posts = require("../data/data_posts");
const { title } = require("process");

// funzioni delle rotte dei posts
function index(req, res) {
    // assegniamo una variabile ai dati posts
    let filtredPosts = posts;

    // filtriamo i posts se nella query avviamo un valore da cercare
    if(req.query.tag) {
        filtredPosts = posts.filter(
            post => post.tags.includes(req.query.tag)
        );
    }

    // restituiamo i posts filtrati o tutti se non ci sono filtri
    res.json(filtredPosts)
}

function show(req, res) {
    
    // recuperiamo l'id e trasformiamolo in dato numerico
    const id = parseInt(req.params.id)

    // cerchiamo il post tramite id
    const post = posts.find(post => post.id === id);

    // controllo se il post è presente o meno
    if(!post){

        // restituzione errore
        res.status(404)

        // restituzione errore in formato json
        return res.json({
            error: "Not Found",
            message : "Post non trovato"
        })
    }

    // restituiamo in formato json
    res.json(post);
}

function store(req, res) {
    // creiamo un nuovo id incrementando l'ultimo id presente
    const newId = posts[posts.length - 1].id + 1;

    // creiamo un nuovo post
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    // aggiungiamo il post ai posts già esistenti
    posts.push(newPost);

    // check
    console.log(posts);
    
    // restituiamo lo status corretto e il post creato
    res.status(201);
    res.json(newPost);
}

function update(req, res) {
     // recuperiamo l'id e trasformiamolo in dato numerico
     const id = parseInt(req.params.id)

     // cerchiamo il post tramite id
     const post = posts.find(post => post.id === id);
 
     // controllo se il post è presente o meno
     if(!post){
 
         // restituzione errore
         res.status(404)
 
         // restituzione errore in formato json
         return res.json({
             error: "Not Found",
             message : "Post non trovato"
         })
     }

    // modifichiamo i dati dei post
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;;

    // check
    console.log(posts);

    // ritorniamo l'oggetto modificato
    res.json(post);
    
}

function modify(req, res) {
    // recuperiamo l'id e trasformiamolo in dato numerico
    const id = parseInt(req.params.id)

    // cerchiamo il post tramite id
    const post = posts.find(post => post.id === id);

    // controllo se il post è presente o meno
    if(!post){

        // restituzione errore
        res.status(404)

        // restituzione errore in formato json
        return res.json({
            error: "Not Found",
            message : "Post non trovato"
        })
    }

    // modifichiamo solo i dati che vogliamo cambiare dei post
    req.body.title ? post.title = req.body.title : post.title = post.title;
    req.body.content ? post.content = req.body.content : post.content = post.content;
    req.body.image ? post.image = req.body.image : post.image = post.image;
    req.body.tags ? post.tags = req.body.tags : post.tags = post.tags;

    // check
    console.log(posts);

    // restituiamo l'oggetto post modificato parzialmente
    res.json(post);    

}

function destroy(req, res) {

     // recuperiamo l'id e trasformiamolo in dato numerico
     const id = parseInt(req.params.id)

     // cerchiamo il post tramite id
     const post = posts.find(post => post.id === id);
 
     // controllo se il post è presente o meno
     if(!post){
 
         // restituzione errore
         res.status(404)
 
         // restituzione errore in formato json
         return res.json({
             error: "Not Found",
             message : "Post non trovato"
         })
     }
    // cancello il post trovato
    posts.splice(posts.indexOf(post), 1);

    // stampo in console i posts aggiornati
    console.log(posts);
    
    // ritorno la risposta positiva di avvenuta cancellazione
    res.sendStatus(204);
}

module.exports = { index, show, store, update, modify, destroy };