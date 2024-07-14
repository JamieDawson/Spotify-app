import { useState } from "react";
import { Spotify } from "react-spotify-embed";
import "./App.css";

type Album = {
  One: string;
  Two: string;
  Three: string;
  Four: string;
};

function App() {
  const [albumOne, setAlbumOne] = useState<string>("");
  const [albumTwo, setAlbumTwo] = useState<string>("");
  const [albumThree, setAlbumThree] = useState<string>("");
  const [albumFour, setAlbumFour] = useState<string>("");
  const [allAlbums, setAllAlbums] = useState<Album[]>([
    {
      One: "https://open.spotify.com/album/0OQwd9OkjGYKjYk4QCJYDB",
      Two: "https://open.spotify.com/album/0fUy6IdLHDpGNwavIlhEsl",
      Three: "https://open.spotify.com/album/19t724A9u0hN0Zq2U2hOkJ",
      Four: "https://open.spotify.com/album/3WZERxTccoes6PHBRn959I",
    },
  ]);

  const updateAlbums = (
    event: React.FormEvent,
    index: number,
    albumKey: keyof Album,
    typedAlbumFromInput: string
  ) => {
    event.preventDefault();

    if (typedAlbumFromInput.length === 0) return;

    const newObject = [...allAlbums];
    newObject[index] = { ...newObject[index], [albumKey]: typedAlbumFromInput };
    setAllAlbums(newObject);
  };

  return (
    <>
      <div>
        <Spotify link={allAlbums[0].One} />
        <form onSubmit={(e) => updateAlbums(e, 0, "One", albumOne)}>
          <input
            type="text"
            placeholder="album 1"
            onChange={(e) => setAlbumOne(e.target.value)}
            value={albumOne}
          />
          <button type="submit">Update album 1</button>
        </form>
      </div>
      <div>
        <Spotify link={allAlbums[0].Two} />
        <form onSubmit={(e) => updateAlbums(e, 0, "Two", albumTwo)}>
          <input
            type="text"
            placeholder="album 2"
            onChange={(e) => setAlbumTwo(e.target.value)}
            value={albumTwo}
          />
          <button type="submit">Update album 2</button>
        </form>
      </div>
      <div>
        <Spotify link={allAlbums[0].Three} />
        <form onSubmit={(e) => updateAlbums(e, 0, "Three", albumThree)}>
          <input
            type="text"
            placeholder="album 3"
            onChange={(e) => setAlbumThree(e.target.value)}
            value={albumThree}
          />
          <button type="submit">Update album 3</button>
        </form>
      </div>
      <div>
        <Spotify link={allAlbums[0].Four} />
        <form onSubmit={(e) => updateAlbums(e, 0, "Four", albumFour)}>
          <input
            type="text"
            placeholder="album 4"
            onChange={(e) => setAlbumFour(e.target.value)}
            value={albumFour}
          />
          <button type="submit">Update album 4</button>
        </form>
      </div>
    </>
  );
}

export default App;
