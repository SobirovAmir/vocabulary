import { useState, useMemo } from "react";
import "./App.css";
import vocabulary from "./vocabulary";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const input = e.target.value.trim().replace(/\s+/g, " ");
    setSearchTerm(input);
  };

  const filteredWords = useMemo(() => {
    if (!searchTerm) return [];
    const lowerSearchTerm = searchTerm.toLowerCase();

    return vocabulary.filter(
      (entry) =>
        entry.word.toLowerCase().includes(lowerSearchTerm) ||
        entry.translation.toLowerCase().includes(lowerSearchTerm) ||
        entry.explanation.toLowerCase().includes(lowerSearchTerm)
    );
  }, [searchTerm]);

  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <div className="App">
      <header className="app-header">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a word"
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>
      <main className="main-content">
        {searchTerm ? (
          <div className="search-results">
            {filteredWords.length > 0 ? (
              <>
                <p className="result-count">
                  {filteredWords.length} result(s) found
                </p>
                {filteredWords.map((entry, index) => (
                  <div key={index} className="word-card">
                    <h2
                      className="word-title"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(entry.word, searchTerm),
                      }}
                    ></h2>
                    <p>
                      <strong>Translation:</strong>{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(entry.translation, searchTerm),
                        }}
                      ></span>
                    </p>
                    <p>
                      <strong>Explanation:</strong>{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(entry.explanation, searchTerm),
                        }}
                      ></span>
                    </p>
                    <p>
                      <strong>Usage:</strong> {entry.usage}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <p className="no-results">No words found.</p>
            )}
          </div>
        ) : (
          <p className="default-message">Type a word to search.</p>
        )}
      </main>
    </div>
  );
}

export default App;
