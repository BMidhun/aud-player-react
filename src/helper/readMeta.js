import * as mm from 'music-metadata/lib/core';

const readMetaData = async (currentTrack) => {
  try {
    const bufferedData = Buffer.from(await currentTrack.arrayBuffer());
    let metadata = await mm.parseBuffer(bufferedData, {
      mimeType: currentTrack.type,
    });
    console.log(metadata.common?.picture)
    if (metadata.common?.picture)
      metadata.common?.picture?.[0].data.toString('base64');
    const res = {
      albumTitle: metadata.common?.album,
      artistName: metadata.common?.artist,
      imageSrc:  metadata.common?.picture?.[0].data.toString('base64'),
    };

    return res;
  } catch (error) {
    console.log(error);
  }
};

export default readMetaData
