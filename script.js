//ta zmienna, która przechowyuje tablice ze wszystkimi możliwymi kolorami, z tej tablicy chcemy wylosować kolor 
const cardsColor = ["red", "red", "blue", "blue", "green", "green", "yellow", "yellow", "orange", "orange", "lightblue", "lightblue", 
"grey", "grey", "pink", "pink", "purple", "purple"];
let cards = document.querySelectorAll('div'); //All, poniewąz chcemy pobrać wszystkie divy
//console.log(cards); wyświetli nam  NodeList, a nie tablicę
//console.log(cards instanceof Array) sprawdzamy czy jest tablicą
cards = [...cards]; // zamiana NodeList na tablicę
//console.log(cards);
//console.log(cards instanceof Array)
const clickCard = function(){};
const init = function() {
	//forEach wykonuje funkcję raz dla każdego card(elementu tablicy)
	cards.forEach(function(card){
		const position = Math.floor(Math.random() * cardsColor.length);
		//dodanie klasy do danego diva
		card.classList.add(cardsColor[position]);
		//spice usuwa nam konkretny element z tablicy, tylko musimy wskazać o jakim indeksie -->1-jeden element, tablica bedzie krótsza przy kolejnym losowaniu
		cardsColor.splice(position, 1);
	})
	// po sekundzie doodanie klasy hidden - ukrycie i dodanie nasłuchwiania na kilk
	setTimeout(function(){
		cards.forEach(function(card){
			card.classList.add('hidden')
			card.addEventListener('click', clickCard)
		})
	}, 1000)
}
init()