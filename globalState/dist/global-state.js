"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToGlobalState = exports.useGlobalState = exports.updateUser = void 0;
var valtio_1 = require("valtio");
/**
 * Global shared Store instance
 */
var globalStoreInstance = (0, valtio_1.proxy)({
    user: null
});
/**
 * Mutating the global shared proxy instance,
 * Valtio will handle the Proxy logic
 */
var updateUser = function (user) {
    globalStoreInstance.user = user;
};
exports.updateUser = updateUser;
var useGlobalState = function () {
    return (0, valtio_1.useSnapshot)(globalStoreInstance);
};
exports.useGlobalState = useGlobalState;
exports.default = globalStoreInstance;
var subscribeToGlobalState = function (callback) {
    var store = globalStoreInstance;
    var state = (0, valtio_1.snapshot)(store);
    if (!store) {
        return function () { };
    }
    callback(state);
    return (0, valtio_1.subscribe)(store, function () {
        console.log("user changed");
        callback((0, valtio_1.snapshot)(store));
    });
};
exports.subscribeToGlobalState = subscribeToGlobalState;
//# sourceMappingURL=global-state.js.map