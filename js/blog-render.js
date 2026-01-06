import { blogPosts } from "../data/blog-data.js";

const grid = document.querySelector(".blog-content-grid");

// Create cards for blog page , contains header/image/decoration/link and excerpt
grid.innerHTML = blogPosts.map(post => `
  <article class="blog-post-card">
    <a href="/blog/${post.slug}.html"><img src="${post.image}" alt="${post.country}"></a>
    <h3>${post.title}</h3>
    <div class="blog-post-decorative-line"></div>
    <p>${post.excerpt}</p>
    <a href="/blog/${post.slug}.html" class="blog-btn">READ MORE &#11166;</a>
  </article>
`).join("");