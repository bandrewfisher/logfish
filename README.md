# logfish

Logfish is a simple solution for real time logging in the browser. It is used in conjunction with logfish.dev to direct logged output to your browser so that it is not mixed in with other console output.

## Installation

npm:

```
$ npm install logfish
```

yarn:

```
$ yarn add logfish
```

## Usage

First go to logfish.dev to retrieve a temporary API key. Then use that key to create a Logfish object.

```
const Logfish = require("logfish").default;
// or
import Logfish from "logfish";

const lf = new Logfish("API_KEY_HERE");
lf.info('some handy info');
lf.warn('something could go wrong here!');
lf.debug('some variable value');
lf.error('something went wrong');
```

You will see the output from each of these calls in the logfish.dev console.

## API

The following methods exist on a new `Logfish` object.

### lf.log(logData: any, { level }: LogConfig = { level: 'INFO' }): Promise\<void\>

Logs `logData` to the logfish.dev console. `logData` must be a string or a JSON serializable object.
`level` is one of 'INFO', 'WARN', 'DEBUG', or 'ERROR'.

### lf.info(logData: any): Promise\<void\>

Equivalent to `lf.log(logData, { level: 'INFO' })`

### lf.warn(logData: any): Promise\<void\>

Equivalent to `lf.log(logData, { level: 'WARN' })`

### lf.debug(logData: any): Promise\<void\>

Equivalent to `lf.log(logData, { level: 'DEBUG' })`

### lf.error(logData: any): Promise\<void\>

Equivalent to `lf.log(logData, { level: 'ERROR' })`
