# imgZoom
Image Zoom Viewer

usage:

Include the js file at the header or at the bottom before </body> closing tag

<script src="imgZoom.js" language="javascript" type="text/javascript"></script>

1) By initializing the $.zoom function without parameter 
    <script language="javascript" type="text/javascript">
        $.zoom();
    </script>
    
    It will find the default class ".imgzoom" so you need to have an image tag with "imgzoom" class
    <img src="sample.jpg" class="imgzoom"/>
    
    The current img  source with the said class above will be viewed larger not larger than the window width X height

2) By initializing $.zoom with one parameter, it would look for the specific element by class, id, name etc...
  <script language="javascript" type="text/javascript">
      $.zoom('#element_id');
  </script>

  The current img source defined in the parameter will be viewed larger not larger than the window width X height

3) By initializing $.zoom with two parameters, it would look for the specific element by class, id, name and viewed the img url defined in   the second parameter.
  <script language="javascript" type="text/javascript">
      $.zoom('#low_resolution_img', 'high_resolution_img_url');  
  </script>
  
  The second parameter applies with local file or external file url
  
  $.zoom('#porfile.photo', 'http://wwww.facebook/........./099j02jfnkjsa.jpg'); 
  $.zoom('.photo', 'assets/images/sample.jpg'); 
  $.zoom('[name="photo"]', 'sample.jpg'); 
  
