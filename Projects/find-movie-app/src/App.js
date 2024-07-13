import "./index.css";

const APIData = [
  {
    image: "person.jpg",
    imageDescription: "description",
    movieName: "Atlantis",
    Director: "Christopher Nolan",
    cast: [
      "Dwayne Johnson",
      "Thimothy Clement",
      "Serena Williams",
      "Micheal Jackson",
    ],
    rating: 3.5,
    releaseDate: 2023,
  },
  {
    image: "person.jpg",
    imageDescription: "description",
    movieName: "Atlantis",
    Director: "Christopher Nolan",
    cast: [
      "Dwayne Johnson",
      "Thimothy Clement",
      "Serena Williams",
      "Micheal Jackson",
    ],
    rating: 3.5,
    releaseDate: 2023,
  },
  {
    image: "person.jpg",
    imageDescription: "description",
    movieName: "Atlantis",
    Director: "Christopher Nolan",
    cast: [
      "Dwayne Johnson",
      "Thimothy Clement",
      "Serena Williams",
      "Micheal Jackson",
    ],
    rating: 3.5,
    releaseDate: 2023,
  },
  {
    image: "person.jpg",
    imageDescription: "description",
    movieName: "Atlantis",
    Director: "Christopher Nolan",
    cast: [
      "Dwayne Johnson",
      "Thimothy Clement",
      "Serena Williams",
      "Micheal Jackson",
    ],
    rating: 3.5,
    releaseDate: 2023,
  },
  {
    image: "person.jpg",
    imageDescription: "description",
    movieName: "Atlantis",
    Director: "Christopher Nolan",
    cast: [
      "Dwayne Johnson",
      "Thimothy Clement",
      "Serena Williams",
      "Micheal Jackson",
    ],
    rating: 3.5,
    releaseDate: 2023,
  },
  {
    image: "person.jpg",
    imageDescription: "description",
    movieName: "Atlantis",
    Director: "Christopher Nolan",
    cast: [
      "Dwayne Johnson",
      "Thimothy Clement",
      "Serena Williams",
      "Micheal Jackson",
    ],
    rating: 3.5,
    releaseDate: 2023,
  },
];

const filteData = [
  {
    name: "Genre",
    options: ["Action", "Romance", "Sci-Fi", "Horror"],
    defaultOption: "Action",
  },
  {
    name: "Release Date",
    options: Array.from({ length: 26 }, (_, i) => i + 1999),
    defaultOption: "Action",
  },
  {
    name: "Region",
    options: ["USA", "Nigeria", "Ghana", "France"],
    defaultOption: "Nigeria",
  },
  {
    name: "Director",
    options: [],
    defaultOption: "",
  },
];

export default function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

function Header() {
  //This will contain the title and Author
  return (
    <div className="container header">
      <h1>🎼M&M🎥</h1>
      <p>
        {" "}
        by <span>Samuel Ntadom</span>
      </p>
    </div>
  );
}

function Content() {
  return (
    <div className="container">
      <FilterContainer />
      <MediaDisplay />
    </div>
  );
}

function FilterContainer() {
  //this component contains the filters and my search bar
  return (
    <form className="filters_container">
      <select value="music">
        <option value={"movie"}> Movie </option>
        <option value={"music"}> Music </option>
      </select>
      {filteData.map((el) => (
        <Filter data={el}>{el.name}</Filter>
      ))}
      <div>
        <input type="text" placeholder="Search for movies,music,&tv shows" />
        <button>Press me</button>
      </div>
    </form>
  );
}

function Filter({ data, children }) {
  //this creates filter options for my application
  return (
    <div className="filter_element">
      <label>{children}</label>
      <br />
      <select className="filter_element_select" value={data.defaultOption}>
        {data.options?.map((opt) => (
          <option value={opt}> {opt} </option>
        ))}
      </select>
    </div>
  );
}

function MediaDisplay() {
  //this diplays all the media found from the search
  return (
    <div className="media_container">
      {APIData.map((el) => (
        <Media data={el} />
      ))}
    </div>
  );
}

function Media({ data }) {
  return (
    <div className="medium_container">
      <img src={data.image} alt={data.imageDescription} />
      <div>
        <p className="title"> {data.movieName}</p>
        <p className="rating">⭐️ {data.rating}</p>
        <p className="director">Director: {data.Director}</p>
        <p className="cast">Cast: {`${data.cast[0]}, ${data.cast[1]}...`}</p>

        <p className="release_date">Release Date: {data.releaseDate}</p>
      </div>
    </div>
  );
}

function Footer() {
  return <footer></footer>;
}
