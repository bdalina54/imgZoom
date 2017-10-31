/* 
 * Image Zoom Viewer
 * By: Bradley B. Dalina
 * Started October 31, 2017
*/

(function(w, d)
{
    function _()
    {
        var $ = {};
        $.zoom = function(el, ur, ti, de, da)//el=element, ur=image url, ti=title, de= description, da=date
        {
            var pi = (typeof el ==='undefined') ? '.imgzoom' : el;  
            var img=d.querySelector(pi);  
            if(!img) {console.error('Error: Did not found any matching element of "' + pi+'" it returns '+img); return false;}
            var zL = d.getElementById('zoomLayer');
            if(!zL){$.objectLayer();}
            img.onload = function()
            {
                
                img.addEventListener("click", function (e) 
                {
                    var zImage = d.getElementById('zoomImage');
                    var zLayer = d.getElementById('zoomLayer');
                    var imgurl = (typeof ur === 'undefined') ? img.src : ur; 
                    
                    zImage.src=imgurl;
                    zLayer.style.display ='block';

                    zImage.onload = function() 
                    {
                        $.resize(zImage.naturalWidth, zImage.naturalHeight);
                    };
                });
                $.addEvent();
            };
        };
        $.objectLayer= function()
        {
            var b = d.querySelector('body');
            if(!b)
            {
                b= d.querySelector('html');
                if(!b)
                {
                    b= d.querySelector('html');
                    console.log('Function was unable to get body and html element: Last attemp was document ');
                    ///return false;
                }
            }
            var zLayer = d.createElement('div');
            zLayer.style.cssText ='width:100%; height:100%; top:0px;left:0px; right:0px; bottom:0px;position:absolute;z-index:1040;background-color:rgba(0,0,0,0.60); display:none;';
            zLayer.setAttribute('id', 'zoomLayer');

            var imgBox = d.createElement('div');
            imgBox.setAttribute('id', 'zoomContainer');
            imgBox.style.cssText = 'position:absolute; top:0px; left:0px; right:0px; bottom:0px;margin:auto; width:30%; height:30%;';

            var imgClose = d.createElement('a');
            imgClose.setAttribute('id','zoomClose');
            imgClose.style.cssText='font-family: font-family: "Lato","Helvetica Neue",Helvetica,Arial,sans-serif;opacity:0; font-size:22.5px; font-weight:bold; line-height:1; position:absolute;padding: 5px 10px; background-color:rgba(255, 255, 255, 0.65); border-radius:1px; color:#2c3e50; cursor:pointer; transition:opacity 2s ease-in-out; text-decoration:none;box-shadow: 0px 0px 5px rgba(0,0,0,0.35);';
    //        imgClose.style.backgroundColor='';
    //        imgClose.style.borderRadius='1px';

            var textnode = d.createTextNode("×");  
            imgClose.appendChild(textnode);

            var img = d.createElement('img');
            img.setAttribute('id', 'zoomImage');
            img.setAttribute('alt', 'zoomImage');img.style.cssText='width:100%; position:absolute; top:0px; bottom:0px; right:0px; left:0px; background-color:#fff; border: solid 1px #ddd; box-shadow: 0px 0px 30px #000; margin:auto; vertical-align:middle; padding:10px;';

            imgBox.appendChild(img);
            imgBox.appendChild(imgClose);
            zLayer.appendChild(imgBox);

            b.appendChild(zLayer);
        };
        $.resize=function resize(eW, eH)
        {        
//            var dimension= $.p10(w.innerWidth, w.innerHeight);
            var screenW = $.p10(w.innerWidth);
            var screenH = $.p10(w.innerHeight);

                if(eW > screenW && eH > screenH)
                {
                    $.resize($.p10(eW), $.p10(eH));
                    console.log('a '+eW+'x'+eH);
                }
                else if(eW > screenW && eH < screenH)
                {
                   $.resize($.p10(eW), $p10(eH));
                    console.log('b '+eW+'x'+eH);
                }
                else if(eW < screenW && eH > screenH)
                {
                    $.resize($.p10(eW), $.p10(eH));
                    console.log('c '+eW+'x'+eH);
                }
                else
                {
                    $.enlarge(d.getElementById('zoomContainer'), eW, eH);
                    console.log('d '+eW+'x'+eH);
                }  
        };
        $.p10 = function p10(x)
        {
            return x-(x*0.20);
        };
        $.enlarge= function enlarge(el, eW, eH)
        {
            var cW=0;
            var cH=0;
            $.removeEvent();
//            d.querySelector('body').style.margin='0';
//            d.querySelector('body').style.height='100%';
//            d.querySelector('body').style.width='100%';
//            
//            d.querySelector('html').style.margin='0';
//            d.querySelector('html').style.height='100%';
//            d.querySelector('html').style.width='100%';
//            d.getElementById('zoomImage').style.width=eW-20+'px';
//            d.getElementById('zoomImage').style.height=eH-20+'px';
            function enlarging() 
                {
                  var incW = 3*(eW/eH);   
                  var incH = 3*(eH/eW); 
                  cW=cW+incW;  // update parameters
                  cH=cW+incH;
                  el.style.width = cW + 'px';
                  el.style.height = cH + 'px';
                  if (cW  >= eW)  // check finish condition
                  {
                    clearInterval(timing); 
                    $.addEvent();
                    d.getElementById('zoomClose').style.top=(d.getElementById('zoomImage').offsetTop + 25)+'px';
                    d.getElementById('zoomClose').style.right="5px";
                    d.getElementById('zoomClose').style.opacity ='1';
                  }
                }
            var timing = setInterval(enlarging, 0.1);
        };
        
        $.reduce = function reduce(el)
        {
                var curW = parseInt(el.style.width);
                var curH = parseInt(el.style.height);
                d.getElementById('zoomClose').style.transition='opacity 0.0s ease-in-out';
                d.getElementById('zoomClose').style.opacity ='0';
                
                $.removeEvent();
                function reducing() 
                {
                  var decW = 3*(curW/curH);   
                  var decH = 3*(curH/curW);   
                  curW=curW-decW;  // update parameters
                  curH=curW-decH;
                  el.style.width = curW + 'px';
                  el.style.height = curH + 'px';
                  if (curW  <= 0)  // check finish condition
                  {
                    clearInterval(timing);
                    $.addEvent();
                    d.getElementById('zoomImage').src='#';
                    d.getElementById('zoomLayer').style.display ='none';
                  }
                }
                var timing = setInterval(reducing, 0.5); 
        }
        $.removeEvent= function removeEvent()
        {
            if (d.removeEventListener) 
                {
                    d.getElementById('zoomLayer').removeEventListener("click", $.closeZoom, false);
                    d.getElementById('zoomClose').removeEventListener("click", $.closeZoom, false);
                } 
                else if (d.detachEvent) 
                {
                    d.getElementById('zoomLayer').detachEvent("click", $.closeZoom, false);
                    d.getElementById('zoomClose').detachEvent("click", $.closeZoom, false);
                }
        };
        $.addEvent=  function addEvent()
        {
            d.getElementById('zoomLayer').addEventListener("click",$.closeZoom); 
            d.getElementById('zoomClose').addEventListener("click", $.closeZoom);
        };
        $.closeZoom = function closeZoom(e)
        {
            if (e.target !== this) return;
            
            d.getElementById('zoomClose').style.opacity ='0';
            $.reduce(d.getElementById('zoomContainer'));
        };
        return $;
    }
    if(typeof ($) === 'undefined'){w.$ = _();}
    else{console.log("Library already defined.");}
})(window, document);
