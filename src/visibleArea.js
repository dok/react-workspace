// http://stackoverflow.com/questions/12868287/get-height-of-non-overflowed-portion-of-div

export default function visibleArea(node){
    var o = {height: node.offsetHeight, width: node.offsetWidth}, // size
        d = {y: (node.offsetTop || 0), x: (node.offsetLeft || 0), node: node.offsetParent}, // position
        css, y, x;
    while( null !== (node = node.parentNode) ){  // loop up through DOM
        css = window.getComputedStyle(node);
        if( css && css.overflow === 'hidden' ){  // if has style && overflow
            y = node.offsetHeight - d.y;         // calculate visible y
            x = node.offsetWidth - d.x;          // and x
            if( node !== d.node ){
                y = y + (node.offsetTop || 0);   // using || 0 in case it doesn't have an offsetParent
                x = x + (node.offsetLeft || 0);
            }
            if( y < o.height ) {
                if( y < 0 ) o.height = 0;
                else o.height = y;
            }
            if( x < o.width ) {
                if( x < 0 ) o.width = 0;
                else o.width = x;
            }
            return o;                            // return (modify if you want to loop up again)
        }
        if( node === d.node ){                   // update offsets
            d.y = d.y + (node.offsetTop || 0);
            d.x = d.x + (node.offsetLeft || 0);
            d.node = node.offsetParent;
        }
    }
    return o;                                    // return if no hidden
}

