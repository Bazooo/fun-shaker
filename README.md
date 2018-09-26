# Fun-Shaker

## Install

```console
git clone https://github.com/Bazooo/fun-shaker.git
```

Upon release on npm
```console
npm install fun-shaker
```

## Usage

```javascript
import { Shaker } from 'fun-shaker';

let shaker = new Shaker();
```

### `shaker.add(shakerObject) or shaker.add(callback [, interval, name])`

Adds a new object to the shaker

```javascript
// Shaker object
shaker.add({
  callback: my_callback, // Function with no argument to be called back on shake
  name: 'my_callback_name', // (Optional) Unique name for the shaker object
  interval: 3000 // (Optional) Interval before called on autoshake
});

// OR
shaker.add(my_callback, 3000, 'my_callback_name');
```

### `shaker.remove(index) or shaker.remove(name)`

Removes an object at an index or with an unique name

```javascript
// Remove at index
shaker.remove(3);

// OR
shaker.remove('my_callback_name');
```

### `shaker.shake()`

Runs the next callback in the queue

### `shaker.startAutoshaker()`

Shakes automatically in intervals

### `shaker.stopAutoshaker()`

Stops the autoshaker

### `shaker.pauseAutoshaker()`

Pauses the autoshaker

### `shaker.resumeAutoshaker()`

Resumes the autoshaker

### `shaker.rewind()`

Rewinds the shaker by one

### `shaker.getNbLeft()`

Get the number of objects left in the shaker

### `shaker.getIndex(name)`

Get the index number of an object

```javascript
shaker.getIndex('my_callback_name');
// => 3
```

## Options

## Examples

## Authors

* **Mathieu Chan** - [Bazooo](https://github.com/Bazooo)

See also the list of [contributors](https://github.com/Bazooo/fun-shaker/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
