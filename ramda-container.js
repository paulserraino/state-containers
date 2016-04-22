var Container = module.exports = function() {
    this.subscribers = [];
    this.currentState = null;
    return this;
}

Container.prototype.initialState = function(s) {
    this.currentState = s;
    return this;
};

Container.prototype.subscribe = function(handler) {
    this.subscribers.push(handler);
    return this;
};

Container.prototype.reducer = function(r) {
    this.reducer = r;
    return this;
};

Container.prototype.onNext = function(action) {
    this.currentState = this.reducer(this.currentState, [action]);
    this.subscribers.forEach(sub => sub(this.currentState));
    return this;
};
