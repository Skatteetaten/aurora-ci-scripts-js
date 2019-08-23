export = index;
declare function index(options: any, callback?: any): any;
declare namespace index {
  class BundleWalker {
    static defaultMaxListeners: any;
    static init(): void;
    static listenerCount(emitter: any, type: any): any;
    static usingDomains: boolean;
    constructor(opt: any);
    path: any;
    parent: any;
    result: any;
    root: any;
    packageJsonCache: any;
    seen: any;
    didDone: any;
    children: any;
    node_modules: any;
    package: any;
    bundle: any;
    addListener(ev: any, fn: any): any;
    child(dep: any): void;
    childDep(dep: any): void;
    done(): void;
    emit(type: any, args: any): any;
    eventNames(): any;
    getMaxListeners(): any;
    listenerCount(type: any): any;
    listeners(type: any): any;
    off(type: any, listener: any): any;
    on(ev: any, fn: any): any;
    onPackage(pkg: any): any;
    onPackageJson(pj: any, data: any): any;
    onReaddir(nm: any): void;
    once(type: any, listener: any): any;
    prependListener(type: any, listener: any): any;
    prependOnceListener(type: any, listener: any): any;
    rawListeners(type: any): any;
    readModules(): void;
    readPackageJson(pj: any): void;
    removeAllListeners(type: any, ...args: any[]): any;
    removeListener(type: any, listener: any): any;
    setMaxListeners(n: any): any;
    start(): any;
  }
  namespace BundleWalker {
    class EventEmitter {
      // Circular reference from index.BundleWalker.EventEmitter
      static EventEmitter: any;
      static defaultMaxListeners: any;
      static init(): void;
      static listenerCount(emitter: any, type: any): any;
      static usingDomains: boolean;
      addListener(type: any, listener: any): any;
      emit(type: any, args: any): any;
      eventNames(): any;
      getMaxListeners(): any;
      listenerCount(type: any): any;
      listeners(type: any): any;
      off(type: any, listener: any): any;
      on(type: any, listener: any): any;
      once(type: any, listener: any): any;
      prependListener(type: any, listener: any): any;
      prependOnceListener(type: any, listener: any): any;
      rawListeners(type: any): any;
      removeAllListeners(type: any, ...args: any[]): any;
      removeListener(type: any, listener: any): any;
      setMaxListeners(n: any): any;
    }
  }
  class BundleWalkerSync {
    static defaultMaxListeners: any;
    static init(): void;
    static listenerCount(emitter: any, type: any): any;
    static usingDomains: boolean;
    constructor(opt: any);
    addListener(ev: any, fn: any): any;
    child(dep: any): void;
    childDep(dep: any): void;
    done(): void;
    emit(type: any, args: any): any;
    eventNames(): any;
    getMaxListeners(): any;
    listenerCount(type: any): any;
    listeners(type: any): any;
    off(type: any, listener: any): any;
    on(ev: any, fn: any): any;
    onPackage(pkg: any): any;
    onPackageJson(pj: any, data: any): any;
    onReaddir(nm: any): void;
    once(type: any, listener: any): any;
    prependListener(type: any, listener: any): any;
    prependOnceListener(type: any, listener: any): any;
    rawListeners(type: any): any;
    readModules(): void;
    readPackageJson(pj: any): any;
    removeAllListeners(type: any, ...args: any[]): any;
    removeListener(type: any, listener: any): any;
    setMaxListeners(n: any): any;
    start(): any;
  }
  namespace BundleWalkerSync {
    class EventEmitter {
      // Circular reference from index.BundleWalkerSync.EventEmitter
      static EventEmitter: any;
      static defaultMaxListeners: any;
      static init(): void;
      static listenerCount(emitter: any, type: any): any;
      static usingDomains: boolean;
      addListener(type: any, listener: any): any;
      emit(type: any, args: any): any;
      eventNames(): any;
      getMaxListeners(): any;
      listenerCount(type: any): any;
      listeners(type: any): any;
      off(type: any, listener: any): any;
      on(type: any, listener: any): any;
      once(type: any, listener: any): any;
      prependListener(type: any, listener: any): any;
      prependOnceListener(type: any, listener: any): any;
      rawListeners(type: any): any;
      removeAllListeners(type: any, ...args: any[]): any;
      removeListener(type: any, listener: any): any;
      setMaxListeners(n: any): any;
    }
  }
  function sync(options: any): any;
}
