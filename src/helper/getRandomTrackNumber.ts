function getRandomTrack (playlistLength:number):number {
        return  Math.floor(Math.random() * playlistLength)
}

export default getRandomTrack;