import  {SetStateAction, useRef} from "react";

type Props = {
  togglePlaylist: React.Dispatch<SetStateAction<boolean>>;
  setPlaylist : React.Dispatch<SetStateAction<FileList | null>>
};

function PlayerMenu({ togglePlaylist,setPlaylist }: Props) {
  const filePickerRef: any = useRef();

  const fetchFileFromDevice = () => {
    filePickerRef.current.click();
  };

  const onFilesPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    setPlaylist(e.target.files)
  };

  return (
    <>
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

      <button
        type="button"
        className="btn"
        onClick={() => {
          togglePlaylist(true);
        }}
      >
        <i className="bi bi-music-note-list"></i>
      </button>
    </>
  );
}

export default PlayerMenu;
