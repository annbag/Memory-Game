//ta zmienna, która przechowyuje tablice ze wszystkimi możliwymi kolorami, z tej tablicy chcemy wylosować kolor 
const cardsColor = ["red", "red", "blue", "blue", "green", "green", "yellow", "yellow", "orange", "orange", "lightblue", "lightblue", 
"grey", "grey", "pink", "pink", "purple", "purple"];
let cards = document.querySelectorAll('div'); //All, poniewąz chcemy pobrać wszystkie divy
//console.log(cards); wyświetli nam  NodeList, a nie tablicę
//console.log(cards instanceof Array) sprawdzamy czy jest tablicą
cards = [...cards]; // zamiana NodeList na tablicę
//console.log(cards);
//console.log(cards instanceof Array)

const startTime = new Date().getTime(); //pobranie aktualnej daty w ms

let activeCard = ''; // która karta została kliknięta
const activeCards = []; //tablica dla dwóch kart
//ile par w grze, potrzbne do zakończenia
const gamePairs = cards.length/2; 
//informacja o wyniku
let gameResult = 0;



const clickCard = function(){
	activeCard = this; 

	//ukrycie karty, która została kliknięta
	activeCard.classList.remove('hidden');
	//sprawdzenie czy to 1 kliknięcie, 
	if(activeCards.length === 0) {
		activeCards[0] = activeCard; //przypisanie tego co zostało klinięte
		return;
	} 
	//sprawdzenie czy to drugie kliknięcie
	else {
		cards.forEach(card => {
			card.removeEventListener('click', clickCard)
		})
		activeCards[1] = activeCard; //ustawienie drugiego kliknięcia w tablicy w indeksie 1
		
		//pół sekundy obie karty są odsłonięte, poźniej decyzja czy dobrze czy źle
		setTimeout(function(){
			//po drugim kliknięciu zawsze mozemy sprawdzić czy wygraliśmy-wygrana
			if(activeCards[0].className === activeCards[1].className) {
				console.log('wygrana')
				//nadanie klasy off
				activeCards.forEach(card => card.classList.add('off'))
				gameResult++;
				//sprawdznie czy nastąpi koniec gry
				if(gameResult == gamePairs) {
					const endTime = new Date().getTime();
					const gameTime = (endTime - startTime)/1000;
					alert(`Udało się! Twój wynik to: ${gameTime} sekund`)
					//odświeżenie strony, gra od nowa
					location.reload();
				}

			}
			//przegrana, ponowne ukrycie kart
			else {
				console.log('przegrana')
				//nadanie kalsy hidden
				activeCards.forEach(card => card.classList.add('hidden'))
			}
			//po każdych dwóch kliknięciach, reset elementów do stanu wyjsciowego 
			activeCard= '';
			activeCards.length = 0;
			//ponownie nadajemy nasłuchiwanie, aby można była ponownie kliknąć 
			cards.forEach(card => card.addEventListener('click', clickCard))
		}, 500)

	}

};

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