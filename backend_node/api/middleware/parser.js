const mongoose = require('mongoose');


module.exports.parse_query_params = (req, res, next) => {
    const query = req.query;
    // console.log(query)
    const params = new Object();
    const params_search = new Object();
    const params_sort = new Object();

    if (query.format == 'xml') {
        params.BAD_REQUEST = 'xml';
        res.status(400).json({
            message: "BAD REQUEST"
        });
    }


    if (query.start) {
        params.start = query.start
    } else {
        params.start = 0
    }

    if (query.count) {
        params.count = query.count
    } else {
        params.count = 20
    }

    if (query.status) {
        if (query.status === 'WITHDRAWN') {
            params_search.withdrawn = true;
        } else if (query.status === 'ALL') {} else {
            params_search.withdrawn = false;
        }
    }

    if (query.sort) {
        const temp = query.sort.split("|");
        var direction = -1;
        if (temp[1] === "ASC") {
            direction = 1
        }
        if (temp[0] === "name") {
            params_sort.name = direction
        } else {
            params_sort._id = direction
        }
    }


    params.params_search = params_search;
    params.params_sort = params_sort;
    // console.log(params);
    return params;
}

module.exports.parse_prices_query_params = (req, res, next) => {
    const query = req.query;
    const params = new Object();
    const params_search = new Object();
    const params_sort = new Object();
    var pipeline = [];
    if (query.format == 'xml') {
        params.BAD_REQUEST = 'xml';
        res.status(400).json({
            message: "BAD REQUEST"
        });
    }

    if (query.start) {
        params.start = query.start
    } else {
        params.start = 0
    }

    if (query.count) {
        params.count = query.count
    } else {
        params.count = 20
    }

    if (query.status) {
        if (query.status === 'WITHDRAWN') {
            params_search.withdrawn = true;
        } else if (query.status === 'ALL') {} else {
            params_search.withdrawn = false;
        }
    }

    if (query.sort) {
        const temp = query.sort.split("|");
        var direction = -1;
        if (temp[1] === "ASC") {
            direction = 1
        }
        if (temp[0] === "name") {
            params_sort.name = direction
        } else {
            params_sort._id = direction
        }
    }
    // if (query.shops) {
    //     console.log(query.shops)
    // }

    if (query['geo.dist'] && query['geo.lng'] && query['geo.lat']) {
        pipeline.push({
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [parseInt(query['geo.lng']), parseInt(query['geo.lat'])]
                },
                distanceField: "dist.calculated",
                maxDistance: parseInt(query['geo.dist']),
            }
        })
    } else if (!query['geo.dist'] && !query['geo.lng'] && !query['geo.lat']) {
        // do nothing
    } else {
        // error
    }
    pipeline = pipeline.concat([{
        $lookup: {
            from: 'prices',
            localField: '_id',
            foreignField: 'shop',
            as: 'prices'
        }
    }, {
        $unwind: "$prices"
    }, {
        $lookup: {
            from: 'users',
            localField: 'prices.user',
            foreignField: '_id',
            as: 'user'
        }
    }, {
        $unwind: "$user"
    }, {
        $lookup: {
            from: 'products',
            localField: 'prices.product',
            foreignField: '_id',
            as: 'product'
        }
    }, {
        $unwind: "$product"
    }]);

    // console.log(pipeline);
    pipeline.concat([{
        "$match": preparePricesMatch(query)
    }])

    params.params_search = params_search;
    params.params_sort = params_sort;
    params.pipeline = pipeline;
    return params;
}





exports.validate_id = (req, res, next) => {
    const id = req.params.id;
    if (id.length != 24) {
        res.status(404).json({
            message: 'Not Found'
        })
        return true;
    }
}



function preparePricesMatch(query) {
    // console.log(query)
    var response = {}

    if (query.from && query.to) {
        var from = query.from.split("-");
        var to = query.to.split("-");
        response["prices.timestamp"] = {
            "$gte": new Date(new Date(from[0], from[1], from[2], 0, 0, 0).toISOString()),
            "$lt": new Date(new Date(to[0], to[1], to[2], 23, 59, 59).toISOString())
        }
    } else {
        var d = new Date();
        response["prices.timestamp"] = {
            "$gte": new Date(new Date(d.getFullYear(), d.getMonth(), d.getDate(), 2, 0, 0).toISOString()),
            "$lt": new Date(new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59).toISOString())
        }
    }

    if (query.tags) {
        response.tags = {
            "$in": ((Array.isArray(query.tags)) ? query.tags : [query.tags])
        }
    }
    if (query.shops) {
        temp = []
        if (Array.isArray(query.shops)) {
            query.shops.forEach(t => {
                temp.push(mongoose.Types.ObjectId(t))
            });
        } else {
            temp = [mongoose.Types.ObjectId(query.shops)]
        }
        response["product._id"] = {
            "$in": temp
        }
    }
    if (query.products) {
        temp = []
        if (Array.isArray(query.products)) {
            query.products.forEach(t => {
                temp.push(mongoose.Types.ObjectId(t))
            });
        } else {
            temp = [mongoose.Types.ObjectId(query.products)]
        }
        response._id = {
            "$in": temp
        }
    }

    // console.log(response)
}