module.exports = class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype)
            .filter(prop => prop !== 'constructor' && !prop.startsWith('_'));
    }
}