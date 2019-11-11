const fs = require('fs')
const randomInteger = require('secure-random-uniform')

function readLines(filename) {
	let contents = fs.readFileSync(filename).toString()
	return contents.trim().split(/\r\n?|\n/)
}

const phraseOrder = [
	{words: readLines('wordlists/0-quantity.txt'), always: true},
	{words: readLines('wordlists/adverbs.txt'), always: true},
	{words: readLines('wordlists/1-quality.txt'), always: true},
	{words: readLines('wordlists/2-size.txt')},
	{words: readLines('wordlists/3-age.txt')},
	{words: readLines('wordlists/4-shape.txt')},
	{words: readLines('wordlists/5-color.txt')},
	{words: readLines('wordlists/6-proper.txt')},
	{words: readLines('wordlists/7-qualifier.txt')},
	{words: readLines('wordlists/nouns.txt'), always: true}
]

function phrase() {
	let optional
	while(true) {
		optional = randomInteger(phraseOrder.length)
		if(!phraseOrder[optional].always) break
	}
	let lists = phraseOrder.filter((list, i) => list.always || i === optional)
	let words = lists.map((list) => list.words[randomInteger(list.words.length)])
	return words.join(' ')
}

module.exports = phrase
