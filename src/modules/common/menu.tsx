import { useRef } from "react";

type Props = {
  togglePlaylist: () => void;
  changePlayList: (fileList:FileList | null) => void ;
};

function Menu({ togglePlaylist, changePlayList }: Props) {
  const filePickerRef: any = useRef();

  const fetchFileFromDevice = () => {
    filePickerRef.current.click();
  };

  const onFilesPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePlayList(e.target.files);
  };

  return (
    <div className="menu">
      <label
        htmlFor="filepPicker"
        className="btn"
        onClick={fetchFileFromDevice}
      >
        <input
          type="file"
          accept="audio/*"
          multiple
          id="filePicker"
          ref={filePickerRef}
          onChange={onFilesPick}
        />
        <i className="bi bi-plus-square"></i>
      </label>

      <button type="button" className="btn" onClick={togglePlaylist}>
        <i className="bi bi-music-note-list"></i>
      </button>
    </div>
  );
}

export default Menu;
