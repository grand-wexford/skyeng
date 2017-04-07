"use strict";

window.addEventListener( "mouseup", translate );


function translate() {
	var self = this;
	
	clear();

	self.selection = window.getSelection();
	self.word = self.selection.toString();

	if ( self.word && self.word !== '' ) {
		getJSON( 'http://dictionary.skyeng.ru/api/v2/search-word-translation?text=' + self.word, renderCard );
	}

	function clear() {
		var DOMCurrentMarked = document.getElementById( 'marked' );

		if ( DOMCurrentMarked ) {
			DOMCurrentMarked.outerHTML = DOMCurrentMarked.innerHTML;
		}
		if ( document.getElementById( 'card' ) ) {
			self.DOMCard.classList.remove( 'card-active' );
			self.DOMCardText.innerHTML = '';
			self.DOMCardMeanings.innerHTML = '';
		}
	}

	function prepearCard() {
		if ( !document.getElementById( 'card' ) ) {
			self.DOMCard = document.createElement( 'div' );
			self.DOMCard.id = 'card';

			self.DOMCardImg = document.createElement( 'div' );
			self.DOMCardImg.id = 'card-img';

			self.DOMCardText = document.createElement( 'div' );
			self.DOMCardText.id = 'card-text';

			self.DOMCardMeanings = document.createElement( 'div' );
			self.DOMCardMeanings.id = 'card-meanings';

			self.DOMCard.appendChild( self.DOMCardImg );
			self.DOMCard.appendChild( self.DOMCardText );
			self.DOMCard.appendChild( self.DOMCardMeanings );

			document.body.insertBefore( self.DOMCard, document.body.firstChild );
		} else {
			self.DOMCard = document.getElementById( 'card' );
			self.DOMCardImg = document.getElementById( 'card-img' );
			self.DOMCardText = document.getElementById( 'card-text' );
			self.DOMCardMeanings = document.getElementById( 'card-meanings' );
		}
	}

	function markText() {
		var range = self.selection.getRangeAt( 0 );
		var DOMNewMarked = document.createElement( 'span' );

		DOMNewMarked.id = 'marked';
		DOMNewMarked.innerHTML = self.word;

		range.deleteContents();
		range.insertNode( DOMNewMarked );

		self.DOMCard.style.left = DOMNewMarked.offsetLeft + 'px';
		self.DOMCard.style.top = DOMNewMarked.offsetTop + 23 + 'px';
	}

	function meaningActive( event ) {
		if ( event.target.nodeName === "LI" ) {
			self.DOMCardMeanings.getElementsByClassName( 'card-meaning-active' )[0].classList.remove( 'card-meaning-active' );
			event.target.classList.add( 'card-meaning-active' );
			renderImage( getElementIndex( event.target ) );
		}
	}

	function getElementIndex( node ) {
		var index = 0;
		while ( ( node = node.previousElementSibling ) ) {
			index++;
		}
		return index;
	}

	function renderCard( data ) {
		if ( data && data.length > 0 ) {
			self.card = data[0];
		} else {
			return;
		}
		
		prepearCard();
		markText();
		renderImage( 0 );
		renderMeanings();
		self.DOMCardText.innerHTML = self.card.text;
		self.DOMCardMeanings.addEventListener( "mouseover", meaningActive );
		self.DOMCard.classList.add( 'card-active' );
	}

	function renderImage( index ) {
		self.DOMCardImg.style.backgroundImage = 'url(http:' + self.card.meanings[index].image_url + ')';
	}

	function renderMeanings() {
		var DOMLi;
		var DOMUl = document.createElement( 'ul' );

		self.card.meanings.forEach( function ( item, i ) {
			DOMLi = document.createElement( 'li' );
			DOMLi.innerHTML = item.translation;
			if ( !i ) {
				DOMLi.classList.add( 'card-meaning-active' );
			}
			DOMUl.appendChild( DOMLi );
		} );
		self.DOMCardMeanings.innerHTML = '';
		self.DOMCardMeanings.appendChild( DOMUl );
	}

	function getJSON( url, callback ) {
		url = url || '';

		var request = new XMLHttpRequest();

		request.open( 'GET', url, true );

		request.onload = function () {
			if ( this.status >= 200 && this.status < 400 ) {
				if ( typeof callback === "function" ) {
					callback( JSON.parse( this.response ) );
				}
			} else {
				error( 'request' );
			}
		};

		request.onerror = function () {
			error( 'server' );
		};

		request.send();
	}

	function error( error ) {
		console.log( 'Error: ' + error );
	}
}