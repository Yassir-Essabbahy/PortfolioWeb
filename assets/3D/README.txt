========================================
3D ART ASSETS DIRECTORY
========================================

Place your 3D reels, turntable videos, and render images here!

Supported formats:
- Videos: .mp4, .webm
- Images: .png, .jpg, .jpeg, .webp, .gif

How to add further items to the 3D Art slideshow:
1. Save your image or video in this folder:
   e.g. `assets/3D/my_new_model.png` or `assets/3D/turntable_clip.mp4`

2. Open `index.html` and find `<section id="art3d">` -> `<div class="media-carousel" ...>`.

3. Add a new `.carousel-slide` element:

   For an image:
   <div class="carousel-slide" data-caption="Description of your 3D model">
     <img src="assets/3D/my_new_model.png" class="psx-filter" alt="Description" loading="lazy">
     <div class="carousel-slide-tag">3D MODEL</div>
   </div>

   For a video:
   <div class="carousel-slide" data-caption="Turntable reel description">
     <video src="assets/3D/turntable_clip.mp4" controls playsinline muted loop preload="metadata" aria-label="Description"></video>
     <div class="carousel-slide-tag">3D TURNTABLE</div>
   </div>

The carousel will automatically calculate the new count (e.g. 1 / 8), update pagination dots, support touch swipes, and allow fullscreen inspection via the ⛶ button!
