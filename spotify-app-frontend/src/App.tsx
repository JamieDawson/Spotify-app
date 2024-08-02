import { useState, useEffect } from "react";
import { Spotify } from "react-spotify-embed";
import axios from "axios";
import "./App.css";

const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID || "";
const CLIENT_SECRET = import.meta.env.VITE_REACT_APP_CLIENT_SECRET || "";

type Album = {
  One: string;
  Two: string;
  Three: string;
  Four: string;
};

// const CLIENT_ID = "";
// const CLIENT_SECRET = "";

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

  // State to track validity for each album
  const [validUrls, setValidUrls] = useState<{
    [key in keyof Album]: boolean | null;
  }>({
    One: null,
    Two: null,
    Three: null,
    Four: null,
  });

  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            },
          }
        );
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error("Failed to fetch access token", error);
      }
    };
    getAccessToken();
  }, []);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get<Album>(
          "http://localhost:5555/getAlbum"
        );
        console.log(response.data);
      } catch (err) {
        console.log("Failed to fetch album data");
      }
    };

    fetchAlbum();
  }, []);

  const updateAlbums = async (
    event: React.FormEvent,
    index: number,
    albumKey: keyof Album,
    typedAlbumFromInput: string
  ) => {
    event.preventDefault();

    const isValid = await checkSpotifyUrl(typedAlbumFromInput);

    if (isValid) {
      const newObject = [...allAlbums];
      newObject[index] = {
        ...newObject[index],
        [albumKey]: typedAlbumFromInput,
      };
      setAllAlbums(newObject);
      setValidUrls((prevValidUrls) => ({
        ...prevValidUrls,
        [albumKey]: true,
      }));
    } else {
      setValidUrls((prevValidUrls) => ({
        ...prevValidUrls,
        [albumKey]: false,
      }));
    }
  };

  const checkSpotifyUrl = async (url: string): Promise<boolean> => {
    try {
      const albumId = url.split("/album/")[1].split("?")[0];
      const response = await axios.get(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="container">
      <div className="album">
        <Spotify link={allAlbums[0].One} />
        <form onSubmit={(e) => updateAlbums(e, 0, "One", albumOne)}>
          <input
            className="input-field"
            type="text"
            placeholder="album 1"
            onChange={(e) => setAlbumOne(e.target.value)}
            value={albumOne}
          />
          <button type="submit" className="submit-button">
            Update album 1
          </button>
        </form>
        {validUrls.One === false && (
          <p className="error-message">Invalid Spotify URL for Album 1</p>
        )}
      </div>
      <div className="album">
        <Spotify link={allAlbums[0].Two} />
        <form onSubmit={(e) => updateAlbums(e, 0, "Two", albumTwo)}>
          <input
            className="input-field"
            type="text"
            placeholder="album 2"
            onChange={(e) => setAlbumTwo(e.target.value)}
            value={albumTwo}
          />
          <button type="submit" className="submit-button">
            Update album 2
          </button>
        </form>
        {validUrls.Two === false && (
          <p className="error-message">Invalid Spotify URL for Album 2</p>
        )}
      </div>
      <div className="album">
        <Spotify link={allAlbums[0].Three} />
        <form onSubmit={(e) => updateAlbums(e, 0, "Three", albumThree)}>
          <input
            className="input-field"
            type="text"
            placeholder="album 3"
            onChange={(e) => setAlbumThree(e.target.value)}
            value={albumThree}
          />
          <button type="submit" className="submit-button">
            Update album 3
          </button>
        </form>
        {validUrls.Three === false && (
          <p className="error-message">Invalid Spotify URL for Album 3</p>
        )}
      </div>
      <div className="album">
        <Spotify link={allAlbums[0].Four} />
        <form onSubmit={(e) => updateAlbums(e, 0, "Four", albumFour)}>
          <input
            className="input-field"
            type="text"
            placeholder="album 4"
            onChange={(e) => setAlbumFour(e.target.value)}
            value={albumFour}
          />
          <button type="submit" className="submit-button">
            Update album 4
          </button>
        </form>
        {validUrls.Four === false && (
          <p className="error-message">Invalid Spotify URL for Album 4</p>
        )}
      </div>
    </div>
  );
}

export default App;
