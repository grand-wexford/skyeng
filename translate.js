"use strict";

window.addEventListener("mouseup", translate);


function translate(event) {
	var self = this;

	self.word = getSelectionText();
	self.DOMCard = document.getElementById('card');
	self.DOMCardImg = document.getElementById('card-img');
	self.DOMCardText = document.getElementById('card-text');
	self.DOMCardMeanings = document.getElementById('card-meanings');

	if (self.word && self.word !== '') {
		getJSON('http://dictionary.skyeng.ru/api/v2/search-word-translation?text=' + self.word, onSuccessRequestTranslate);
	}
	self.DOMCard.classList.remove('card-active');

	function meaningActive(event) {
		document.getElementsByClassName('card-meaning-active')[0].classList.remove('card-meaning-active');
		event.target.classList.add('card-meaning-active');
		setImage(getElementIndex(event.target));
	}

	function getElementIndex(node) {
		var index = 0;
		while ((node = node.previousElementSibling)) {
			index++;
		}
		return index;
	}
	function onSuccessRequestTranslate(data) {
		if (data && data.length > 0) {
			setCard(data[0]);
		} else {
			console.log('no result');
		}
	}
	function setCard( card ) {
		self.card = card;
		setImage(0);
		self.DOMCardText.innerHTML = self.card.text;
		self.DOMCardMeanings.innerHTML = renderMeanings(self.card.meanings, self);
		self.DOMCardMeanings.addEventListener("mouseover", meaningActive);
		self.DOMCard.classList.add('card-active');
	}
	function setImage(index) {
		self.DOMCardImg.style.backgroundImage = 'url(http:' + self.card.meanings[index].preview_image_url + ')';
	}
	function renderMeanings(meanings, self) {
		self.DOMUl = document.createElement('ul');
		var DOMLi;

		meanings.forEach(function (item, i) {
			DOMLi = document.createElement('li');
			DOMLi.innerHTML = item.translation;
			if (!i) {
				DOMLi.classList.add('card-meaning-active');
			}
			self.DOMUl.appendChild(DOMLi);
		});
		return self.DOMUl.outerHTML;
	}

	function getSelectionText() {
		return window.getSelection().toString();
	}

	function getJSON(url, callback) {
		url = url || '';

		var request = new XMLHttpRequest();

		request.open('GET', url, true);

		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				// Success!
				if (typeof callback === "function") {
					callback(JSON.parse(this.response));
				}
			} else {
				// We reached our target server, but it returned an error
				error('request');
			}
		};

		request.onerror = function () {
			// There was a connection error of some sort
			error('server');
		};

		request.send();
	}

	function error(error) {
		console.log('Error: ' + error);
	}
}