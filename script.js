const musicContainer = document.querySelector('#music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const title = document.querySelector('.title');
const cover = document.querySelector('#cover');

const songs = [
    "เสแสร้ง(Cover) - Paper Planes",
    "ทิ้งไป - Only Monday",
    "นักเลงเก่า - Taitosmith"
];
let index = 0;

function ft_loadSong(song){
    title.innerText = `เพลง : ${song}.mp3`
    cover.src = `cover/${song}.jpg`;
    audio.src = `music/${song}.mp3`
}

ft_loadSong(songs[index]);

playBtn.addEventListener('click', ()=>{
    const isPlay = musicContainer.classList.contains('play');

    if (isPlay){
       ft_pauseSong();
    }
    else{
        ft_playSong();
    }
});

prevBtn.addEventListener('click', () =>{
    index--;
    if (index<0){
        index = songs.length - 1;
    }
    ft_loadSong(songs[index]);
    ft_playSong();
})

nextBtn.addEventListener('click', () =>{
    ft_nextSong();
})

function ft_nextSong(){
    index++;
    if (index > songs.length-1){
        index = 0;
    }
    ft_loadSong(songs[index]);
    ft_playSong();
}

function ft_playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa-solid').classList.replace('fa-play','fa-pause')
    audio.play();
}

function ft_pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa-solid').classList.replace('fa-pause','fa-play')
    audio.pause();
}

audio.addEventListener('timeupdate', ft_updateProgress);

function ft_updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration)*100;
    progress.style.width = `${progressPercent}%`;
}

progressContainer.addEventListener('click',ft_setProgress);

function ft_setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX/width) * duration;
}

audio.addEventListener('ended', ft_nextSong);