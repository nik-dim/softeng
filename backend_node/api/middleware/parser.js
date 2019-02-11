module.exports.parse_query_params = (query) => {
    const params = new Object();
    const params_search = new Object();
    const params_sort = new Object();
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
    // console.log(params_sort)
    params.params_search = params_search;
    params.params_sort = params_sort;

    return params;
}

module.exports.parse_prices_query_params = (query) => {
    const params = new Object();
    const params_search = new Object();
    const params_sort = new Object();
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
    // console.log(params_sort)
    params.params_search = params_search;
    params.params_sort = params_sort;

    return params;
}