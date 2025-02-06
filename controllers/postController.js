// importo i dati
const { error } = require("console");
const posts = require("../data/data_posts")

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