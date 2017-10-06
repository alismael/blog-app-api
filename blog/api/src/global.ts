import { Maybe } from 'tsmonad';

// extend native typescript types
declare global {
    interface Array<T> {
      head(): Maybe<T>;
    }
  }
  
  if (!Array.prototype.head) {
    Array.prototype.head = function<T>(): Maybe<T> {
      if(this.length != 0)
        return Maybe.just(this[0])
      else
        return Maybe.nothing()
    }
  }
  
  export {}