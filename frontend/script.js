document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const code = document.querySelector("textarea").value;

  if (code.trim() === "") {
    alert("Please enter code before generating a screenshot.");
    return;
  }

  const response = await fetch('http://localhost:3000/generate',
  { method : 'POST',
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded',
    },
    body: `code=${encodeURIComponent(code)}`,
  });
  if (response.ok) {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    document.querySelector("#screenshot").src = url;
  } else {
    alert("An error occurred while generating the screenshot.");
  }
});
