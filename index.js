function extractSlugWithoutId(slug, maxLength) {
  const lastHyphenIndex = slug.lastIndexOf("-");
  let result = slug;
  if (lastHyphenIndex !== -1) {
    result = slug.substring(0, lastHyphenIndex);
  }
  if (result.length > maxLength) {
    result = result.substring(0, maxLength);
  }
  return result;
}

const baseURL =
  "https://api.unsplash.com/search/photos?client_id=OVRPzoFJV50srJeZIUMYD-24xfM-3andJloxU0G-spU&query=furniture&per_page=30";

async function fetchFurniture() {
  try {
    const response = await fetch(baseURL);
    const data = await response.json();

    const results = data.results;

    displayFurniture(results);
  } catch (error) {
    console.error("Error fetching furniture:", error);
  }
}

const galleryContainer = document.querySelector(".gallery-container");

function displayFurniture(products) {
  galleryContainer.innerHTML = "";

  products.forEach((product) => {
    const imgUrl = product.urls;
    const imgDesc = extractSlugWithoutId(product.slug, 17);

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("gallery-item");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("gallery-img");

    const img = document.createElement("img");
    img.classList.add("cover-img");
    img.setAttribute("draggable", "false");
    img.src = imgUrl.regular;
    img.alt = imgDesc;

    const title = document.createElement("h3");
    title.textContent = imgDesc;

    // const price = document.createElement('p');
    // price.textContent = `Price: $${product.price}`;

    const description = document.createElement("p");
    description.textContent = imgDesc;

    imgDiv.appendChild(img);
    itemDiv.appendChild(imgDiv);
    itemDiv.appendChild(title);
    // itemDiv.appendChild(price);
    itemDiv.appendChild(description);

    galleryContainer.appendChild(itemDiv);
  });
}

// Fetch and display furniture on page load
fetchFurniture();

// move to top function
const moveToTopBtn = document.getElementById("movetotopbtn");

function scrollFunction() {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  if (scrollPercentage > 15) {
    moveToTopBtn.style.display = "block";
  } else {
    moveToTopBtn.style.display = "none";
  }

  const blackSection = document.querySelector(".footer");
  const blackSectionRect = blackSection.getBoundingClientRect();
  const buttonRect = moveToTopBtn.getBoundingClientRect();

  if (
    buttonRect.top < blackSectionRect.bottom &&
    buttonRect.bottom > blackSectionRect.top
  ) {
    moveToTopBtn.classList.add("blend");
  } else {
    moveToTopBtn.classList.remove("blend");
  }
}

window.onscroll = function () {
  scrollFunction();
};

function moveToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
