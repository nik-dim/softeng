module.exports.parse_query_params = (query) => {
    const params = new Object();
    const params_search = new Object();
    const params_sort = new Object();

    if (query.start) { params.start = query.start }
    else {params.start = 0}

    if (query.count){ params.count = query.count }
    else { params.count = 20 }

    if (query.status){
        if (query.status === 'WITHDRAWN') { params_search.withdrawn = true;}
        else if (query.status === 'ALL') {}
        else { params_search.withdrawn = false;}
    }
    
    if (query.sort) {
        const temp = query.sort.split("|");
        var direction = -1;
        if (temp[1] === "ASC"){ direction = 1}
        if (temp[0] === "name"){ params_sort.name = direction}
        else {params_sort._id = direction}
    }

    params.params_search = params_search;
    params.params_sort = params_sort;
    console.log(params);
    return params;
}

module.exports.parse_prices_query_params = (query) => {
    const params = new Object();
    const params_search = new Object();
    const params_sort = new Object();


    if (query.start) { params.start = query.start }
    else {params.start = 0}

    if (query.count){ params.count = query.count }
    else { params.count = 20 }

    if (query.status){
        if (query.status === 'WITHDRAWN') { params_search.withdrawn = true;}
        else if (query.status === 'ALL') {}
        else { params_search.withdrawn = false;}
    }
    
    if (query.sort) {
        const temp = query.sort.split("|");
        var direction = -1;
        if (temp[1] === "ASC"){ direction = 1}
        if (temp[0] === "name"){ params_sort.name = direction}
        else {params_sort._id = direction}
    }

    // if (query.dist && query.lng && query.lat){
    //     params_search.location = {
    //         $near: {
    //             $maxDistance: query.dist,
    //             $geometry: {
    //              type: "Point",
    //              coordinates: [query.lng, query.lat]
    //             }
    //         }
    //     }
    // }
    // else if (!query.geo.dist && !query.geo.lng && !query.geo.lat){
    //     // do nothing
    // }
    // else {
    //     // error
    // }

    if (query.from && query.to) {
        var from = query.from.split("-");
        var to = query.to.split("-");
        params_search.timestamp = { 
            $gte: new Date(from[0], from[1], from[2],0,0,0).toISOString(),
            $lt: new Date(to[0], to[1],to[2],23, 59, 59).toISOString()
        }
    }
    else {
        var d = new Date();
        params_search.timestamp = { 
            $gte: new Date(d.getFullYear(), d.getMonth(), d.getDay(), 0,0,0).toISOString(),
            $lt: new Date(d.getFullYear(), d.getMonth(), d.getDay(), 23, 59, 59).toISOString()
        }
        console.log(params_search);
    }
    


    // console.log(params_sort)
    params.params_search = params_search;
    params.params_sort = params_sort;

    return params;
}