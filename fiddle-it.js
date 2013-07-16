// ==UserScript==
// @name       Fiddle It
// @namespace  http://stackoverflow.com/users/1907358/
// @version    1.0
// @description  Create a fiddle in seconds for Stack Overflow
// @match      http://*.stackoverflow.com/*
// ==/UserScript==

/* <= USAGE =>
 * When your on a question page. 
 * Select some code.
 * If it's HTML press       (CTRL + ALT + H)
 * If it's CSS press        (CTRL + ALT + C)
 * If it's JavaScript press (CTRL + ALT + J) 
 * When your finished with the code you need 
 * Open your fiddle with    (CTRL + ALT + F)
 */




(function(){
    
    document.addEventListener('DOMContentLoaded', function() {
        var formElements = {
            form: {
                type: 'form',
                method: 'POST',
                action: 'http://jsfiddle.net/api/post/library/pure/dependencies/more/',
                target: '_blank'
            },
            js: {
                type: 'textarea',
                name: 'js'
            },
            css: {
                type: 'textarea',
                name: 'css'
            },
            html: {
                type: 'textarea',
                name: 'html'
            }
        }, elements = {};
        
        for( var element in formElements ) {
            var current = formElements[element],
                el = document.createElement( current.type );
            
            for( var attribute in current ) {
                if( attribute !== 'type') el[attribute] = current[attribute];
            }
            
            if(element !== 'form') {
                elements.form.appendChild( el );
            } else {
                el.style.display = 'none';   
            }
            
            elements[element] = el;
        }
        
        
        document.body.appendChild( elements.form );
        
        document.addEventListener('keyup', function( event ) {
            var ALT = event.altKey,
               CTRL = event.ctrlKey,
              SHIFT = event.shiftKey,
                  H = event.keyCode === 72,
                  C = event.keyCode === 67,
                  J = event.keyCode === 74,
                  F = event.keyCode === 70,
            NUMBER1 = event.keyCode === 49,
               code = window.getSelection().toString();
            
            if( !CTRL && !ALT ) return;
            
            if( NUMBER1 ) return setLibrary('jquery', '1.9.1');
            if( H ) elements.html.value = code; 
            if( C ) elements.css.value = code;
            if( J ) elements.js.value = code;
            
            if( F ) {
                var els = elements;
                els.form.submit();
                els.css.value = els.js.value = els.html.value = '';
                els.form.action = 'http://jsfiddle.net/api/post/library/pure/dependencies/more/';
            }
        }); 
        
        var setLibrary = function( lib, version ) {
            elements.form.action = 'http://jsfiddle.net/api/post/' + lib + '/' + version + '/dependencies/more/';
        };
    });
    
}());
