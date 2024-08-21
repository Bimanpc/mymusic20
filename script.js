const songs = [
    { title: "Song 1", artist: "Artist 1", src: "path/to/song1.mp3" },
    { title: "Song 2", artist: "Artist 2", src: "path/to/song2.mp3" },
    // Add more songs here
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);

document.getElementById('play').addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        document.getElementById('play').textContent = 'Pause';
    } else {
        audio.pause();
        document.getElementById('play').textContent = 'Play';
    }
});

document.getElementById('prev').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
});

document.getElementById('next').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong();
});

document.getElementById('progress-bar').addEventListener('input', (e) => {
    audio.currentTime = (audio.duration * e.target.value) / 100;
});

audio.addEventListener('timeupdate', () => {
    document.getElementById('progress-bar').value = (audio.currentTime / audio.duration) * 100;
});

function loadSong() {
    audio.src = songs[currentSongIndex].src;
    document.getElementById('song-title').textContent = songs[currentSongIndex].title;
    document.getElementById('artist-name').textContent = songs[currentSongIndex].artist;
    audio.play();
    document.getElementById('play').textContent = 'Pause';
}

window.onload = () => {
    const songList = document.getElementById('song-list');
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong();
        });
        songList.appendChild(li);
    });
    loadSong();
};
