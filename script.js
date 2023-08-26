const app = document.getElementById("app");

function loadPage(pageContent) {
  app.innerHTML = pageContent;
}

// Initial page load
loadPage(`
    <h1>Welcome to My Single Page App</h1>
    <p>Select a demo from the menu to get started.</p>
`);

// Example: Switching between pages
document.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const pageName = event.target.getAttribute("data-page");

    if (pageName === "page1") {
      loadPage(`
                <h2>Page 1</h2>
                <p>This is the content of Page 1.</p>
            `);
    } else if (pageName === "page2") {
      loadPage(`
                <h2>Page 2</h2>
                <p>This is the content of Page 2.</p>
            `);
    } // Add more pages here
  }
});

function lazyLoadIframe(iframe) {
  const dataSrc = iframe.getAttribute("data-src");
  if (dataSrc) {
    iframe.src = dataSrc;
    iframe.removeAttribute("data-src");
  }
}

// Lazy load iframes when the page is scrolled
document.addEventListener("DOMContentLoaded", () => {
  const iframes = document.querySelectorAll("iframe[data-src]");
  const iframeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        lazyLoadIframe(iframe);
        observer.unobserve(iframe);
      }
    });
  });

  iframes.forEach((iframe) => {
    iframeObserver.observe(iframe);
  });
});
