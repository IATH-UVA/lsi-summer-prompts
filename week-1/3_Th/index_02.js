
console.log('hello there, start tinkering');

//-------------------------initial mouse conditional adapted----------------------------

/*

first - create a function that explores the current window size - use mozilla's references on the DOM and p5's references to output size to the console. set the canvas to the size of the window

second - change the drawing framerate and appearance attributes of the ellipse being drawn

third - create a non-looping version of this initial interaction that modifies and ellipse based on the mouse location. Use the mouse being pressed to initiate the drawing of a new ellipse.

*/

//-------------------------button objects-------------------------------

/*

start a new sketch. canvas should be the size of the window again

write a Button object (for creating new Button instances) that takes an index number as it's 'label' (so you can iterate through and create 8 buttons)

position these buttons at the bottom of the page - where each is 80 pixels wide and offset by 80 pixels - and center the label on each button

when you mouseOver a button it should fill with magenta, mouseOut it should return to white ; click on it should turn red, clicked when on and it should turn back to white

a successful sketch will  include, at minimum setup(), draw(), and button() functions and the above behavior

*/


//-------------emission objects-------------------------------

/*

extending your button sketch, create an emitter object than can be instanciated multiple times

here - the idea is to great an animated graphic that turns on and progresses up the page when the button is active (i.e. clicked and red) - think of the emitter like a roman candle, a fountain, or a squiggling worm.

browse through the existing p5 animations and adapt one to work within your sketch

to simplify testing, feel free to activate one emitter instance and get it's geometry working, in advance of integration with the existing array of buttons

a successful sketch will  include, at minimum setup(), draw(), button(), and emitter() functions and the above behavior

*/

