import FileBase from "react-file-base64";

const FileSelector = ({ state, setState, buttonText = "Add Cover Image" }) => {
  return (
    <div className="file-selector-container">
      {state && (
        <div className="selected-image-container" onClick={() => setState("")}>
          <img src={state} alt="cover" />
        </div>
      )}

      {/* {!state && ( */}
      <div
        className="file-selector"
        style={{ border: `1px solid ${!state ? "red" : "#75c053"}` }}
      >
        <span>{buttonText}</span>
        <FileBase
          className="file-input"
          type="file"
          multiple={false}
          onDone={({ base64 }) => setState(base64)}
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default FileSelector;
