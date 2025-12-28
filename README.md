Birthday page for Sakshi

Files:
- index.html — main page
- styles.css — styles and animations
- script.js — interactions and auto-run celebration
- assets/ — place `music.mp3` here to enable background music

Run locally
1. From the `birthday-sakshi` folder, run a simple static server, for example:

```powershell
# if you have Python
python -m http.server 8000
# or with Node (install http-server)
npx http-server -c-1 . 8000
```

2. Open http://localhost:8000 in your browser.

Notes
- Browsers often block autoplay; if music doesn't play, click the "Play Music" button.
- Edit the messages in `script.js` and the name in `index.html` to personalize further.
