---
title: "Blog Posts"
---

# Blog Posts

{% for post in collections.posts %}
  <h2>{{ post.data.title }}</h2>
  <p>{{ post.data.date }}</p>
  <p>{{ post.data.excerpt }}</p>
{% endfor %}