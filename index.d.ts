export type Options = {
	/**
	Prettify the file paths in the stack:

	`/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15` → `~/dev/clean-stack/unicorn.js:2:15`

	@default false
	*/
	readonly pretty?: boolean;

	/**
	Remove the given base path from stack trace file paths, effectively turning absolute paths into relative ones.

	Example with `'/Users/sindresorhus/dev/clean-stack/'` as `basePath`:

	`/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15` → `unicorn.js:2:15`
	*/
	readonly basePath?: string;

	/**
	Remove the stack lines where the given function returns `false`. The function receives the path part of the stack line.

	```
	import cleanStack from 'clean-stack';

	const error = new Error('Missing unicorn');

	console.log(cleanStack(error.stack));
	// Error: Missing unicorn
	//     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15)
	//     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/omit-me.js:1:16)

	const pathFilter = path => /omit-me/.test(path);

	console.log(cleanStack(error.stack, {pathFilter}));
	// Error: Missing unicorn
	//     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15)
	```
	*/
	readonly pathFilter?: (path: string) => boolean;
};

/**
Clean up error stack traces. Removes the mostly unhelpful internal Node.js entries.

@param stack - The `stack` property of an `Error`.
@returns The cleaned stack or `undefined` if the given `stack` is `undefined`.

@example
```
import cleanStack from 'clean-stack';

const error = new Error('Missing unicorn');

console.log(error.stack);

// Error: Missing unicorn
//     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15)
//     at Module._compile (module.js:409:26)
//     at Object.Module._extensions..js (module.js:416:10)
//     at Module.load (module.js:343:32)
//     at Function.Module._load (module.js:300:12)
//     at Function.Module.runMain (module.js:441:10)
//     at startup (node.js:139:18)

console.log(cleanStack(error.stack));

// Error: Missing unicorn
//     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15)
```
*/
export default function cleanStack<T extends string | undefined>(stack: T, options?: Options): T;
