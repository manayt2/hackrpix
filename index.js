async function grabJsonSynonym (word) {
    const uri = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=2f621c12-4a47-4bfd-a30a-cee366b91b88`;
  
    try {
      const response = await fetch(uri);
      if (response.ok) {
        const jsyn = await response.json();
        return jsyn;
      } else {
        throw new Error(`Failed to fetch data from API. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
}

async function grabJsonDefinition (word) {
  const uri = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=82d1dc8f-84cb-4371-9015-50d80cc0fdd1`;

  try {
    const response = await fetch(uri);
    if (response.ok) {
      const jdef = await response.json();
      return jdef;
    } else {
      throw new Error(`Failed to fetch data from API. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

function def(){
  try{
  document.getElementById("out").innerHTML = "";
  if (document.getElementById("word").value != ""){
    grabJsonDefinition(document.getElementById("word").value)
    .then(jdef => {
      console.log("Dictionary:");
      console.log(jdef); // Use the result as needed
      jdef;
      const keys = Object.keys(jdef);
      document.getElementById("out").innerHTML += "<h3>Definition:</h3>";
      for (let k of keys) {
        defk = jdef[k]
        let out = "";
        for (let j of defk.shortdef){
          out += "<li>" + j + "</li>";
        }
        document.getElementById("out").innerHTML += out;
      }
    });
  }
  }catch (error){
    document.getElementById("out").innerHTML = "<p>No Definitions Available</p>"
  }
}
function syn(){
  try {
  document.getElementById("out").innerHTML = "";
  let def;
  if (document.getElementById("word").value != ""){
    grabJsonSynonym(document.getElementById("word").value)
      .then(jsyn => {
        console.log("Synonym: ");
        console.log(jsyn); // Use the result as needed
        if(Object.keys(jsyn[1]).includes("meta")){
        def = jsyn[1].meta.syns;
        console.log(def);
        const keys = Object.keys(def);
        for (let k of keys) {
          defk = def[k]
          let out = "Synonyms: ";
          for (let j of defk){
            out += j + ", ";
          };
          out = out.substring(0, out.length - 2);
          if (out != "Synonyms:<br>");
            document.getElementById("out").innerHTML += out +"<br>";;
        }
      } else {
        document.getElementById("out").innerHTML = "<h3>Synonyms:</h3>"
      }
      }
    );
  }
  } catch (error) {
    ocument.getElementById("out").innerHTML = "<p>No Synonyms Available</p>";
  }
}
function assocPhrase(){
  try {
  let out = ""
  document.getElementById("out").innerHTML = "";
  theSet = new Set();
  if (document.getElementById("word").value != ""){
    grabJsonDefinition(document.getElementById("word").value)
    .then(jdef => {
      console.log("Associated Phrase:");
      console.log(jdef); // Use the result as needed
      jdef;
      const keys = Object.keys(jdef);
      document.getElementById("out").innerHTML += "<h3>Associated Phrases:</h3>";
      for (let k of keys) {
        defk = jdef[k].meta.stems;
        for (let j of defk){
          theSet.add(j);
        }
      }
      for (let t of theSet) {
        out += "<li>" + t + "</li>";
      }
      document.getElementById("out").innerHTML += out;
    });
    
  }
  } catch (error){
    document.getElementById("out").innerHTML = "<p>No Associated Phrases Available</p>";
  }
}


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("openNewTabButton").addEventListener("click", function () {
    let search = 'https://www.google.com/search?q=' + document.getElementById("word").value;
    window.open(search)
  });
  const definitionButton = document.getElementById("definitionButton");
  const synonymButton = document.getElementById("synonymButton");
  const assocPhraseButton = document.getElementById("assocPhraseButton");
  
  if (definitionButton) {
    definitionButton.addEventListener("click", function () {
      def();
    });
  }

  if (synonymButton) {
    synonymButton.addEventListener("click", function () {
      syn();
    });
  }

  if (assocPhraseButton) {
    assocPhraseButton.addEventListener("click", function () {
      assocPhrase();
    });
  }
});