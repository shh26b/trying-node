/*
 * IN THE NAME OF ALLAH
 * Title: Not found router
 * Description: Handle the 404 not found route
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/19/2022
 */

const routers = {};

routers.not_found_router = (request_properties, callback) => {
    callback(404, { message: "not found" });
};

module.exports = routers;
