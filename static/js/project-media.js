// Add confirmed local image paths here when the attachment originals are available.
// Keep unavailable assets unconfigured so the page makes no failing requests.
if (location.pathname.endsWith('/parky.html')) {
  const media = {
    // robot: '../static/images/parky/robot.jpg',
    // architecture: '../static/images/parky/architecture.png',
    // rviz: '../static/images/parky/rviz.png',
    // poster: '../static/images/parky/poster.png',
  };
  for (const [key, src] of Object.entries(media)) {
    const probe = new Image();
    probe.onload = () => {
      if (key === 'robot') {
        const photo = document.querySelector('img[data-media="robot"]');
        photo.src = src;
        photo.width = probe.naturalWidth;
        photo.height = probe.naturalHeight;
        document.querySelector('a[data-media="robot"]').href = src;
      } else {
        const figure = document.querySelector(`[data-optional="${key}"]`);
        figure.querySelector('img').src = src;
        figure.querySelector('a').href = src;
        figure.hidden = false;
      }
    };
    probe.src = src;
  }
}
