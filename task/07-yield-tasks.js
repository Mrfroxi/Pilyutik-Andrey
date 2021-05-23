'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 * See the full text at
 * http://99-bottles-of-beer.net/lyrics.html
 *
 * NOTE: Please try to complete this task faster then original song finished:
 * https://www.youtube.com/watch?v=Z7bmyjxJuVY   :)
 *
 *
 * @return {Iterable.<string>}
 *
 */
 function* get99BottlesOfBeer() {
	for(let i = 99; i > 2 ; ) {
    	yield `${i} bottles of beer on the wall, ${i} bottles of beer.`;
    	yield `Take one down and pass it around, ${--i} bottles of beer on the wall.`;
	}

	yield `2 bottles of beer on the wall, 2 bottles of beer.`;
    yield `Take one down and pass it around, 1 bottle of beer on the wall.`;
	yield '1 bottle of beer on the wall, 1 bottle of beer.';
	yield 'Take one down and pass it around, no more bottles of beer on the wall.';
	yield 'No more bottles of beer on the wall, no more bottles of beer.';
	yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
}


/**
 * Returns the Fibonacci sequence:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * See more at: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * @return {Iterable.<number>}
 *
 */
 function* getFibonacciSequence() {
    let add = 1;
	let result = 0;
	while(true) {
    	yield result;
    	let newAdd = result;
    	result += add;
    	add = newAdd;
	}
}


/**
 * Traverses a tree using the depth-first strategy
 * See details: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 * @example
 *
 *   var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
 function* depthTraversalTree(root) {
	let stack = [root]; 
 
	function childrenToStack(children) { 
		if(!children)  
			return 
		var i = children.length; 
		while(i) { 
			stack.push(children[--i]); 
		} 
	} 
 
	while ( stack.length ) { 
		let n = stack.pop(); 
		childrenToStack(n.children); 
		yield n; 
	} 
}




/**
 * Traverses a tree using the breadth-first strategy
 * See details: https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 1):
 *
 *            1
 *          / | \
 *         2  3  4
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       5   6     7
 *           |
 *           8
 *
 */
 function* breadthTraversalTree(root) {
	let queue = [root]; 
 
	while ( queue.length ) { 
		let n = queue.shift(); 
		if(n.children) { 
			n.children.forEach(x => queue.push(x)); 
		} 
		yield n; 
	} 
}


/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 *
 * @example
 *   [ 1, 3, 5, ... ], [2, 4, 6, ... ]  => [ 1, 2, 3, 4, 5, 6, ... ]
 *   [ 0 ], [ 2, 4, 6, ... ]  => [ 0, 2, 4, 6, ... ]
 *   [ 1, 3, 5, ... ], [ -1 ] => [ -1, 1, 3, 5, ...]
 */
 function* mergeSortedSequences(source1, source2) {
	var s1 = source1();
	var s2 = source2();

	let v1 = s1.next();
	let v2 = s2.next();

	do {
		let result;
		if(v1.value < v2.value) {
			result = v1;
			v1 = s1.next();
		} else {
			result = v2;
			v2 = s2.next();
		} 
			yield result.value;
	} while(!v1.done && !v2.done);

	let next;
	if(v1.done) {
		yield v2.value;
		next = () => s2.next().value;
	} else {
		yield v1.value;
		next = () => s1.next().value;
	}

	while(true) { 
		yield next();
	}
}


module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    mergeSortedSequences: mergeSortedSequences
};
