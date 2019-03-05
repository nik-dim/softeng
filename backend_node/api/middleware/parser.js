const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
        if (temp[0] === "geoDist") {
            params_sort["dist.calculated"] = direction
        } else if (temp[0] === "date") {
            params_sort["prices.dateFrom"] = direction
        } else {
            params_sort["prices.value"] = direction
        }
    } else {
        params_sort["prices.value"] = 1
    }

    if (query['geoDist'] && query['geoLng'] && query['geoLat']) {
        pipeline.push({
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [parseInt(query['geoLng']), parseInt(query['geoLat'])]
                },
                distanceField: "dist.calculated",
                maxDistance: parseInt(query['geoDist']) + 1,
            }
        })
    } else if (query['geoDist'] || query['geoLng'] || query['geoLat']) {
        params.NOT_ENOUGH_PARAMS = 'geo';
        res.status(400).json({
            message: "BAD REQUEST: not enough params"
        });
    } else {
        // do nothing
    }
    pipeline = pipeline.concat([{
        $lookup: {
            from: 'prices',
            localField: '_id',
            foreignField: 'shopId',
            as: 'prices'
        }
    }, {
        $unwind: "$prices"
    // }, {
        // $lookup: {
            // from: 'users',
            // localField: 'prices.userId',
            // foreignField: '_id',
            // as: 'user'
        // }
    // }, {
        // $unwind: "$user"
    }, {
        $lookup: {
            from: 'products',
            localField: 'prices.productId',
            foreignField: '_id',
            as: 'product'
        }
    }, {
        $unwind: "$product"
    }]);
    temp = preparePricesMatch(pipeline, query)
    // console.log(temp);
    if (temp === true) {
        params.NOT_ENOUGH_PARAMS = 'date';
        res.status(400).json({
            message: "BAD REQUEST: not enough params"
        });
    }
    // console.log(pipeline);
    // pipeline = pipeline.concat([{
    //     "$match": temp
    // }])
    pipeline = temp;
    // pipeline = pipeline.concat([{
    //     "$facet": {
    //         "count": [{
    //                 $group: {
    //                     _id: null,
    //                     myCount: {
    //                         $sum: 1
    //                     }
    //                 }
    //             },
    //             {
    //                 $project: {
    //                     _id: 0
    //                 }
    //             }
    //         ],
    //         "instances": [{
    //             $match: {
    //                 tags: {
    //                     $nin: ["popopop"]
    //                 },
    //             }
    //         }]
    //     }
    // }, {
    //     $unwind: "$instances"
    // }])
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

function preparePricesMatch(pipeline, query) {
    // console.log(query)
    var response = {}

    if (query.dateFrom && query.dateTo) {
        var from = query.dateFrom.split("-");
        var to = query.dateTo.split("-");
        from = from.map(a => parseInt(a));
        to = to.map(a => parseInt(a));
        console.log(from);
        console.log(to);
        var dFrom = new Date(Date.UTC(from[0], from[1] - 1, from[2], 0, 0, 0))
        var dTo = new Date(Date.UTC(to[0], to[1] - 1, to[2] + 1, 23, 59, 59))
        response["prices.dateFrom"] = {
            "$gte": dFrom
        }
        response["prices.dateTo"] = {
            "$lte": dTo        
        }
        console.log(response);
    } else if (query.dateFrom || query.dateTo) {
        return true;
    } else {
        var d = new Date();
        response["prices.dateFrom"] = {
            "$gte": new Date(new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0)).toISOString())
        }
        response["prices.dateTo"] = {
            "$lte": new Date(new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59)).toISOString())
        }
        console.log(response["prices.dateTo"]);

    }

    if (query.tags) {
        response.tags = {
            "$in": ((Array.isArray(query.tags)) ? query.tags : [query.tags])
        }
    }

    pipeline = pipeline.concat([{
        "$match": response
    }])

    response = {}
    if (query.shops) {
        temp = []
        if (Array.isArray(query.shops)) {
            query.shops.forEach(t => {
                if (t.length === 24) {
                    temp.push(ObjectId(t))
                }
            });
        } else {
            temp = ((query.shops.length != 24) ? [] : [ObjectId(query.shops)])
        }
        if (temp.length > 0) {
            response._id = {
                "$in": temp
            }
            pipeline = pipeline.concat([{
                "$match": response
            }])
        }
    }
    response = {}
    if (query.products) {
        temp = []
        if (Array.isArray(query.products)) {
            query.products.forEach(t => {
                if (t.length === 24) {
                    temp.push(ObjectId(t))
                }
            });

        } else {
            temp = ((query.products.length != 24) ? [] : [ObjectId(query.products)])
        }
        if (temp.length > 0) {
            response["product._id"] = {
                "$in": temp
            }
            pipeline = pipeline.concat([{
                "$match": response
            }])
        }
    }
    return pipeline

}
