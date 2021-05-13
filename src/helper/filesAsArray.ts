function filesAsArray(filesList: FileList):File[] {
  if (filesList) {
    const tracks = [];
    for (let index = 0; index < filesList.length; index++) {
      tracks.push(filesList[index]);
    }

    return tracks;
  } else return [];
}


export default filesAsArray;