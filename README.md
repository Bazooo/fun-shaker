# Fun-Shaker

## Install

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

### `shaker.add()`

## Options

## Examples

## Authors

* **Mathieu Chan** - [Bazooo](https://github.com/Bazooo)

See also the list of [contributors](https://github.com/Bazooo/fun-shaker/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
