function notFound (res, req, next){
    res.status(404);
    res.json({
        error : "notFound",
        message : "Pagina non trovata",
    })
}

module.exports = notFound;